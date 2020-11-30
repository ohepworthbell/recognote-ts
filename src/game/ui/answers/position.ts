import {Coordinates} from 'interfaces';

/**
 *  Closure; convert angle to coordinate
 * 
 *  @param {Number} radius 
 *  @param {Number} midpoint 
 */
let angletoCoord = (_radius: number, _midpoint: number) => {
  return (_angle: number) : number => Number((_radius * _angle + _midpoint).toFixed(2));
}

/**
 *  Get the coordinates of a point on a circle
 * 
 *  @constructor
 *  @func Position
 *  @param {Number} radius 
 *  @param {Number} angle in radians (e.g. 0 - 2 * Math.PI)
 *  @param {Number} midpoint center of circle (assumes center or circle has x === y)
 * 
 *  @returns {Object} {x,y}
 */
export default function Position(radius: number, angle: number, midpoint: number) : Coordinates {
  // Force Number in arguments
  for (let arg of arguments) arg = Number(arg);

  // Convert angle to coord
  let pos = angletoCoord(radius, midpoint);

  // Get x/y position
  let x: number = pos(Math.cos(angle));
  let y: number = pos(Math.sin(angle));

  // Return
  return {x, y};
}
