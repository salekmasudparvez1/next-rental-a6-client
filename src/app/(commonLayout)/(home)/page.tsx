import HeroSection from '@/components/module/hero-section/HeroSection';
import { TestimonialSection } from '@/components/module/testimonial-section/TestimonialSection';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: {
    default: "Findbasa",
    template: "%s - Findbasa",
  },
  description:
    "Findbasa is your ultimate platform for discovering and sharing amazing content.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

const Page = () => {
  return (
    <div>
      <HeroSection />
      <TestimonialSection />
    </div>
  );
}

export default Page;
