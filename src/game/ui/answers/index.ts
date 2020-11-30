import {Element} from 'elements';
import Position from './position';

/**
 *  Create answers for the 'quiz'
 * 
 *  @param {Array} answer
 *  @param {Number} angle
 *  @param {Number} radius
 *  @param {Number} midpoint
 */
export default function Answer(answer: string, angle: number, radius = 120, midpoint = 0) : HTMLElement {
  let answerText = answer.toUpperCase();

  // Get coordinates
  let {x, y} = new (Position as any)(radius, angle, midpoint);

  // Add button to dom
  this.button = new (Element as any)('button', {
    type: 'button',
    class: 'game__answer',
    style: `top: ${y}px; left: ${x}px`,
    title: answerText,
    ariaLabel: 'Answer button'
  }, answerText);

  // Return answer
  return this.button;
}
