import {Element} from 'elements';
import randomString from 'util/random-string';

/**
 *  Simple Toast generation
 *
 *  @param {String} content visible text for toast
 *  @param {Boolean} error whether the toast is an error or not
 */
export default function addToast(content: string, success = false) : void {
  // Create random ID
  const uniqueId = `toast-${randomString()}`;

  // Create 'close' button for toast
  const button: HTMLElement = new (Element as any)('button', {
    class: 'toasts__close',
    type: 'button',
    title: 'Close',
    ariaLabel: 'Close',
      ariaAtomic: true,
    ariaControls: uniqueId
  }, '×');

  // Create toast
  const toast: HTMLElement = new (Element as any)('dialogue', {
    class: `toasts__modal toasts__modal--${success ? 'success' : 'error'}`,
    id: uniqueId
  }, [content, button]);

  // Auto-remove toast after 2 seconds
  const timeout: any = setTimeout(() : void => {
    toast.remove();
  }, 2000);

  // Allow manual removal of toast
  button.addEventListener('click', (e: Event) : void => {
    e.preventDefault();

    // Remove toast
    toast.remove();
  });

  // Prevent auto-removal of toast on hover
  toast.addEventListener('mouseenter', () : void => {
    clearTimeout(timeout);
  })

  // Add toast to wrapper
  document.getElementById('toasts').append(toast);
}