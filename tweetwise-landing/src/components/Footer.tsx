import React from 'react';
import { Mail, MessageCircle, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a href="mailto:hello@tweetwise.app" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <Mail className="h-4 w-4" />
                hello@tweetwise.app
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <MessageCircle className="h-4 w-4" />
                Forum
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Social</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="space-y-3">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <br />
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} TweetWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}