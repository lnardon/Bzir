import { useState } from "react"
import { Point } from '../types';
import { PRESET_BEZIER_CURVES } from '../utils/constants';
import { Copy, Check } from 'lucide-react';

interface ControlPanelProps {
  bezierPoints: Point[];
  updateBezierPoints: (points: Point[]) => void;
  resetAnimation: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  bezierPoints, 
  updateBezierPoints,
  resetAnimation
}) => {
  const [copied, setCopied] = useState(false);

  const cubicBezierString = `cubic-bezier(${bezierPoints[1].x.toFixed(2)}, ${bezierPoints[1].y.toFixed(2)}, ${bezierPoints[2].x.toFixed(2)}, ${bezierPoints[2].y.toFixed(2)})`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(cubicBezierString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePresetChange = (presetKey: string) => {
    const newPoints = [...bezierPoints];
    const preset = PRESET_BEZIER_CURVES[presetKey];
    newPoints[1] = { x: preset[0], y: preset[1] };
    newPoints[2] = { x: preset[2], y: preset[3] };
    updateBezierPoints(newPoints);
    resetAnimation();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
        <code className="text-green-700 font-mono">
          {cubicBezierString}
        </code>
        <button 
          onClick={handleCopyToClipboard}
          className="bg-green-100 hover:bg-green-200 text-green-800 p-2 rounded-md transition-colors flex items-center gap-1 text-sm"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="flex flex-col">
          <label htmlFor="x1" className="text-sm text-gray-600 mb-1">X1</label>
          <input
            id="x1"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={bezierPoints[1].x}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                const newPoints = [...bezierPoints];
                newPoints[1] = { ...newPoints[1], x: Math.max(0, Math.min(1, value)) };
                updateBezierPoints(newPoints);
                resetAnimation();
              }
            }}
            className="border border-gray-300 rounded p-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="y1" className="text-sm text-gray-600 mb-1">Y1</label>
          <input
            id="y1"
            type="number"
            min="-0.5"
            max="1.5"
            step="0.01"
            value={bezierPoints[1].y}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                const newPoints = [...bezierPoints];
                newPoints[1] = { ...newPoints[1], y: Math.max(-0.5, Math.min(1.5, value)) };
                updateBezierPoints(newPoints);
                resetAnimation();
              }
            }}
            className="border border-gray-300 rounded p-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="x2" className="text-sm text-gray-600 mb-1">X2</label>
          <input
            id="x2"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={bezierPoints[2].x}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                const newPoints = [...bezierPoints];
                newPoints[2] = { ...newPoints[2], x: Math.max(0, Math.min(1, value)) };
                updateBezierPoints(newPoints);
                resetAnimation();
              }
            }}
            className="border border-gray-300 rounded p-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="y2" className="text-sm text-gray-600 mb-1">Y2</label>
          <input
            id="y2"
            type="number"
            min="-0.5"
            max="1.5"
            step="0.01"
            value={bezierPoints[2].y}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                const newPoints = [...bezierPoints];
                newPoints[2] = { ...newPoints[2], y: Math.max(-0.5, Math.min(1.5, value)) };
                updateBezierPoints(newPoints);
                resetAnimation();
              }
            }}
            className="border border-gray-300 rounded p-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm text-gray-600 mb-2">Presets</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.keys(PRESET_BEZIER_CURVES).map((key) => (
            <button
              key={key}
              onClick={() => handlePresetChange(key)}
              className="bg-white border border-green-300 hover:bg-green-100 text-green-700 px-2 py-1.5 rounded-md text-sm transition-colors"
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;