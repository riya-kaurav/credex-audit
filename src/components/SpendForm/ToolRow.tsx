'use client';

import { AITool, ToolInput } from '@/types';
import { AI_TOOLS, TOOL_PLANS } from './constants';

interface ToolRowProps {
  index: number;
  tool: ToolInput;
  onChange: (index: number, updated: ToolInput) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function ToolRow({
  index,
  tool,
  onChange,
  onRemove,
  canRemove,
}: ToolRowProps) {
  const plans = TOOL_PLANS[tool.tool] ?? [];

  function handleToolChange(value: AITool) {
    const firstPlan = TOOL_PLANS[value]?.[0] ?? '';
    onChange(index, {
      ...tool,
      tool: value,
      plan: firstPlan,
    });
  }

  return (
    <div className="grid grid-cols-12 gap-3 items-start py-4 border-b border-gray-100 last:border-0">

      {/* Tool */}
      <div className="col-span-12 sm:col-span-3 flex flex-col gap-1">
        {index === 0 && (
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Tool
          </label>
        )}
        <select
          value={tool.tool}
          onChange={(e) => handleToolChange(e.target.value as AITool)}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
        >
          {AI_TOOLS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Plan */}
      <div className="col-span-12 sm:col-span-3 flex flex-col gap-1">
        {index === 0 && (
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Plan
          </label>
        )}
        <select
          value={tool.plan}
          onChange={(e) =>
            onChange(index, { ...tool, plan: e.target.value })
          }
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
        >
          {plans.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Spend */}
      <div className="col-span-6 sm:col-span-3 flex flex-col gap-1">
        {index === 0 && (
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Monthly Spend ($)
          </label>
        )}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            $
          </span>
          <input
            type="number"
            min={0}
            value={tool.monthlySpend}
            onChange={(e) =>
              onChange(index, {
                ...tool,
                monthlySpend: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="0"
            className="w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
          />
        </div>
      </div>

      {/* Seats */}
      <div className="col-span-5 sm:col-span-2 flex flex-col gap-1">
        {index === 0 && (
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Seats
          </label>
        )}
        <input
          type="number"
          min={1}
          value={tool.seats}
          onChange={(e) =>
            onChange(index, {
              ...tool,
              seats: parseInt(e.target.value) || 1,
            })
          }
          placeholder="1"
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
        />
      </div>

      {/* Remove button */}
      <div className="col-span-1 flex flex-col gap-1">
        {index === 0 && (
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide opacity-0 select-none">
            &nbsp;
          </div>
        )}
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
            aria-label="Remove tool"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}