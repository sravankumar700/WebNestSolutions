import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Link2Off, MousePointer2 } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] bg-charcoal-950 text-cream-100 flex items-center px-6 py-20 sm:px-10 lg:px-16">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-center">
          <div>
            <p className="font-display text-[clamp(7rem,18vw,15rem)] leading-[0.75] font-black tracking-tight text-brandRed-500">
              404
            </p>

            <div className="max-w-xl mt-10">
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
                This route is outside the nest.
              </h1>
              <p className="mt-5 text-sm sm:text-base text-warmNeutral-400 leading-7">
                We could not find the page you requested. The link may be outdated, or the route may have moved.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-brandRed-500 hover:bg-brandRed-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                Go Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 text-sm font-semibold px-5 py-3 rounded-xl border border-charcoal-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>

          <div className="hidden lg:block w-[360px] rounded-2xl border border-charcoal-700 bg-charcoal-900/70 p-4 shadow-2xl rotate-2">
            <div className="flex items-center gap-2 border-b border-charcoal-800 pb-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 rounded-md bg-charcoal-950 border border-charcoal-800 px-3 py-1.5 text-[10px] text-warmNeutral-400 truncate">
                webnestsolutions.com{location.pathname}
              </div>
            </div>
            <div className="relative h-52 mt-4 rounded-xl border border-charcoal-800 bg-charcoal-950 overflow-hidden p-5">
              <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(206,66,43,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(206,66,43,0.18)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="relative h-full flex flex-col items-center justify-center gap-4">
                <Link2Off className="w-12 h-12 text-brandRed-500" strokeWidth={1.5} />
                <div className="text-center">
                  <p className="text-sm font-bold text-white">Broken route detected</p>
                  <p className="text-[11px] text-warmNeutral-500 mt-1">The WebNest sitemap has no match.</p>
                </div>
              </div>
              <MousePointer2 className="absolute bottom-4 right-6 w-6 h-6 text-brandRed-500 rotate-[-18deg]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
