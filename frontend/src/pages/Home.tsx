import React from 'react';
import { Hero } from '../components/home/Hero';
import { AboutPreview } from '../components/home/AboutPreview';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { FAQ } from '../components/home/FAQ';
import { FinalCTA } from '../components/home/FinalCTA';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <WhyChooseUs />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

