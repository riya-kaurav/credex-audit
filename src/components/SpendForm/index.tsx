'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormData, ToolInput, UseCase } from '@/types';
import ToolRow from './ToolRow';
import { AI_TOOLS, TOOL_PLANS, USE_CASES } from './constants';

const STORAGE_KEY = 'credex_audit_form';

const DEFAULT_TOOL: ToolInput = {
  tool: 'ChatGPT',
  plan: 'Plus',
  monthlySpend: 0,
  seats: 1,
};

const DEFAULT_FORM: FormData = {
  tools: [{ ...DEFAULT_TOOL }],
  teamSize: 1,
  useCase: 'mixed',
};

export default function SpendForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
 useEffect(() => {
  const loadSaved = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as FormData;
        setForm(parsed);
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  };
  loadSaved();
}, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // ignore storage errors
    }
  }, [form, hydrated]);

  function handleToolChange(index: number, updated: ToolInput) {
    setForm((prev) => {
      const tools = [...prev.tools];
      tools[index] = updated;
      return { ...prev, tools };
    });
  }

  function handleAddTool() {
    setForm((prev) => ({
      ...prev,
      tools: [
        ...prev.tools,
        {
          tool: AI_TOOLS[prev.tools.length % AI_TOOLS.length],
          plan: TOOL_PLANS[AI_TOOLS[prev.tools.length % AI_TOOLS.length]][0],
          monthlySpend: 0,
          seats: 1,
        },
      ],
    }));
  }

  function handleRemoveTool(index: number) {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) throw new Error('Audit API failed');

    const { result, formData } = await response.json();

    // Store in sessionStorage as fast path for results page
    sessionStorage.setItem('audit_result', JSON.stringify(result));
    sessionStorage.setItem('audit_form', JSON.stringify(formData));

    router.push(`/results/${result.auditId}`);
  } catch (err) {
    console.error('Audit failed:', err);
    setIsLoading(false);
  }
}

  const totalMonthlySpend = form.tools.reduce(
    (sum, t) => sum + (t.monthlySpend || 0),
    0
  );

  if (!hydrated) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          AI Spend Audit
        </h1>
        <p className="text-sm text-gray-500">
          Enter your current AI subscriptions. We will tell you exactly where you are overspending.
        </p>
      </div>

      {/* Tools Section */}
      <div className="bg-white border border-gray-200 rounded-lg mb-4">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Your AI Tools
          </h2>
        </div>

        <div className="px-5">
          {form.tools.map((tool, index) => (
            <ToolRow
              key={index}
              index={index}
              tool={tool}
              onChange={handleToolChange}
              onRemove={handleRemoveTool}
              canRemove={form.tools.length > 1}
            />
          ))}
        </div>

        <div className="px-5 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleAddTool}
            className="flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
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
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add another tool
          </button>
        </div>
      </div>

      {/* Team Info Section */}
      <div className="bg-white border border-gray-200 rounded-lg mb-4">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Team Info
          </h2>
        </div>

        <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Team Size */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="teamSize"
              className="text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              Total Team Size
            </label>
            <input
              id="teamSize"
              type="number"
              min={1}
              value={form.teamSize}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  teamSize: parseInt(e.target.value) || 1,
                }))
              }
              placeholder="e.g. 5"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
            <p className="text-xs text-gray-400">
              Total number of people at your company
            </p>
          </div>

          {/* Use Case */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="useCase"
              className="text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              Primary Use Case
            </label>
            <select
              id="useCase"
              value={form.useCase}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  useCase: e.target.value as UseCase,
                }))
              }
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            >
              {USE_CASES.map((uc) => (
                <option key={uc.value} value={uc.value}>
                  {uc.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400">
              How your team primarily uses AI tools
            </p>
          </div>
        </div>
      </div>

      {/* Summary bar + Submit */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            Total Monthly Spend
          </p>
          <p className="text-xl font-semibold text-gray-900">
            ${totalMonthlySpend.toFixed(2)}
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || form.tools.length === 0}
          className="bg-green-800 hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Run My Audit →'}
        </button>
      </div>

      {/* Small disclaimer */}
      <p className="text-xs text-gray-400 text-center mt-4">
        No account required. Your data stays in your browser until you choose to save your report.
      </p>
    </form>
  );
}