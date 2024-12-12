import React from 'react';
import { Download, Users } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:3rem_3rem]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Twitter Experience?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of users who have already enhanced their social media journey
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50 hover:shadow-blue-200/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Now
              </div>
            </button>
            <button className="rounded-full bg-blue-400/20 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-400/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Join the Community
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}