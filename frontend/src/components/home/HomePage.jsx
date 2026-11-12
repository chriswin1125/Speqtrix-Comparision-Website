import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { BrandShowcase } from './BrandShowcase';
import { TrendingComparisons } from './TrendingComparisons';
import { RecentlyCompared } from './RecentlyCompared';

export const HomePage = ({ onOpenSearch }) => {
  return (
    <div className="w-full">
      <HeroSection onOpenSearch={onOpenSearch} />
      <TrendingComparisons />
      <CategoryGrid />
      <BrandShowcase />
      <RecentlyCompared />
    </div>
  );
};
