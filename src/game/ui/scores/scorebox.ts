import {Element} from 'elements';

/**
 *  Quickly create a ScoreBox
 * 
 */
export default function ScoreBox(content: number, position: string, text?: string) : HTMLElement {
  // Create box for numbers
  const numberBox = new (Element as any)('span', {
    class: `game__score__number`,
    role: 'none'
  }, String(content));

  // Create wrapping box
  this.box = new (Element as any)('div', {
    class: `game__score game__score--${position}`,
    ariaLabel: text,
    ariaLive: 'polite',
  }, [text, numberBox]);

  // Allow score to be changed
  this.box.addEventListener('update-score', function(e: CustomEvent) : void {
    numberBox.textContent = String(e.detail);
  })

  // Return box
  return this.box;
}