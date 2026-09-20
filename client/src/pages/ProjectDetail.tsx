import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectBySlug } from '../services/api';
import { Project } from '../types';
import { ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { CTASection } from '../sections/CTASection';

interface ProjectDetailProps {
  onOpenEnquiry: () => void;
}

const galleryFallbacks: Record<string, string[]> = {
  'hair-and-glow': [
    'https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop',
  ],
  'street-barber': [
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop',
  ],
  fryguy: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',
  ],
  'zephyr-interiors': [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop',
  ],
};

const liveUrlsBySlug: Record<string, string> = {
  'hair-and-glow': 'https://hairandglow.vercel.app',
  'street-barber': 'https://streetbarberrr.vercel.app/',
  fryguy: 'https://fryguy.vercel.app/',
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ onOpenEnquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await fetchProjectBySlug(slug);
        setProject(res.data.project);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Project not found.');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [slug]);

  useEffect(() => {
    if (project) setSelectedImage(project.coverImage);
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-brandRed-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-warmNeutral-500">Loading project details...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-white flex flex-col items-center justify-center pt-20 px-4">
        <h2 className="text-3xl font-bold font-display mb-4">Project Not Found</h2>
        <p className="text-warmNeutral-300 text-sm mb-6">{error || "The project you're looking for doesn't exist."}</p>
        <Link to="/projects">
          <Button variant="primary">Back to All Projects</Button>
        </Link>
      </div>
    );
  }

  const imageKey = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  };
  const galleryImages = [project.coverImage, ...(project.gallery || []), ...(galleryFallbacks[project.slug] || [])]
    .filter((imageUrl, index, images) => images.findIndex((candidate) => imageKey(candidate) === imageKey(imageUrl)) === index)
    .slice(0, 5);
  const displayedFeatures = [
    ...(project.features || []),
    'Secure, dependable foundation',
    'Responsive on every device',
    'Fast, performance-ready experience',
  ];

  return (
    <div className="bg-charcoal-950 text-cream-100 pt-28 pb-16">
      <SEO title={project.title} description={project.shortDescription} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center text-xs font-semibold text-warmNeutral-300 hover:text-brandRed-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Projects
        </Link>

        {/* Header Title */}
        <div className="space-y-4 mb-10">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brandRed-500/10 text-brandRed-500 border border-brandRed-500/30">
            {project.category}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-warmNeutral-300 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Action Links */}
            {project.liveUrl && (
              <a href={liveUrlsBySlug[project.slug] || project.liveUrl} target="_blank" rel="noreferrer" className="flex-shrink-0">
                <Button variant="primary" showArrow={false}>
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Main project image with supporting gallery previews */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-3xl overflow-hidden mb-16">
          <div className="lg:col-span-3 min-h-[22rem] lg:min-h-0 aspect-[16/9] lg:aspect-auto rounded-3xl overflow-hidden border border-charcoal-800 shadow-2xl bg-charcoal-900">
            <img
              src={selectedImage || project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-1 min-w-0 max-h-[640px] overflow-y-auto rounded-2xl bg-charcoal-900/60 p-3 border border-charcoal-800">
            <div className="grid grid-rows-5 gap-3">
              {galleryImages.map((imgUrl, i) => (
                <button
                  key={`${imgUrl}-${i}`}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-full max-w-[300px] aspect-[2/1] mx-auto min-w-0 rounded-xl overflow-hidden border bg-charcoal-900 shadow-xl transition-all duration-300 ${
                    selectedImage === imgUrl ? 'border-brandRed-500 ring-2 ring-brandRed-500/40' : 'border-charcoal-700 hover:border-brandRed-500/70'
                  }`}
                  aria-label={`Show ${project.title} gallery image ${i + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} gallery preview ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
              </div>
          </div>
        </div>

        {/* Key Features */}
        {displayedFeatures.length > 0 && (
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-8 space-y-5 mb-16">
            <h2 className="text-2xl font-bold font-display text-white">Key Features Delivered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedFeatures.map((feat, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm text-cream-200">
                  <CheckCircle2 className="w-5 h-5 text-brandRed-500 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" onClick={onOpenEnquiry}>
                Want a website like this?
              </Button>
            </div>
          </div>
        )}

      </div>

      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
