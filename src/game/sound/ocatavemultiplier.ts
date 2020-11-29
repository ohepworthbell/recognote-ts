/**
 *  Multiply frequency by 2 until correct octave is reached
 *  
 *  @func ocataveMultiplier
 *  @param {Number} frequency
 *  @param {Number} octave
 */
export default function ocataveMultiplier(frequency: number, octave = 4) : number {
  while (octave--) frequency *= 2;

  // Return as 2-digit number
  return Number(frequency.toFixed(2));
}
