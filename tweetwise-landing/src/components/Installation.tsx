import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  <a href="https://github.com/saishftw/tweetwise/releases/download/v0.1/tweetwise-extension.zip">Download and Unzip the extension package</a>,
  <a href="chrome://extensions" target="_blank" rel="noopener noreferrer">Open Chrome Extensions page (chrome://extensions)</a>,
  'Enable Developer Mode in top right',
  'Click "Load unpacked" button on the top left',
  'Select the unzipped folder',
  'Pin TweetWise to your toolbar from the Extensions menu on top right',
];

export default function Installation() {
  return (
    <section id="installation" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Manual Installation
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Follow these steps to install TweetWise manually
          </p>
          <p className="mt-2 text-sm text-red-600 font-medium">
            Note: TweetWise is only supported on Chrome or Chromium-based browsers that support Side Panel (Arc browser is not supported)
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-900">
                    <span className="font-semibold">Step {index + 1}:</span>{' '}
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}