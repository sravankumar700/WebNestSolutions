import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  lightMode?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-white border border-cream-300 rounded-2xl overflow-hidden transition-all duration-500 shadow-card-soft hover:shadow-card-hover hover:-translate-y-1">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-brandRed-500 shadow-md">
            View Case Study
          </span>
        </div>

        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-md text-warmNeutral-900 border border-cream-300 shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-warmNeutral-500 uppercase tracking-wider block mb-1">
              {project.category}
            </span>
            <h3 className="text-xl font-bold font-display text-warmNeutral-900 group-hover:text-brandRed-500 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <Link
            to={`/projects/${project.slug}`}
            className="w-10 h-10 rounded-full bg-charcoal-900 text-white flex items-center justify-center group-hover:bg-brandRed-500 transition-all duration-300 flex-shrink-0"
            aria-label={`View ${project.title}`}
          >
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-warmNeutral-500 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technologies Pills */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-5 pt-4 border-t border-cream-200 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md font-medium bg-cream-100 text-warmNeutral-700 border border-cream-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
