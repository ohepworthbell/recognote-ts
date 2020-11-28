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
    console.log('this:', this);
  }
}