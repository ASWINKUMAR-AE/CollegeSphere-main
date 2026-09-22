import React, { useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  useEffect(() => {
    // Create floating elements
    const hero = document.querySelector('.hero-container');
    const floatingElements = [];
    
    for (let i = 0; i < 8; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      
      // Random properties
      const shapes = ['circle', 'triangle', 'square'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 20 + 10;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.3 + 0.1;
      const color = i % 2 === 0 ? 'rgba(138, 43, 226, 0.3)' : 'rgba(0, 191, 255, 0.3)';
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${posX}%`;
      element.style.top = `${posY}%`;
      element.style.animationDuration = `${duration}s`;
      element.style.animationDelay = `${delay}s`;
      element.style.opacity = opacity;
      element.style.backgroundColor = color;
      
      if (shape === 'circle') {
        element.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        element.style.width = '0';
        element.style.height = '0';
        element.style.backgroundColor = 'transparent';
        element.style.borderLeft = `${size/2}px solid transparent`;
        element.style.borderRight = `${size/2}px solid transparent`;
        element.style.borderBottom = `${size}px solid ${color}`;
      }
      
      hero.appendChild(element);
      floatingElements.push(element);
    }
    
    return () => {
      floatingElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="hero-container">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Welcome to <span>Tamilnadu Government Polytechnic College</span></h1>
        <p className="hero-subtitle">ADMISSION OPEN</p>
        <a href="/admission" className="hero-button">Explore Admission ⇨</a>
      </div>
    </div>
  );
};

export default Hero;