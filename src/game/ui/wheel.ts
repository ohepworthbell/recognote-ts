import {Element, Img} from 'elements';
import {Settings, Dom, Coordinates} from 'interfaces';
import defaults from 'settings';
import fetchGroupedSoundNodes from './nodes/group';

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
  nodes: any[];

  constructor(wrapper: string, settings?: object) {
    this.wrapper = document.getElementById(wrapper) as HTMLElement;
    this.settings = defaults(settings);

    // Create nodes
    this.nodes = fetchGroupedSoundNodes(this.settings);

    // Init
    this.createWheel();
  }

  /**
   *  Init wheel
   * 
   */
  private createWheel() : void {
    this.createGameArea();
    this.addGameLineGradient();
    this.animate();
  }

  /**
   *  Animate circle
   * 
   */
  private animate() : void {
    let draw: any;

    (draw = () => {
      this.drawLine();

      window.requestAnimationFrame(draw);
    })();
  }

  /**
   *  Draw game area
   * 
   */
  private createGameArea() : void {
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

  /**
   *  Add gradient to canvas lines
   * 
   */
  private addGameLineGradient() : void {
    let {canvas} = this.dom;
    let ctx = canvas.getContext('2d');

    // Create gradient
    let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);

    // Set gradient colours
    gradient.addColorStop(0.3, '#3762d2');
    gradient.addColorStop(0.6, '#24c597');

    // Store line settings onto canvas
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.settings.lineWidth;
    ctx.lineJoin = 'round';
  }

  /**
   *  Draw lines on canvas
   * 
   */
  private drawLine() : void {
    let {canvas} = this.dom;
    let ctx = canvas.getContext('2d');

    // Fetch nodes
    let nodes = this.nodes;
    let nodeLength = nodes.length - 1;
  
    // Clear context
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Move to initial position
    let startCoords = nodes[0].coords;
    let endCoords = nodes[nodeLength].coords;
  
    // Get offset for coords, to create smooth line at end loop
    let offset: Coordinates = {
      x: (startCoords.x + endCoords.x) / 2,
      y: (startCoords.y + endCoords.y) / 2
    };
  
    // Start line
    ctx.beginPath();
    ctx.moveTo(offset.x, offset.y);
  
    // Loop through points of circle and draw curved lines
    for (let i = 0; i < nodeLength; i++) {
      let current = nodes[i].coords;
      let next = nodes[i + 1].coords;
      let midpoint = {
        x: (current.x + next.x) / 2,
        y: (current.y + next.y) / 2
      };

      ctx.quadraticCurveTo(current.x, current.y, midpoint.x, midpoint.y);
    }
  
    // Loop back to start
    ctx.quadraticCurveTo(endCoords.x, endCoords.y, offset.x, offset.y);
  
    // Stroke path
    ctx.closePath();
    ctx.stroke();
  }
}