import React from 'react';

const screenshots = [
  {
    title: 'Thread Analysis',
    description: 'AI-powered insights for Twitter threads',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
  },
  {
    title: 'Sentiment Detection',
    description: 'Real-time emotion analysis',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80',
  },
  {
    title: 'Fact Checking',
    description: 'Automated verification system',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80',
  },
];

export default function Screenshots() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Screenshots
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See TweetWise in action
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.title}
              className="overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={screenshot.image}
                  alt={screenshot.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {screenshot.title}
                </h3>
                <p className="mt-2 text-gray-600">{screenshot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}