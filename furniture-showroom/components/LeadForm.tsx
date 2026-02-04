'use client';

import React, { useState } from 'react';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: 'General Inquiry', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div id="contact" className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-light tracking-tight text-gray-900 sm:text-4xl">
            Start Your Project
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500 font-light">
            Tell us about your needs and our designers will get in touch with you.
          </p>
        </div>
        <div className="mt-12">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-stone-500 focus:border-stone-500 border-gray-300 rounded-none bg-white"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-stone-500 focus:border-stone-500 border-gray-300 rounded-none bg-white"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full text-gray-900 focus:ring-stone-500 focus:border-stone-500 border-gray-300 rounded-none bg-white"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                Interested In
              </label>
              <div className="mt-1">
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-stone-500 focus:border-stone-500 border-gray-300 rounded-none bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Living Room</option>
                  <option>Bedroom</option>
                  <option>Dining Room</option>
                  <option>Office</option>
                  <option>Full Home Design</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-stone-500 focus:border-stone-500 border border-gray-300 rounded-none bg-white"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-none shadow-sm text-base font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition-colors duration-300 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          {status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 text-center border border-green-200">
              Thank you! We have received your message and will be in touch shortly.
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 text-center border border-red-200">
              Something went wrong. Please try again later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
