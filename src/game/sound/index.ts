import ocataveMultiplier from './ocatavemultiplier';
import {Notes, GenericObject} from 'interfaces';

/**
 *  Create new frequency from provided note
 * 
 *  @param {Object} notes
 *  @param {String} note
 *  @param {Number} octave
 *  @param {String} instrument
 */
export default class Sound {
  private frequency: number;

  constructor(notes: Notes, note: string, octave = 4) {
    const frequency: number = (notes as GenericObject)[note].frequency;

    // Save frequency with correct multiplier
    this.frequency = ocataveMultiplier(frequency, octave);
  }

  /**
   *  Play new sound
   * 
   */
  play() : void {
    // Create new audio context
    const context = new window.AudioContext();

    // Create oscillator
    const oscillator = context.createOscillator();

    // Add common settings to oscillator, connect to destination
    oscillator.type = 'sine';
    oscillator.connect(context.destination);

    // Set correct pitch for note
    oscillator.frequency.value = this.frequency;

    // Play note for 300ms
    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
  }
}
