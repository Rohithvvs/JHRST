import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustCapabilities } from '../components/home/TrustCapabilities';
import { AboutPreview } from '../components/home/AboutPreview';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { AISolutionsPreview } from '../components/home/AISolutionsPreview';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { DevelopmentProcess } from '../components/home/DevelopmentProcess';
import { FAQ } from '../components/home/FAQ';
import { FinalCTA } from '../components/home/FinalCTA';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      <TrustCapabilities />
      <AboutPreview />
      <ServicesPreview />
      <AISolutionsPreview />
      <FeaturedProjects />
      <WhyChooseUs />
      <DevelopmentProcess />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

