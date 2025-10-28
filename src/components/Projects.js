import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Make Wheels',
      description: '《造轮子》系列技术文档 —— 涵盖 10 个实用的 npm 库开发教程，帮助开发者深入理解前端工程化',
      tech: ['JavaScript', 'npm', 'TypeScript'],
      stars: '1.7k',
      link: 'https://github.com/haixiangyan/make-wheels',
      icon: '🔥'
    },
    {
      title: 'Jest Tutorial',
      description: '《Jest 实践指南》—— 全面的前端测试教程，从基础到进阶，助力团队提升代码质量',
      tech: ['Jest', 'Testing', 'Shell'],
      stars: '793',
      link: 'https://github.com/haixiangyan/jest-tutorial',
      icon: '🃏'
    },
    {
      title: 'Overwatch UI',
      description: '基于 Vue.js 构建的守望先锋风格 UI 组件库，提供独特的游戏化用户界面体验',
      tech: ['Vue.js', 'UI Library', 'CSS'],
      stars: '449',
      link: 'https://github.com/haixiangyan/overwatch-ui',
      icon: '🎮'
    },
    {
      title: 'Nest Todo',
      description: '使用 React.js + Nest.js 实现的全栈 Todo 应用模板，展示现代化 Web 开发最佳实践',
      tech: ['React', 'Nest.js', 'TypeScript'],
      stars: '404',
      link: 'https://github.com/haixiangyan/nest-todo',
      icon: '🐱'
    },
    {
      title: 'Linter Tutorial',
      description: '《Linter 上手完全指南》—— 详细讲解 ESLint、Prettier 等代码规范工具的使用与配置',
      tech: ['ESLint', 'Prettier', 'JavaScript'],
      stars: '213',
      link: 'https://github.com/haixiangyan/linter-tutorial',
      icon: '👮‍♀️'
    },
    {
      title: 'CodeBlock Beautifier',
      description: 'Chrome 扩展程序，为 Medium 文章代码块提供语法高亮，提升阅读体验',
      tech: ['Chrome Extension', 'JavaScript', 'CSS'],
      stars: '126',
      link: 'https://github.com/haixiangyan/codeblock-beautifier',
      icon: '💅'
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">核心项目</h2>
      <p className="section-subtitle">
        我们的技术产品涵盖组件库、开发工具、技术文档等多个领域
      </p>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-header">
              <div className="project-icon">{project.icon}</div>
              <div className="project-stars">⭐ {project.stars}</div>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((tech, i) => (
                <span className="tech-tag" key={i}>{tech}</span>
              ))}
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              查看详情 →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

