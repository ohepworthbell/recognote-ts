import {Settings} from 'interfaces';

/**
 *  Default settings for new game
 * 
 */
let settings: Settings = {
  nodes: 30,
  radius: 100,
  maxOffset: 40,
  lineWidth: 12,
  canvasSize: 800,
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