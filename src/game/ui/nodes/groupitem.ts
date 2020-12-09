import {easeInOutQuad} from 'easing';
import {Coordinates} from 'interfaces';

// Set constants for SoundNode
const EASE_OUT_FRAME_COUNT = 15;
const OFFSET_EASE_OUT = 0.987;
const MIN_TWEEN_VALUE = 0.05;
const MAX_TWEEN_VALUE = 0.2;

/**
 *  Create wheel for interactions
 * 
 *  @param {Number} angle
 *  @param {Number} radius
 *  @param {Number} midPoint
 *  @param {Number} maxOffset
 */
export default class SoundNode {
  private angle: number;
  private radius: number;
  private midPoint: number;
  private maxOffset: number;
  private offset: number;
  private direction: number;
  private active: boolean;
  private tween: number;

  // For getters/setters
  private _ease: number;

  constructor(angle: number, radius: number, midPoint: number, maxOffset: number) {
    this.angle = angle;
    this.radius = radius;
    this.midPoint = midPoint;
    this.maxOffset = this.offset = maxOffset;

    // Starting params for easing
    this.ease = 0;
    this.tween = 0;
    this.direction = 1;
    this.active = false;
  }

  /**
   *  Create new tween
   * 
   */
  start() : void {
    // Set tweening to active
    this.active = true;

    // Get a new offset, to simulate randomness
    this.offset = this.maxOffset * Math.random() - this.maxOffset / 2;

    // Get a new tween value
    this.resetTween();
  }

  /**
   *  End tween
   * 
   */
  end() : void {
    // Set tween to inactive
    this.active = false;
  }

  /**
   *  Calculate easing number
   * 
   */
  get coords() : Coordinates {
    this.updateEasing();

    // Ease out offset
    this.offset *= OFFSET_EASE_OUT;

    // Check if tween is active
    const radius = this.radius + this.offset * this.ease;

    // Calculate coordinates
    const coords = {
      x: radius * Math.cos(this.angle) + this.midPoint,
      y: radius * Math.sin(this.angle) + this.midPoint
    };

    return coords;
  }

  /**
   *  Calculate tween values
   * 
   */
  private resetTween() : void {
    // Reverse direction
    this.direction *= -1;

    // Set random new tween between min/max values;
    const tween = Math.max(Math.random() * MAX_TWEEN_VALUE, MIN_TWEEN_VALUE);

    // Save new tween
    this.tween = tween * this.direction;
  }

  /**
   *  Calculate easing number
   * 
   */
  private updateEasing() : number {
    // If tween is inactive, fade it out over n-frames
    if (!this.active) {
      // If ease value is close to 0, return 0
      if (this.ease === 0) return 0;

      // Get tween value that will loop user back to 0
      this.tween = this.ease / -EASE_OUT_FRAME_COUNT;
    }

    // Increase ease value by tween amount
    this.ease += this.tween;

    // Get ease value as quadtratic
    return easeInOutQuad(this.ease);
  }

  /**
   *  Get easing value
   * 
   *  @returns {Number}
   */
  private get ease() : number {
    return this._ease;
  }

  /**
   *  Set easing value
   * 
   *  @param {Number} num set new easing value
   */
  private set ease(num: number) {
    // If easing is out of bounds, reverse direction of tween
    if(Math.abs(num) > 1) this.resetTween();

    // Save easing
    this._ease = Math.max(Math.min(num, 1), -1);
  }
}
