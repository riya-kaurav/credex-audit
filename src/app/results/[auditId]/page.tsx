'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { AuditResult, FormData } from '@/types';
import AuditResults from '@/components/AuditResults';
import { createClient } from '@/lib/client';

export default function ResultsPage() {
  const params = useParams();
  const auditId = params.auditId as string;

  const [result, setResult] = useState<AuditResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadAudit() {
      try {
        // Fast path — sessionStorage
        const storedResult = sessionStorage.getItem('audit_result');
        const storedForm = sessionStorage.getItem('audit_form');

        if (storedResult && storedForm) {
          const parsedResult = JSON.parse(storedResult) as AuditResult;

          if (parsedResult.auditId === auditId) {
            setResult(parsedResult);
            setFormData(JSON.parse(storedForm) as FormData);
            return;
          }
        }

        // Fallback — fetch from Supabase
        const supabase = createClient();

        const { data, error } = await supabase
          .from('audits')
          .select('*')
          .eq('id', auditId)
          .eq('is_public', true)
          .single();

        if (error || !data) {
          setNotFound(true);
          return;
        }

        const auditResult: AuditResult = {
          auditId: data.id,
          recommendations: data.recommendations,
          totalMonthlySavings: data.total_monthly_savings,
          totalAnnualSavings: data.total_annual_savings,
          savingsCategory: data.savings_category,
          createdAt: data.created_at,
          isPublic: data.is_public,
        };

        const reconstructedForm: FormData = {
          tools: [],
          teamSize: data.team_size,
          useCase: data.use_case,
        };

        setResult(auditResult);
        setFormData(reconstructedForm);
      } catch (error) {
        console.error('Failed to load audit:', error);
        setNotFound(true);
      }
    }

    if (auditId) {
      loadAudit();
    }
  }, [auditId]);

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

          <Link
            href="/audit"
            className="inline-block bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
          >
            Run a New Audit
          </Link>
        </div>
      </main>
    );
  }

  if (!result || !formData) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading your audit...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <AuditResults
        result={result}
        formData={formData}
      />
    </main>
  );
}