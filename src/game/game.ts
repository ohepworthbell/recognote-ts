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

  constructor(wrapper: string, notes?: object, settings?: object) {
    super(wrapper, settings);

    // Save notes for game
    this.notes = notes;
    
    // Test log
    this.animate();
  }

  /**
   *  Toggle animation for line nodes
   * 
   *  @param {Boolean} toggle 
   */
  toggleSoundAnimation(toggle: boolean = false) : void {
    for (let node of this.nodes) toggle ? node.start() : node.end();
  }

  /**
   *  Animate circle
   * 
   */
  animate() {
    let draw: any;

    (draw = () => {
      this.drawLine();

      window.requestAnimationFrame(draw);
    })();
  }
}