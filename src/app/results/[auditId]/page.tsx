'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AuditResult, FormData } from '@/types';
import AuditResults from '@/components/AuditResults';

export default function ResultsPage() {
  const params = useParams();
  const auditId = params.auditId as string;

  const [result, setResult] = useState<AuditResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
  const loadAudit = () => {
    try {
      const storedResult = sessionStorage.getItem('audit_result');
      const storedForm = sessionStorage.getItem('audit_form');

      if (!storedResult || !storedForm) {
        setNotFound(true);
        return;
      }

      const parsedResult = JSON.parse(storedResult) as AuditResult;

      if (parsedResult.auditId !== auditId) {
        setNotFound(true);
        return;
      }

      setResult(parsedResult);
      setFormData(JSON.parse(storedForm) as FormData);
    } catch {
      setNotFound(true);
    }
  };
  loadAudit();
}, [auditId]);

  // Loading state
  if (!result && !notFound) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading your audit...</p>
      </main>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-sm font-medium text-gray-900 mb-1">
            Report not found
          </p>
          <p className="text-xs text-gray-500 mb-4">
            This report may have expired or the link is incorrect. Run a new
            audit to get your results.
          </p>
          <a
            href="/audit"
            className="inline-block bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
          >
            Run a New Audit
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <AuditResults result={result!} formData={formData!} />
    </main>
  );
}