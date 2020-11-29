import {Element} from 'elements';

/**
 *  Quickly create a ScoreBox
 * 
 */
export default function ScoreBox(content: number, position: string) : HTMLElement {
  this.box = new (Element as any)('div', {
    class: `game__score game__score--${position}`,
    ariaLabel: 'Score'
  }, String(content));

  // Allow score to be changed
  this.box.addEventListener('update-score', function(e: CustomEvent) : void {
    this.textContent = String(e.detail);
  })

  // Return box
  return this.box;
}