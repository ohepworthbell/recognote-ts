import {Settings} from 'interfaces';

/**
 *  Default settings for new game
 * 
 */
let settings: Settings = {
  nodes: 30,
  canvasSize: 700,
  ringRadius: 190,
  noteRadius: 220,
  maxOffset: 40,
  lineWidth: 12,
  hardMode: false,
  instrument: 'midi'
}

/**
 *  Export settings as closure, for quick override
 * 
 */
export default (userSettings: object) : Settings => {
  return {...settings, ...userSettings};
}