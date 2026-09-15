import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-charcoal-950">
      <div className="max-w-xl w-full rounded-3xl border border-charcoal-800 bg-charcoal-900/90 p-8 sm:p-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brandRed-500/10 text-3xl text-brandRed-500">
          404
        </div>

        <p className="text-[10px] uppercase tracking-[0.28em] text-brandRed-500 font-bold mb-4">
          Page unavailable
        </p>

        <h1 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
          Something went wrong
        </h1>

        <p className="text-sm sm:text-base text-warmNeutral-400 leading-7">
          We are currently facing some issues. Please retry after some time.
        </p>

        <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/"
            className="bg-brandRed-500 hover:bg-brandRed-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Go Home
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 text-sm font-semibold px-5 py-2.5 rounded-xl border border-charcoal-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};
