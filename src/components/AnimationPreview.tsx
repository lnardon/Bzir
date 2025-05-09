import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Point } from '../types';

interface AnimationPreviewProps {
  bezierPoints: Point[];
  duration: number;
  isPlaying: boolean;
  setDuration: (duration: number) => void;
  toggleAnimation: () => void;
}

const AnimationPreview: React.FC<AnimationPreviewProps> = ({
  bezierPoints,
  duration,
  setDuration,
  isPlaying,
  toggleAnimation
}) => {
  const cubicBezierValue = `cubic-bezier(${bezierPoints[1].x}, ${bezierPoints[1].y}, ${bezierPoints[2].x}, ${bezierPoints[2].y})`;
  
  const animationStyle = {
    animationTimingFunction: cubicBezierValue,
    animationDuration: `${duration}s`,
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationPlayState: isPlaying ? 'running' : 'paused'
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-16 bg-gray-100 rounded-md overflow-hidden">
        <div 
          className="absolute h-8 w-8 top-4 bg-emerald-500 rounded shadow-md animate-move-horizontal"
          style={animationStyle}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={toggleAnimation}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-2 transition-colors flex-shrink-0"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="duration" className="text-sm text-gray-600">
              Duration: {duration.toFixed(1)}s
            </label>
          </div>
          <input
            id="duration"
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.5s</span>
            <span>5s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationPreview;