// src/pages/Home.jsx
import React from 'react';
import Hero from '../sections/Hero';
import ProcessSection from '../sections/Process';
import Services from '../sections/Services';
import AboutSection from '../sections/AboutSection';
import Testimonials from '../sections/Testimonials';
// Note: Navbar and Footer are removed from imports

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProcessSection />
      <Services />
      <Testimonials />
    </>
  );
};

export default Home;