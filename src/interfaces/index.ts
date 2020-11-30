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
 *  Coordinates
 * 
 */
export type Coordinates = {
  x: number,
  y: number
}