import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/Button';
import { Project } from '../types';

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="featured-projects" className="bg-cream-100 text-warmNeutral-900 py-20 lg:py-28 relative border-t border-cream-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            category="FEATURED PROJECTS"
            title="Some of our"
            highlightText="recent work."
            subtitle="Real websites. Real businesses. Real results."
            lightMode={true}
          />

          <div className="hidden md:block mb-12">
            <Link to="/projects">
              <Button variant="outline" className="border-cream-400 text-warmNeutral-900 hover:bg-brandRed-500 hover:text-white hover:border-brandRed-500">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project) => (
            <ProjectCard key={project._id || project.slug} project={project} lightMode={true} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link to="/projects">
            <Button variant="outline" className="w-full border-cream-400 text-warmNeutral-900">
              View All Projects
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};
