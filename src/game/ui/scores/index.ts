import ScoreBox from './scorebox';

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
  constructDom(wrapper: HTMLElement) {
    // Create score boxes
    let current = new (ScoreBox as any)(this.score, 'left');
    let top = new (ScoreBox as any)(this.topscore, 'right');

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
  check(answer: string) {
    let correct = answer.toUpperCase() === this.correct.toUpperCase();

    // If correct, update scores
    if(correct) {
      // Increase scores
      this.score++;
      this.topscore = this.score;

      // Check for new 'top streaks', highlight as appropriate
      if(this.score === this.topscore) {
        this.dom.top.classList.add('game__score--streak');
      }

      console.log(`Correct! The answer was ${this.correct}`)

      // Return
      return;
    }

    // Check answer, remove any 'top streak' classes if incorrect
    this.dom.top.classList.remove('game__score--streak');

    // Reset score
    this.score = 0;

    // Big vibration to indicate error
    if (window.navigator.vibrate) window.navigator.vibrate(200);

    // Notify via an error
    console.error(`Oops, wrong answer! The correct answer was ${this.correct}`);
  }

  /**
   *  Get top score (persistent in localStorage)
   * 
   */
  get topscore() {
    return Number(localStorage.getItem('topScore') || 0);
  }

  /**
   *  Save new top score to localStorage
   * 
   *  @param {Number} score new top score
   */
  set topscore(score: number) {
    let highestStreak = Math.max(score, this.topscore);

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
