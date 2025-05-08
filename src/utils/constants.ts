import { Point } from '../types';

export const DEFAULT_BEZIER_POINTS: Point[] = [
  { x: 0, y: 0 },  
  { x: 0.42, y: 0 },
  { x: 0.58, y: 1 },
  { x: 1, y: 1 }   
];

export const PRESET_BEZIER_CURVES: Record<string, [number, number, number, number]> = {
  'ease': [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  'linear': [0, 0, 1, 1],
  'bounce': [0.175, 0.885, 0.32, 1.275],
  'snap': [0, 1, 0.5, 0],
  'slow-mo': [0.2, 0.2, 0, 1]
};