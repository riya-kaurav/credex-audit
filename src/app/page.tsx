import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SpendLens — Free AI Spend Audit for Startups',
  description:
    'Find out exactly where your team is overspending on AI tools. Get an instant audit — no account required.',
  openGraph: {
    title: 'SpendLens — Free AI Spend Audit',
    description:
      'Enter your AI subscriptions. Get an instant audit showing where you overspend and how to fix it.',
    url: 'https://spendlens.vercel.app',
    siteName: 'SpendLens',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpendLens — Free AI Spend Audit',
    description:
      'Find out exactly where your team is overspending on AI tools.',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto w-full">
        <span className="text-sm font-semibold text-gray-900 tracking-tight">
          SpendLens
        </span>
        <Link
          href="/audit"
          className="bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          Run Free Audit →
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-2xl mx-auto w-full">

        {/* Badge */}
        <span className="inline-block text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full mb-6">
          Free · No account required
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight tracking-tight mb-4">
          Find out if you were overpaying
          <br />
          for AI tools.
        </h1>

        {/* Subheadline */}
        <p className="text-base text-gray-500 mb-8 max-w-md">
          Enter your current AI subscriptions. Get an instant audit showing
          exactly where your team is overspending and what to do about it.
        </p>

        {/* CTA */}
        <Link
          href="/audit"
          className="bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-8 py-3 rounded-md transition-colors"
        >
          Run My Free Audit →
        </Link>

        <p className="text-xs text-gray-400 mt-3">
          Takes 2 minutes. No signup until you want to save your report.
        </p>
      </main>

      {/* How it works */}
      <section className="border-t border-gray-100 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide text-center mb-10">
            How it works
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enter your stack',
                desc: 'Tell us which AI tools your team pays for, which plan, and how many seats.',
              },
              {
                step: '02',
                title: 'Get your audit',
                desc: 'We analyze every subscription — plan fit, team size, use case, and overlap.',
              },
              {
                step: '03',
                title: 'Save and share',
                desc: 'Get a shareable report with your total potential savings and exact next steps.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-green-700 mb-1">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-gray-100 px-6 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide text-center mb-10">
            Built for
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Startup Founders',
                desc: 'See your full AI tool spend in one place and cut what you do not need.',
              },
              {
                title: 'Engineering Managers',
                desc: 'Audit your teams subscriptions and eliminate redundant tooling.',
              },
              {
                title: 'Operations & Finance',
                desc: 'Get a defensible breakdown of AI spend to present to leadership.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-lg px-5 py-5"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-100 px-6 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to see where your money's going?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Free audit. No account. Results in under 2 minutes.
          </p>
          <Link
            href="/audit"
            className="inline-block bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-8 py-3 rounded-md transition-colors"
          >
            Run My Free Audit →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-5 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpendLens · Free AI spend audit for startups
        </p>
      </footer>
    </div>
  );
}