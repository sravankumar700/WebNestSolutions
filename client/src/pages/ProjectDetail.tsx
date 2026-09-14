import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectBySlug } from '../services/api';
import { Project } from '../types';
import { ExternalLink, Github, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { CTASection } from '../sections/CTASection';

interface ProjectDetailProps {
  onOpenEnquiry: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ onOpenEnquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
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
        <div className="max-w-4xl space-y-4 mb-10">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brandRed-500/10 text-brandRed-500 border border-brandRed-500/30">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-warmNeutral-300 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button variant="primary" showArrow={false}>
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary" showArrow={false}>
                  <Github className="w-4 h-4 mr-2" />
                  <span>GitHub Repository</span>
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Cover Image Banner */}
        <div className="rounded-3xl overflow-hidden border border-charcoal-800 shadow-2xl mb-16 aspect-[16/9] bg-charcoal-900">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overview & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-8 space-y-8">
            {/* Story */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-bold font-display text-white">The Challenge & Strategy</h2>
              <p className="text-warmNeutral-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {project.story || project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-8 space-y-4">
                <h2 className="text-2xl font-bold font-display text-white">Key Features Delivered</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-3 text-sm text-cream-200">
                      <CheckCircle2 className="w-5 h-5 text-brandRed-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-warmNeutral-500 mb-2">
                  Client / Industry
                </h3>
                <p className="text-white font-semibold text-base">{project.category}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-warmNeutral-500 mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-lg bg-charcoal-800 text-cream-200 border border-charcoal-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal-800">
                <Button variant="primary" size="md" className="w-full" onClick={onOpenEnquiry}>
                  Want a website like this?
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-6 mb-20">
            <h2 className="text-2xl font-bold font-display text-white">Project Showcase Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((imgUrl, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-900 aspect-video">
                  <img
                    src={imgUrl}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
