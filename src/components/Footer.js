import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: '首页', id: 'hero' },
    { name: '关于我们', id: 'about' },
    { name: '核心项目', id: 'projects' },
    { name: '成功案例', id: 'cases' },
    { name: '联系我们', id: 'contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="footer-logo-icon">🎮</span>
            <span className="footer-logo-text">海怪科技</span>
          </div>
          <p className="footer-description">
            专业的软件开发与技术解决方案提供商
            <br />
            致力于打造高质量的前端产品
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">快速链接</h4>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <button onClick={() => scrollToSection(link.id)}>
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">技术社区</h4>
          <ul className="footer-links">
            <li>
              <a href="https://www.zhihu.com/people/haixiangyan" target="_blank" rel="noopener noreferrer">
                知乎
              </a>
            </li>
            <li>
              <a href="https://juejin.cn/user/272334614432887" target="_blank" rel="noopener noreferrer">
                掘金
              </a>
            </li>
            <li>
              <a href="https://www.jianshu.com/u/0340be4082b5" target="_blank" rel="noopener noreferrer">
                简书
              </a>
            </li>
            <li>
              <a href="https://medium.com/@haixiang6123" target="_blank" rel="noopener noreferrer">
                Medium
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">开源项目</h4>
          <ul className="footer-links">
            <li>
              <a href="https://github.com/haixiangyan/make-wheels" target="_blank" rel="noopener noreferrer">
                Make Wheels
              </a>
            </li>
            <li>
              <a href="https://github.com/haixiangyan/jest-tutorial" target="_blank" rel="noopener noreferrer">
                Jest Tutorial
              </a>
            </li>
            <li>
              <a href="https://github.com/haixiangyan/overwatch-ui" target="_blank" rel="noopener noreferrer">
                Overwatch UI
              </a>
            </li>
            <li>
              <a href="https://github.com/haixiangyan" target="_blank" rel="noopener noreferrer">
                更多项目
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© {currentYear} 海怪科技有限公司软件工作室. All rights reserved.</p>
        </div>
        <div className="footer-icp">
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="icp-link"
          >
            粤ICP备2021095802号-2
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

