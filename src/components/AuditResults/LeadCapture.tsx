'use client';

import { useState } from 'react';
import { AuditResult } from '@/types';

interface LeadCaptureProps {
  auditResult: AuditResult;
  onSaved: () => void;
}

export default function LeadCapture({ auditResult, onSaved }: LeadCaptureProps) {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (honeypot) return;

    if (!email) {
      setError('Email is required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, companyName, role, auditResult }),
      });

      if (!response.ok) throw new Error('Failed to save');

      onSaved();
    } catch (err) {
      console.error('Lead capture error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-6 py-6 mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        Save your report
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        Get a copy of this audit sent to your inbox. We will also notify you when
        new optimizations apply to your stack.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs font-medium text-gray-500 uppercase tracking-wide"
          >
            Work Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="company"
              className="text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              Company Name
            </label>
            <input
              id="company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Inc."
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="role"
              className="text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              Your Role
            </label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Founder, CTO, Eng Manager..."
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-800 hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors self-start"
        >
          {isSubmitting ? 'Saving...' : 'Save My Report'}
        </button>

        <p className="text-xs text-gray-400">
          No spam. We will only reach out if your savings opportunity is significant.
        </p>
      </form>
    </div>
  );
}