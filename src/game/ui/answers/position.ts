import {Coordinates} from 'interfaces';

/**
 *  Closure; convert angle to coordinate
 * 
 *  @param {Number} radius 
 *  @param {Number} midpoint 
 */
const angletoCoord = (_radius: number, _midpoint: number) => {
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
  // Convert angle to coord
  const pos = angletoCoord(radius, midpoint);

  // Get x/y position
  const x: number = pos(Math.cos(angle));
  const y: number = pos(Math.sin(angle));

  // Return
  return {x, y};
}
