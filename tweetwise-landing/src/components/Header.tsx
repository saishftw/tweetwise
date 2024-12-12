import React from 'react';
import { Twitter, Download } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80')] opacity-5" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Twitter className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to TweetWise
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            AI Insights for Your Twitter/X Experience
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500 hover:shadow-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Now
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}