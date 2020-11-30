/**
 *  Create random unique ID
 *
 */
export default function randomString() : string {
  return Math.random().toString(36).substr(2, 7);
}