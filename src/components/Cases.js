import React from 'react';
import './Cases.css';

const Cases = () => {
  const cases = [
    {
      title: 'WTF CLI',
      category: '命令行工具',
      description: '一个用于查询英文简写/缩写的命令行工具，帮助开发者快速理解技术术语，提升开发效率',
      achievement: 'npm 包下载量 10K+',
      tech: ['Node.js', 'CLI'],
      icon: '🖕',
      link: 'https://github.com/haixiangyan/wtf-cli'
    },
    {
      title: 'Tenet',
      category: 'VSCode 插件',
      description: '创新的 VSCode 插件，让开发者可以反向编写代码，为编辑器带来独特的交互体验',
      achievement: 'VSCode Marketplace 装机量 5K+',
      tech: ['JavaScript', 'VSCode API'],
      icon: '🧔🏿',
      link: 'https://github.com/haixiangyan/tenet'
    },
    {
      title: 'Banana',
      category: 'CSS 作品',
      description: '纯 CSS3 实现的可爱香蕉动画效果，展示前端视觉设计能力，获得社区广泛好评',
      achievement: '多个技术社区转载推荐',
      tech: ['CSS3', 'Animation'],
      icon: '🍌',
      link: 'https://github.com/haixiangyan/banana'
    },
    {
      title: 'Sketch Book',
      category: '技术文档平台',
      description: '团队知识库与技术博客平台，整合优质技术文章，为开发者提供系统化的学习资源',
      achievement: '累计访问量 100K+',
      tech: ['React', 'Docusaurus'],
      icon: '📚',
      link: 'https://yanhaixiang.com'
    }
  ];

  return (
    <section id="cases" className="cases">
      <h2 className="section-title">成功案例</h2>
      <p className="section-subtitle">
        精选部分优质项目案例，展示我们的技术实力与创新能力
      </p>
      
      <div className="cases-grid">
        {cases.map((caseItem, index) => (
          <div className="case-card" key={index}>
            <div className="case-icon-wrapper">
              <div className="case-icon">{caseItem.icon}</div>
              <div className="case-category">{caseItem.category}</div>
            </div>
            <div className="case-content">
              <h3 className="case-title">{caseItem.title}</h3>
              <p className="case-description">{caseItem.description}</p>
              <div className="case-achievement">
                <span className="achievement-icon">🏆</span>
                {caseItem.achievement}
              </div>
              <div className="case-tech">
                {caseItem.tech.map((tech, i) => (
                  <span className="tech-badge" key={i}>{tech}</span>
                ))}
              </div>
              <a 
                href={caseItem.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="case-link"
              >
                了解更多 →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cases;

