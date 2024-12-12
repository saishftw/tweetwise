import React from 'react';
import { Download, Zap } from 'lucide-react';

const steps = [
  {
    title: 'Install Extension',
    description: 'Download and install TweetWise manually',
    icon: Download,
    action: () => {
      const installationSection = document.getElementById('installation');
      if (installationSection) {
        installationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  {
    title: 'Start Browsing',
    description: 'Experience enhanced Twitter browsing instantly',
    icon: Zap,
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get started with TweetWise in two simple steps
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div 
                  className={`bg-white rounded-2xl p-8 shadow-lg ${step.action ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}`}
                  onClick={step.action}
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                      {index + 1}
                    </div>
                  </div>
                  <step.icon className="h-8 w-8 text-blue-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-center text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}