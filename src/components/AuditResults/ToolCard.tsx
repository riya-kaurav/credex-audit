'use client';

import { ToolRecommendation } from '@/types';

interface ToolCardProps {
  recommendation: ToolRecommendation;
}

export default function ToolCard({ recommendation }: ToolCardProps) {
  const { tool, currentSpend, recommendedAction, savingsAmount, reason } =
    recommendation;

  const isOptimal = savingsAmount === 0 && recommendedAction === 'No changes needed';
 
  const hasRealSavings = savingsAmount > 0;



  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 py-4 border-b border-gray-100 last:border-0">

      {/* Tool name */}
      <div className="sm:w-36 shrink-0">
        <p className="text-sm font-semibold text-gray-900">{tool}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          ${currentSpend.toFixed(0)}/mo current
        </p>
      </div>

      {/* Recommendation */}
      <div className="flex-1">
        <p
          className={`text-sm font-medium mb-1 ${
            isOptimal ? 'text-gray-500' : 'text-gray-900'
          }`}
        >
          {recommendedAction}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">{reason}</p>
      </div>

      {/* Savings badge */}
      <div className="sm:w-24 shrink-0 sm:text-right">
        {hasRealSavings ? (
          <span className="inline-block bg-green-50 text-green-800 border border-green-100 text-xs font-semibold px-2.5 py-1 rounded-full">
            −${savingsAmount.toFixed(0)}/mo
          </span>
        ) : (
          <span className="inline-block bg-gray-50 text-gray-400 border border-gray-100 text-xs font-medium px-2.5 py-1 rounded-full">
            {isOptimal ? 'Optimal' : 'Review'}
          </span>
        )}
      </div>
    </div>
  );
}