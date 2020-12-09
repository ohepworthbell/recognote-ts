import NoteWheel from './ui/wheel';
import ScoreKeeper from './ui/scores/index';
import Answer from './ui/answers/index';
import Sound from 'sounds';
import {Settings, Notes, GenericObject} from 'interfaces';

/**
 *  Create a new game
 * 
 *  @param {DOMelement} wrapper
 *  @param {Object} notes
 *  @param {Object} settings
 */
export default class Game extends NoteWheel {
  notes: Notes;
  answers: HTMLElement[];
  scoreboard: ScoreKeeper;
  sound: Sound;

  constructor(wrapper: string, notes: GenericObject, settings?: Settings) {
    super(wrapper, settings);

    // Save notes for game
    this.notes = notes as Notes;

    // Set empty object for answers
    this.answers = [];

    // Create scoreboard
    this.scoreboard = new (ScoreKeeper as typeof ScoreKeeper)(this.wrapper);

    // Establish new round
    this.newRound(true);
  }

  /**
   *  Create a new round for the game
   * 
   *  @param {Boolean} firstLoad 
   */
  private newRound(firstLoad = false) : void {
    this.clearPreviousRounds();
    this.setCorrectAnswer();
    this.createNewSound();
    this.addAnswerButtons();
    
    // If not firstLoad, add sound button handler
    if(firstLoad) this.addSoundButtonListeners();
  }

  /**
   *  Clear existing event handlers, remove old buttons
   * 
   */
  private clearPreviousRounds() : void {
    if (!this.answers.length) return;

    // Remove all existing buttons
    this.answers.forEach(button => button.remove());

    // Set answers to empty array
    this.answers = [];
  }

  /**
   *  Set correct answer for round
   * 
   */
  private setCorrectAnswer() : void {
    const answers: string[] = Object.keys(this.notes);
    
    // Get random 'correct' answer
    this.scoreboard.correct = answers[Math.floor(Math.random() * answers.length)];
  }

  /**
   *  Create new sound
   * 
   */
  private createNewSound() : void {
    const {hardMode} = this.settings;
    const {correct} = this.scoreboard;

    // Find correct octave (hard mode spans 3rd-6th octaves, easy mode is just 4th octave)
    const octave:number = hardMode ? Math.floor(3 + Math.random() * 3) : 4;

    // Create new sound
    this.sound = new Sound(this.notes, correct, octave);
  }

  /**
   *  Add correct answers to game
   * 
   */
  private addAnswerButtons() : void {
    const answers: string[] = Object.keys(this.notes);

    // Get sizes from settings
    const {canvasSize, noteRadius} = this.settings;
    const canvasClientWidth: number = this.dom.canvas.clientWidth;

    // Get size of segments
    const divisions: number = Math.PI * 2 / answers.length;
    const midpoint: number = canvasClientWidth / 2;
    const scale:number = canvasClientWidth / canvasSize;
    const radius: number = noteRadius * scale;

    // Create new answers from above array
    answers.forEach((value: string, index: number) => {
      // Get angle (offset by 1 rad)
      const angle: number = divisions * index - Math.PI / 2;

      // Create new answer
      const answer: HTMLElement = new (Answer as any)(value, angle, radius, midpoint);

      // Add new answer to array
      this.answers.push(answer);

      // Append answer to wrapper
      this.wrapper.append(answer);

      // Add event listener to answer
      answer.addEventListener('click', () => {
        // Add vibtration for haptic feedback
        if (window.navigator.vibrate) window.navigator.vibrate(50);

        // Check current answer
        this.scoreboard.check(value);

        // Refresh buttons after 500ms (to allow for 'click' animations to complete)
        this.newRound();
      });
    });
  }

  /**
   *  Add sound button event listener
   * 
   */
  private addSoundButtonListeners() : void {
    const {button} = this.dom;
    
    // Add click handler for 'play' button
    button.addEventListener('click', (e: Event) : void => {
      e.preventDefault();

      // Disable button to avoid multi-click conflicts
      button.disabled = true;

      // Perform sound animation
      this.toggleSoundAnimation(true);

      // Add vibtration for haptic feedback
      if (window.navigator.vibrate) window.navigator.vibrate(50);

      // Hide sound animation and re-enable button after timeout
      setTimeout(() => {
        this.toggleSoundAnimation(false);
        button.disabled = false;
      }, 2000);

      // Play new sound
      this.sound.play();
    });
  }

  /**
   *  Toggle animation for line nodes
   * 
   *  @param {Boolean} toggle 
   */
  private toggleSoundAnimation(toggle = false) : void {
    for (const node of this.nodes) toggle ? node.start() : node.end();
  }
}