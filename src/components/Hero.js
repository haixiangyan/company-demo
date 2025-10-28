import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">✨</span>
          <span>专业软件开发团队</span>
        </div>
        <h1 className="hero-title">
          <span className="title-main">海怪科技有限公司</span>
          <span className="title-sub">软件工作室</span>
        </h1>
        <p className="hero-description">
          致力于打造高质量的前端组件库、开发工具与技术解决方案
          <br />
          为企业提供专业的软件开发服务与技术支持
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={scrollToProjects}>
            查看项目
            <span className="btn-icon">→</span>
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.open('https://github.com/haixiangyan', '_blank')}
          >
            GitHub
            <span className="btn-icon">↗</span>
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">10+</div>
            <div className="stat-label">开源项目</div>
          </div>
          <div className="stat">
            <div className="stat-number">3000+</div>
            <div className="stat-label">Star 数量</div>
          </div>
          <div className="stat">
            <div className="stat-number">500K+</div>
            <div className="stat-label">包下载量</div>
          </div>
        </div>
      </div>
      <div className="hero-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </section>
  );
};

export default Hero;

