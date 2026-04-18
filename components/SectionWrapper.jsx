'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionWrapper({ children, className = '' }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        scrub: false,
        once: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
    });
  }, []);

  return (
    <section ref={sectionRef} className={`py-8 sm:py-6 lg:py-8 ${className}`}>
      {children}
    </section>
  );
}
