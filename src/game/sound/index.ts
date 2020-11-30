import ocataveMultiplier from './ocatavemultiplier';

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

  constructor(notes: any, note: string, octave = 4) {
    let frequency: number = notes[note].frequency;

    // Save frequency with correct multiplier
    this.frequency = ocataveMultiplier(frequency, octave);
  }

  /**
   *  Play new sound
   * 
   */
  play() {
    // Create new audio context
    let context = new window.AudioContext();

    // Create oscillator
    let oscillator = context.createOscillator();

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
