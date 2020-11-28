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
  radius: number,
  maxOffset: number,
  lineWidth: number,
  canvasSize: number,
  hardMode: boolean,
  instrument: string
}