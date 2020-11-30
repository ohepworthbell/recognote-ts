/**
 *  Easing functions
 * 
 *  @param {Number} t current tween number
 */
export function easeInOutQuad(t: number) : number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}