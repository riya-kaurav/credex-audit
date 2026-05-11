'use client';

import { useState } from 'react';
import { AuditResult, FormData } from '@/types';
import HeroSection from './HeroSection';
import ToolCard from './ToolCard';
import CredexCTA from './CredexCTA';
import LeadCapture from './LeadCapture';

interface AuditResultsProps {
  result: AuditResult;
  formData: FormData;
}

function generateFallbackSummary(result: AuditResult, formData: FormData): string {
  const { totalMonthlySavings, savingsCategory, recommendations } = result;
  const toolCount = formData.tools.length;
  const totalSpend = formData.tools.reduce((sum, t) => sum + t.monthlySpend, 0);

  if (savingsCategory === 'optimal') {
    return `Your team is running a well-optimized AI stack across ${toolCount} tool${toolCount > 1 ? 's' : ''}, spending $${totalSpend}/month. Based on your ${formData.useCase} workflow and team size of ${formData.teamSize}, your current plan choices align well with your usage. No immediate changes are recommended — revisit this audit if your team size or primary use case changes.`;
  }

  const topRecommendation = recommendations.find((r) => r.savingsAmount > 0);

  return `Your team spends $${totalSpend}/month across ${toolCount} AI tool${toolCount > 1 ? 's' : ''}. This audit identified $${totalMonthlySavings.toFixed(0)}/month in potential savings — $${(totalMonthlySavings * 12).toFixed(0)} annually. ${topRecommendation ? `The biggest opportunity is ${topRecommendation.tool}: ${topRecommendation.reason}` : ''} Implementing these recommendations requires no capability tradeoffs for your ${formData.useCase} workflow.`;
}

export default function AuditResults({ result, formData }: AuditResultsProps) {
  const [reportSaved, setReportSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = generateFallbackSummary(result, formData);
  const shareUrl = `${window.location.origin}/results/${result.auditId}`;

  // Filter out Credex from tool cards — it has its own component
  const toolRecommendations = result.recommendations.filter(
    (r) => r.tool !== 'Credex'
  );

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* Hero */}
      <HeroSection result={result} />

      {/* Credex CTA — only for high savings */}
      {result.savingsCategory === 'high' && (
        <CredexCTA totalMonthlySavings={result.totalMonthlySavings} />
      )}

      {/* Per-tool breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg mb-4">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Tool Breakdown
          </h2>
        </div>
        <div className="px-5">
          {toolRecommendations.map((rec, i) => (
            <ToolCard key={i} recommendation={rec} />
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-white border border-gray-200 rounded-lg px-6 py-5 mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Audit Summary
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
      </div>

      {/* Lead capture — shown only if report not yet saved */}
      {!reportSaved ? (
        <LeadCapture
          auditResult={result}
          onSaved={() => setReportSaved(true)}
        />
      ) : (
        <div className="bg-green-50 border border-green-100 rounded-lg px-6 py-4 mb-4 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-700 shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
          <p className="text-sm text-green-800 font-medium">
            Report saved. Check your inbox for a copy.
          </p>
        </div>
      )}

      {/* Notify me — for optimal spend */}
      {result.savingsCategory === 'optimal' && !reportSaved && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 mb-4">
          <p className="text-sm text-gray-600">
            You are already spending well.{' '}
            <span className="font-medium text-gray-900">
              Save your report
            </span>{' '}
            above and we will notify you when new optimizations apply to your
            stack.
          </p>
        </div>
      )}

      {/* Share */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-4 mb-4">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
            Share this report
          </p>
          <p className="text-xs text-gray-400 truncate max-w-xs">
            {shareUrl}
          </p>
        </div>
        <button
          onClick={handleCopyLink}
          className="shrink-0 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-md transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>

      {/* Run another */}
      <div className="text-center pb-8">
        <a
          href="/audit"
          className="text-sm text-gray-400 hover:text-green-700 transition-colors underline underline-offset-2"
        >
          ← Run another audit
        </a>
      </div>
    </div>
  );
}