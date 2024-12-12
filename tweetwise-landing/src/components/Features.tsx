import React from 'react';
import { MessageSquare, Heart, ShieldCheck, Link, Shuffle } from 'lucide-react';

const features = [
  {
    title: 'Thread Summaries',
    icon: MessageSquare,
    points: ['Instant AI-powered thread summaries', 'Key takeaways at a glance'],
  },
  {
    title: 'Sentiment Analysis',
    icon: Heart,
    points: ['Real-time emotion detection', 'Understand conversation tone'],
  },
  {
    title: 'Fact-Checking',
    icon: ShieldCheck,
    points: ['Automated fact verification', 'Source credibility assessment'],
  },
  {
    title: 'Built-in Citations',
    icon: Link,
    points: ['Auto-generated references', 'One-click source validation'],
  },
  {
    title: 'TweetHop',
    icon: Shuffle,
    points: ['Smart thread navigation', 'Context-aware browsing'],
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to enhance your Twitter experience
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative group rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <ul className="space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="text-gray-600">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}