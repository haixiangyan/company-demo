import React from 'react';
import './Contact.css';

const Contact = () => {
  const contactInfo = [
    {
      icon: '🌐',
      title: '官方网站',
      value: 'yanhaixiang.com',
      link: 'https://yanhaixiang.com'
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: '@haixiangyan',
      link: 'https://github.com/haixiangyan'
    },
    {
      icon: '📝',
      title: '知乎',
      value: '写代码的海怪',
      link: 'https://www.zhihu.com/people/haixiangyan'
    },
    {
      icon: '✍️',
      title: '掘金',
      value: '写代码的海怪',
      link: 'https://juejin.cn/user/272334614432887'
    }
  ];

  const socialLinks = [
    {
      name: '知乎',
      icon: '📘',
      link: 'https://www.zhihu.com/people/haixiangyan'
    },
    {
      name: '掘金',
      icon: '💎',
      link: 'https://juejin.cn/user/272334614432887'
    },
    {
      name: '简书',
      icon: '📖',
      link: 'https://www.jianshu.com/u/0340be4082b5'
    },
    {
      name: 'Medium',
      icon: '✏️',
      link: 'https://medium.com/@haixiang6123'
    }
  ];

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">联系我们</h2>
      <p className="section-subtitle">
        欢迎与我们取得联系，探讨技术合作与业务咨询
      </p>
      
      <div className="contact-content">
        <div className="contact-info">
          {contactInfo.map((info, index) => (
            <a 
              href={info.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-item"
              key={index}
            >
              <div className="contact-icon">{info.icon}</div>
              <div className="contact-details">
                <div className="contact-title">{info.title}</div>
                <div className="contact-value">{info.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="social-section">
          <h3 className="social-title">关注我们的社交媒体</h3>
          <p className="social-description">
            我们定期在各大技术平台分享优质内容，搜索"写代码的海怪"即可找到我们
          </p>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                key={index}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h3 className="cta-title">准备开始您的项目？</h3>
        <p className="cta-description">
          我们随时准备为您提供专业的技术支持与解决方案
        </p>
        <button 
          className="cta-button"
          onClick={() => window.open('https://github.com/haixiangyan', '_blank')}
        >
          查看更多项目
        </button>
      </div>
    </section>
  );
};

export default Contact;

