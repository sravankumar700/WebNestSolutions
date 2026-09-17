import React, { useState, useRef } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { SEO } from '../components/SEO';
import { CTASection } from '../sections/CTASection';
import { ShieldCheck, Award, Zap, Code2, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import blackLogo from '../assets/webnest-icon-removebg-preview.png';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="pt-32 pb-16 bg-cream-100 text-warmNeutral-900">
      <SEO title="About WebNest Solutions" description="WebNest Solutions is a premium web development agency crafting digital experiences." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story & Work Process Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              category="OUR STORY"
              title="We craft websites that"
              highlightText="command attention."
              subtitle="WebNest Solutions was founded with a singular mission: to bridge the gap between high-end aesthetic design and robust technical engineering."
              lightMode={true}
            />
            <p className="text-warmNeutral-700 leading-relaxed text-sm sm:text-base max-w-xl">
              We combine thoughtful design with dependable engineering to build digital experiences that are clear, fast, and ready to grow with your business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-warmNeutral-900">
              <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-cream-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CE422B]" />
                <span>Bespoke UI Design</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-cream-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>React & Node.js Code</span>
              </div>
            </div>
          </div>

          {/* Right Agency Process Video */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-charcoal-900 text-white rounded-2xl overflow-hidden border border-charcoal-800 shadow-xl group">
              <div className="relative aspect-[16/10] bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                >
                  <source
                    src="https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_30fps.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support video playback.
                </video>

                <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>
              </div>

              <div className="p-5 bg-charcoal-950 border-t border-charcoal-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={blackLogo} alt="WebNest Logo" className="brand-logo h-8 w-auto object-contain" />
                  <div>
                    <p className="font-bold text-sm text-white">Our process in action</p>
                    <p className="text-xs text-warmNeutral-400">From strategy to polished code</p>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-[#CE422B] flex-shrink-0" />
              </div>

            </div>
          </div>

        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-white border border-cream-300 rounded-2xl p-6 shadow-card-soft">
            <ShieldCheck className="w-8 h-8 text-brandRed-500 mb-4" />
            <h4 className="text-lg font-bold font-display text-warmNeutral-900 mb-2">Uncompromising Security</h4>
            <p className="text-xs text-warmNeutral-500 leading-relaxed">
              Strict authentication, HTTP-only security headers, and clean database sanitization.
            </p>
          </div>

          <div className="bg-white border border-cream-300 rounded-2xl p-6 shadow-card-soft">
            <Zap className="w-8 h-8 text-brandRed-500 mb-4" />
            <h4 className="text-lg font-bold font-display text-warmNeutral-900 mb-2">Extreme Speed</h4>
            <p className="text-xs text-warmNeutral-500 leading-relaxed">
              Optimized Vite bundler, React server hydration, and Cloudinary CDN delivery.
            </p>
          </div>

          <div className="bg-white border border-cream-300 rounded-2xl p-6 shadow-card-soft">
            <Award className="w-8 h-8 text-brandRed-500 mb-4" />
            <h4 className="text-lg font-bold font-display text-warmNeutral-900 mb-2">Client ROI Focus</h4>
            <p className="text-xs text-warmNeutral-500 leading-relaxed">
              We design every section around one core objective: converting traffic into sales.
            </p>
          </div>

          <div className="bg-white border border-cream-300 rounded-2xl p-6 shadow-card-soft">
            <Code2 className="w-8 h-8 text-brandRed-500 mb-4" />
            <h4 className="text-lg font-bold font-display text-warmNeutral-900 mb-2">Modern Tech Stack</h4>
            <p className="text-xs text-warmNeutral-500 leading-relaxed">
              React, TypeScript, Three.js, Node.js, Express, MongoDB, and Tailwind CSS.
            </p>
          </div>
        </div>

      </div>

      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
