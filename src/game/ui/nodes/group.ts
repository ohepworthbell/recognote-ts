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
  const nodes: SoundNode[] = [];

  // Get angle between segments
  const segments: number = Math.PI * 2 / settings.nodes;
  const radius: number = settings.ringRadius;
  const midPoint: number = settings.canvasSize / 2;
  const maxOffset: number = settings.maxOffset;

  // Loop through each node and create a point on the map to draw
  for (let i=0; i<settings.nodes; i++) {
    const angle: number = segments * i;

    // Add node to coords
    nodes.push(new SoundNode(angle, radius, midPoint, maxOffset));
  }

  return nodes;
}
