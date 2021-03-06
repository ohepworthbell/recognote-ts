import ScoreBox from './scorebox';
import addToast from 'toasts';

/**
 *  Create new ScoreKeeper
 * 
 */
export default class ScoreKeeper {
  public correct: string;
  private _score: number;
  private dom: any;

  constructor(wrapper?: HTMLElement) {
    this.correct;

    // Check for existing top score
    this.constructDom(wrapper);

    // Set initial score
    this.score = 0;
    this.topscore = 0;
  }

  /**
   *  Construct DOM
   * 
   */
  constructDom(wrapper: HTMLElement) : void {
    // Create score boxes
    const current = new (ScoreBox as any)(this.score, 'left', 'Current score');
    const top = new (ScoreBox as any)(this.topscore, 'right', 'Top streak');

    // Append elements to wrapper
    wrapper.append(current, top);

    // Make accessible as DOM element
    this.dom = {current, top};
  }

  /**
   *  Check answers
   * 
   *  @param {String} answer 
   */
  check(answer: string) : void {
    const correct = answer.toUpperCase() === this.correct.toUpperCase();

    // If correct, update scores
    if(correct) {
      // Increase scores
      this.score++;
      this.topscore = this.score;

      // Check for new 'top streaks', highlight as appropriate
      if(this.score > 0 && this.score === this.topscore) {
        this.dom.top.classList.add('game__score--streak');
      }

      // Show 'correct' toast
      addToast('You are correct!', true);

      // Return
      return;
    }

    // Check answer, remove any 'top streak' classes if incorrect
    this.dom.top.classList.remove('game__score--streak');

    // Reset score
    this.score = 0;

    // Big vibration to indicate error
    if (window.navigator.vibrate) window.navigator.vibrate(200);

    // Show 'incorrect' toast
    addToast(`Oops, wrong answer! The correct answer was '${this.correct.toUpperCase()}'`);
  }

  /**
   *  Get top score (persistent in localStorage)
   * 
   */
  get topscore() : number {
    return Number(localStorage.getItem('topScore') || 0);
  }

  /**
   *  Save new top score to localStorage
   * 
   *  @param {Number} score new top score
   */
  set topscore(score: number) {
    const highestStreak = Math.max(score, this.topscore);

    // Save highest streak
    localStorage.setItem('topScore', String(highestStreak));

    // Update current 'top score'
    this.dom.top.dispatchEvent(new CustomEvent('update-score', {detail: highestStreak}))
  }

  /**
   *  Get current score
   * 
   */
  get score() {
    return this._score || 0;
  }

  /**
   *  Save current score
   * 
   *  @param {Number} score new current score
   */
  set score(score: number) {
    this._score = score;

    // Update current score
    this.dom.current.dispatchEvent(new CustomEvent('update-score', {detail: this._score}))
  }
}
