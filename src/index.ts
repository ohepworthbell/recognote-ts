import notes from './assets/scripts/notes.json';
import settings from './assets/scripts/settings.json';
import Game from './game/index';

/**
 *  Create new instance of app
 * 
 */
new Game('app', notes, settings);