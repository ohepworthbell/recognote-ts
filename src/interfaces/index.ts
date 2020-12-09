/**
 *  NoteWheel DOM interface
 * 
 */
export type Dom = {
  canvas: HTMLCanvasElement,
  button: HTMLButtonElement,
}

/**
 *  NoteWheel Settings interface
 * 
 */
export type Settings = {
  nodes: number,
  canvasSize: number,
  ringRadius: number, 
  noteRadius: number,
  maxOffset: number,
  lineWidth: number,
  hardMode: boolean,
  instrument: string
}

/**
 *  Attributes object
 * 
 */
export type GenericObject = { [key: string]: any };

/**
 *  Note interace
 * 
 */
type Note = {
  frequency: number,
  notes: string[],
  chords: string[]
}

/**
 *  NoteWheel Notes interface
 * 
 */
export type Notes = {
  a: Note,
  b: Note,
  c: Note,
  d: Note,
  e: Note,
  f: Note,
  g: Note,
}

/**
 *  Coordinates
 * 
 */
export type Coordinates = {
  x: number,
  y: number
}