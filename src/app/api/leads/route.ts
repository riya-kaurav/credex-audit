import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { AuditResult } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, companyName, role, auditResult } = await req.json() as {
      email: string;
      companyName?: string;
      role?: string;
      auditResult: AuditResult;
    };

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Save lead to Supabase
    const { error: leadError } = await supabase.from('leads').insert({
      audit_id: auditResult.auditId,
      email,
      company_name: companyName || null,
      role: role || null,
    });

    if (leadError) {
      console.error('Lead insert error:', leadError);
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }

    // Build recommendations list for email
    const recommendationLines = auditResult.recommendations
      .filter((r) => r.savingsAmount > 0)
      .map((r) => `• ${r.tool}: ${r.recommendedAction} — save $${r.savingsAmount.toFixed(0)}/month\n  ${r.reason}`)
      .join('\n\n');

    const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/results/${auditResult.auditId}`;

    const emailBody = `
Hi${role ? ` ${role}` : ''},

Here's your SpendLens AI Spend Audit.

TOTAL POTENTIAL SAVINGS
$${auditResult.totalMonthlySavings.toFixed(0)}/month — $${auditResult.totalAnnualSavings.toFixed(0)}/year

${recommendationLines.length > 0 ? `RECOMMENDATIONS\n\n${recommendationLines}` : 'Your AI stack looks well optimized. No immediate changes needed.'}

View your full report here:
${reportUrl}

—
SpendLens
    `.trim();

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'SpendLens <onboarding@resend.dev>',
      to: email,
      subject: `Your SpendLens Audit — $${auditResult.totalMonthlySavings.toFixed(0)}/month in potential savings`,
      text: emailBody,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      // Don't fail the request — lead is saved, email is best effort
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Leads API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}