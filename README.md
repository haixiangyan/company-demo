# 海怪科技有限公司 - 软件工作室官网

这是海怪科技有限公司软件工作室的官方门户网站，使用 React 构建。

## 技术栈

- React 18
- React Router DOM
- Framer Motion (动画库)
- 现代化 CSS3

## 快速开始

### 方式一：使用 npm 命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问 http://localhost:3000
```

### 方式二：使用 Makefile（推荐）

```bash
# 查看所有可用命令
make help

# 安装依赖
make install

# 启动开发服务器
make dev

# 构建生产版本
make build

# Docker 构建和运行
make docker-build
make docker-run

# 健康检查
make health
```

### 构建生产版本

```bash
npm run build
# 或
make build
```

构建产物将生成在 `build` 文件夹中。

## Docker 部署

### 方式一：使用 Docker

```bash
# 构建镜像
docker build -t monster-tech-portal:latest .

# 运行容器
docker run -d -p 80:80 --name monster-tech-portal monster-tech-portal:latest

# 访问网站
# http://localhost
```

### 方式二：使用 Docker Compose

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f
```

### 方式三：一键部署脚本

```bash
# 运行部署脚本
./deploy.sh
```

### 腾讯云容器部署步骤

1. **登录腾讯云容器镜像服务**
```bash
docker login ccr.ccs.tencentyun.com
```

2. **构建并标记镜像**
```bash
docker build -t monster-tech-portal:latest .
docker tag monster-tech-portal:latest ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest
```

3. **推送镜像到腾讯云**
```bash
docker push ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest
```

4. **在腾讯云容器服务中部署**
   - 登录腾讯云控制台
   - 进入容器服务 TKE
   - 创建工作负载，选择刚推送的镜像
   - 配置端口映射（容器端口 80）
   - 部署并访问

## 网站结构

- **首页** - 展示公司简介和核心数据
- **关于我们** - 介绍公司背景和技术优势
- **核心项目** - 展示主要技术产品
- **成功案例** - 精选优质项目案例
- **联系我们** - 提供联系方式和社交媒体链接

## 项目结构

```
company-demo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── public/
│   └── index.html             # HTML 模板
├── src/
│   ├── components/            # React 组件
│   │   ├── Header.js          # 导航栏
│   │   ├── Hero.js            # 首页横幅
│   │   ├── About.js           # 关于我们
│   │   ├── Projects.js        # 核心项目
│   │   ├── Cases.js           # 成功案例
│   │   ├── Contact.js         # 联系我们
│   │   └── Footer.js          # 页脚（含备案号）
│   ├── App.js                 # 主应用组件
│   ├── App.css                # 主样式
│   ├── index.js               # 应用入口
│   └── index.css              # 全局样式
├── Dockerfile                 # Docker 镜像构建文件
├── docker-compose.yml         # Docker Compose 开发配置
├── docker-compose.prod.yml    # Docker Compose 生产配置
├── nginx.conf                 # Nginx 服务器配置
├── deploy.sh                  # 一键部署脚本
├── healthcheck.sh             # 健康检查脚本
├── Makefile                   # Make 命令快捷方式
├── DEPLOY.md                  # 详细部署指南
├── QUICKSTART.md              # 快速开始指南
└── README.md                  # 项目说明文档
```

## 特性

- ✨ 现代化设计风格
- 📱 完全响应式布局
- 🎨 精美的动画效果
- 🚀 快速加载性能
- 🐳 Docker 容器化部署
- 🔄 GitHub Actions 自动化 CI/CD
- 📊 健康检查和监控
- 🔗 备案信息：粤ICP备2021095802号-2

## 相关文档

- 📖 [快速开始指南](./QUICKSTART.md) - 快速部署到腾讯云
- 📚 [详细部署文档](./DEPLOY.md) - 完整的部署说明和最佳实践
- 🔧 [Makefile 命令](./Makefile) - 便捷的开发和部署命令

## 常用命令速查

```bash
# 开发
make dev              # 启动开发服务器

# 构建
make docker-build     # 构建 Docker 镜像
make docker-run       # 运行容器

# 维护
make health           # 健康检查
make logs            # 查看日志
make restart         # 重启容器

# 部署
make deploy          # 运行部署脚本
```

## 版权信息

© 2025 海怪科技有限公司软件工作室. All rights reserved.

备案号：粤ICP备2021095802号-2

