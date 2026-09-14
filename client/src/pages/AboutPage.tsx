import React, { useState, useRef } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { SEO } from '../components/SEO';
import { CTASection } from '../sections/CTASection';
import { ShieldCheck, Award, Zap, Code2, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import blackLogo from '../assets/webnest-icon.png';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  const [isPlaying, setIsPlaying] = useState(true);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              category="OUR STORY"
              title="We craft websites that"
              highlightText="command attention."
              subtitle="WebNest Solutions was founded with a singular mission: to bridge the gap between high-end aesthetic design and robust technical engineering."
              lightMode={true}
            />
            <p className="text-warmNeutral-700 leading-relaxed text-sm sm:text-base">
              In a digital landscape flooded with slow templates and repetitive SaaS designs, WebNest stands out by engineering bespoke, lightning-fast web applications. Watch our agency process video to see how we turn concepts into production platforms.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-warmNeutral-900">
              <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-cream-300 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CE422B]" />
                <span>Bespoke UI Design</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-cream-300 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>React & Node.js Code</span>
              </div>
            </div>
          </div>

          {/* Right Autoplay Agency Process Video Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-charcoal-900 text-white rounded-3xl overflow-hidden border border-charcoal-800 shadow-2xl group">
              
              {/* Autoplay Video Stream */}
              <div className="relative aspect-[16/10] bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                >
                  <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41318-large.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support video playback.
                </video>

                {/* Video Top Header Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#CE422B] animate-pulse" />
                    <span className="font-semibold text-white">WebNest Work Process</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                  </div>
                </div>

                {/* Video Bottom Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-white rounded-md">
                        <img src={blackLogo} alt="WebNest Logo" className="h-4 w-auto object-contain" />
                      </div>
                      <span className="font-bold text-xs text-white">Engineering Meets Creative Vision</span>
                    </div>
                    <p className="text-[11px] text-warmNeutral-300 max-w-sm">
                      Watch how our design & development team turns your business strategy into custom code.
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center space-x-3 text-[10px] font-bold text-emerald-400 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                    <Sparkles className="w-3 h-3 text-[#CE422B]" />
                    <span>Live Studio Process</span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="p-4 bg-charcoal-950 border-t border-charcoal-800 grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-xl font-bold font-display text-[#CE422B]">100%</span>
                  <p className="text-[11px] text-warmNeutral-400">Custom Code Quality</p>
                </div>
                <div>
                  <span className="text-xl font-bold font-display text-[#CE422B]">95+</span>
                  <p className="text-[11px] text-warmNeutral-400">Avg PageSpeed Score</p>
                </div>
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
