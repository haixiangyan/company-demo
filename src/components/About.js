import React from 'react';
import './About.css';

const About = () => {
  const features = [
    {
      icon: '🎯',
      title: '专业技术团队',
      description: '拥有丰富的前端开发经验，专注于现代化 Web 技术栈'
    },
    {
      icon: '🚀',
      title: '高质量交付',
      description: '注重代码质量与用户体验，提供完善的技术文档与测试'
    },
    {
      icon: '💡',
      title: '创新驱动',
      description: '持续探索新技术，为客户提供创新的解决方案'
    },
    {
      icon: '🤝',
      title: '开源贡献',
      description: '积极参与开源社区，多个项目获得广泛认可'
    }
  ];

  return (
    <section id="about" className="about">
      <h2 className="section-title">关于我们</h2>
      <p className="section-subtitle">
        海怪科技有限公司软件工作室专注于前端技术研发与创新
      </p>
      
      <div className="about-content">
        <div className="about-description">
          <p>
            海怪科技有限公司软件工作室是一家专注于前端技术的专业团队。
            我们致力于为企业提供高质量的软件开发服务，包括组件库开发、
            开发工具构建、Chrome 扩展、VSCode 插件等多个领域。
          </p>
          <p>
            团队成员在多个平台拥有广泛影响力，包括知乎、掘金、简书、Medium 等技术社区。
            我们的开源项目累计获得 3000+ Star，npm 包下载量超过 50 万次，
            为前端开发者社区贡献了大量优质内容和工具。
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

