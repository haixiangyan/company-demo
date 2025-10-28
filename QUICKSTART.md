# 快速开始指南

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm start

# 3. 在浏览器中打开
# http://localhost:3000
```

## Docker 本地测试

```bash
# 1. 构建镜像
docker build -t monster-tech-portal .

# 2. 运行容器
docker run -d -p 80:80 monster-tech-portal

# 3. 访问网站
# http://localhost
```

## 腾讯云部署 - 最简方式

### 准备工作

1. 注册腾讯云账号
2. 开通 **容器镜像服务（个人版，免费）**
3. 在镜像仓库创建命名空间（例如：monster-tech）

### 部署步骤

```bash
# 1. 构建镜像
docker build -t monster-tech-portal:latest .

# 2. 登录腾讯云镜像仓库
docker login --username=你的用户名 ccr.ccs.tencentyun.com
# 密码在腾讯云控制台获取：容器镜像服务 -> 个人版 -> 访问凭证

# 3. 标记镜像
docker tag monster-tech-portal:latest \
  ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest

# 4. 推送镜像
docker push ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest

# 5. 在云服务器上运行
# SSH 登录到你的腾讯云服务器，执行：
docker login --username=你的用户名 ccr.ccs.tencentyun.com
docker pull ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest
docker run -d --name web -p 80:80 --restart unless-stopped \
  ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest

# 6. 开放防火墙端口
# 在腾讯云控制台配置安全组，开放 80 端口
```

### 使用一键部署脚本

```bash
# 运行部署脚本，自动构建镜像并显示部署命令
./deploy.sh
```

## 常见问题

### Q: Docker 镜像构建失败？
A: 确保已安装 Docker，并且 Docker 服务正在运行。

### Q: 推送到腾讯云失败？
A: 检查是否已正确登录，命名空间名称是否正确。

### Q: 云服务器上访问不了？
A: 检查安全组是否开放了 80 端口。

### Q: 需要 HTTPS 怎么办？
A: 在腾讯云申请免费 SSL 证书，配置 Nginx 或使用负载均衡 CLB。

## 文档链接

- 详细部署指南：[DEPLOY.md](./DEPLOY.md)
- 项目说明：[README.md](./README.md)

## 技术支持

- GitHub: https://github.com/haixiangyan
- 官网: https://yanhaixiang.com

---

快速开始遇到问题？查看 [DEPLOY.md](./DEPLOY.md) 获取详细说明。

