import NoteWheel from './ui/wheel';

/**
 *  Create a new game
 * 
 *  @param {DOMelement} wrapper
 *  @param {Object} notes
 *  @param {Object} settings
 */
export default class Game extends NoteWheel {
  notes: object;
  answers: any[];
  scoreboard: any;

  constructor(wrapper: string, notes?: object, settings?: object) {
    super(wrapper, settings);

    // Save notes for game
    this.notes = notes;

    // Set empty object for answers
    this.answers = [];

    // Create scoreboard
    this.scoreboard = null;

    // Establish new round
    this.addAnswerButtons();
    this.addHandlers(true);
  }

  /**
   *  Add answer buttons
   * 
   */
  private addAnswerButtons() : void {}

  /**
   *  Add event handlers
   * 
   *  @param {Boolean} initial 
   */
  private addHandlers(initial:boolean = false) : void {
    let {button} = this.dom;
    
    // Add click handler for central button
    this.dom.button.addEventListener('click', (e: Event) : void => {
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
    });
  }

  /**
   *  Toggle animation for line nodes
   * 
   *  @param {Boolean} toggle 
   */
  toggleSoundAnimation(toggle: boolean = false) : void {
    for (let node of this.nodes) toggle ? node.start() : node.end();
  }
}