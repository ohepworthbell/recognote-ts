import SoundNode from './groupitem';
import {Settings} from 'interfaces';

/**
 *  Create nodes for the NoteWheel
 *  
 *  @constructor
 *  @func SoundNodeGroup
 *  @param {Object} settings
 */
export default function fetchGroupedSoundNodes(settings: Settings) : SoundNode[] {
  // Ensure notes array is empty
  let nodes: SoundNode[] = [];

  // Get angle between segments
  let segments: number = Math.PI * 2 / settings.nodes;
  let radius: number = settings.ringRadius;
  let midPoint: number = settings.canvasSize / 2;
  let maxOffset: number = settings.maxOffset;

  // Loop through each node and create a point on the map to draw
  for (let i=0; i<settings.nodes; i++) {
    let angle: number = segments * i;

    // Add node to coords
    nodes.push(new SoundNode(angle, radius, midPoint, maxOffset));
  };

  return nodes;
}
