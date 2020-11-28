import defaults from '../settings/index';
import {Element, Img} from '../util/element';
import {Settings, Dom} from '../interfaces/index';

/**
 *  Create wheel for interactions
 * 
 *  @param {DOMelement} wrapper
 *  @param {Object} notes
 *  @param {Object} settings
 */
export default class NoteWheel {
  wrapper: HTMLElement;
  settings: Settings;
  dom: Dom;

  constructor(wrapper: string, settings?: object) {
    this.wrapper = document.getElementById(wrapper) as HTMLElement;
    this.settings = defaults(settings);

    // Init
    this.createWheel();
  }

  /**
   *  Init wheel
   * 
   */
  createWheel(): void {
    this.createGameArea();
  }

  /**
   *  Draw game area
   * 
   */
  createGameArea(): void {
    let {radius, canvasSize} = this.settings;

    // Set button size
    let buttonSize: number = 100 * 2 * (radius / canvasSize);

    // Create canvas
    let canvas = new (Element as any)('canvas', {
      width: canvasSize,
      height: canvasSize
    });

    // Create button for playing sounds
    let button = new (Element as any)('button', {
      type: 'button',
      title: 'Play sound',
      class: 'play-button button',
      width: buttonSize + '%',
      height: buttonSize + '%'
    }, new (Img as any)('/img/volume.svg', 30, 30, {title: 'Volume icon'}));

    // Append elements to game area
    this.wrapper.append(canvas, button);

    // Save canvas/button for future access via 'this.dom'
    this.dom = {
      canvas, button
    };
  }
}