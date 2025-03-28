import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Keep Notes</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your minimalist, distraction-free space for capturing thoughts and ideas
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Simple Note-taking</h3>
            <p className="text-gray-700">
              Focus on your thoughts with our clean, intuitive interface designed for quick capture.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
            <p className="text-gray-700">
              Your notes are encrypted and protected, giving you peace of mind.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-700">
              Instant access to your notes across all your devices with no lag.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Choose Keep Notes?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            In a world full of distractions, Keep Notes provides a sanctuary for your thoughts.
            We've stripped away everything unnecessary so you can focus on what matters - your ideas.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Philosophy</h2>
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <blockquote className="text-xl italic text-gray-800 mb-4">
              "Simplicity is the ultimate sophistication. We built Keep Notes to be powerful yet invisible - 
              a tool that helps you think better without getting in your way."
            </blockquote>
            <p className="font-medium">- The Keep Notes Team</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Ready to organize your thoughts?</h3>
          <Link 
            to="/register" 
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;