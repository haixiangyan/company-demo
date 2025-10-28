# 故障排查指南

## Docker 构建问题

### 问题 1: npm ci 失败 - package.json 和 package-lock.json 不同步

**错误信息：**
```
npm error `npm ci` can only install packages when your package.json and package-lock.json are in sync
npm error Invalid: lock file's typescript@5.9.3 does not satisfy typescript@4.9.5
```

**原因：**
- `npm ci` 要求 package.json 和 package-lock.json 完全匹配
- 版本不一致会导致构建失败

**解决方案：**

1. **方案一：使用 `npm install`（推荐）**
```dockerfile
RUN npm install --legacy-peer-deps
```

2. **方案二：更新 lock file**
```bash
# 本地执行
npm install --package-lock-only --legacy-peer-deps
git add package-lock.json
git commit -m "chore: update package-lock.json"
git push
```

3. **方案三：删除 lock file，使用 npm install**
```bash
rm package-lock.json
npm install --legacy-peer-deps
```

### 问题 2: 不能使用 `--only=production` 构建 React 应用

**错误信息：**
```
sh: react-scripts: not found
```

**原因：**
- React 项目的构建工具 `react-scripts` 在 devDependencies 中
- 使用 `--only=production` 会跳过 devDependencies
- 导致构建时找不到 react-scripts

**解决方案：**

构建阶段必须安装所有依赖（包括 devDependencies）：
```dockerfile
# ✅ 正确
RUN npm install --legacy-peer-deps

# ❌ 错误
RUN npm ci --only=production --ignore-scripts
```

### 问题 3: peer dependency 冲突

**错误信息：**
```
npm error ERESOLVE unable to resolve dependency tree
```

**解决方案：**

添加 `--legacy-peer-deps` 参数：
```dockerfile
RUN npm install --legacy-peer-deps
```

或者使用 `--force`：
```dockerfile
RUN npm install --force
```

## 优化后的 Dockerfile

```dockerfile
# 多阶段构建 - 第一阶段：构建应用
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖（包括 devDependencies，构建需要）
RUN npm install --legacy-peer-deps

# 复制源代码
COPY . .

# 构建生产版本
RUN npm run build

# 第二阶段：使用 nginx 服务静态文件
FROM nginx:alpine

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物到 nginx 目录
COPY --from=builder /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
```

## 网站访问问题

### 问题 1: 无法访问网站（404）

**可能原因：**
1. 安全组未开放端口
2. 防火墙阻止访问
3. 容器未正常启动

**检查步骤：**

```bash
# 1. 检查容器是否运行
docker ps | grep monster-tech-portal

# 2. 查看容器日志
docker logs monster-tech-portal

# 3. 进入容器检查文件
docker exec -it monster-tech-portal sh
ls -la /usr/share/nginx/html

# 4. 测试本地访问
curl http://localhost:80

# 5. 检查端口占用
netstat -tulnp | grep :80
```

**解决方案：**

1. **开放安全组端口**
   - 登录腾讯云控制台
   - 进入云服务器 -> 安全组
   - 添加入站规则：TCP 80 端口，来源 0.0.0.0/0

2. **检查防火墙**
```bash
# CentOS/RHEL
sudo firewall-cmd --add-port=80/tcp --permanent
sudo firewall-cmd --reload

# Ubuntu/Debian
sudo ufw allow 80/tcp
sudo ufw reload
```

### 问题 2: 页面刷新后 404（React Router 问题）

**原因：**
- Nginx 不知道如何处理客户端路由

**解决方案：**

已在 `nginx.conf` 中配置：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 镜像推送问题

### 问题 1: 登录腾讯云镜像仓库失败

**解决方案：**

1. 获取正确的登录凭证：
   - 腾讯云控制台 -> 容器镜像服务 -> 个人版 -> 访问凭证

2. 使用正确的命令登录：
```bash
docker login --username=你的用户名 ccr.ccs.tencentyun.com
# 输入密码（在控制台获取）
```

### 问题 2: 推送超时

**解决方案：**

1. 检查网络连接
2. 使用国内镜像加速：
```bash
# 配置 Docker 镜像加速
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 性能问题

### 问题 1: 构建太慢

**优化方案：**

1. **使用 .dockerignore**（已配置）
```
node_modules
build
.git
```

2. **多阶段构建**（已实现）
   - 第一阶段构建，第二阶段运行
   - 最终镜像只包含必要文件

3. **利用缓存**
```dockerfile
# 先复制 package*.json，利用 Docker 缓存
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 再复制源代码
COPY . .
```

### 问题 2: 镜像太大

**当前镜像大小：**
- Builder 阶段：~500MB（构建后丢弃）
- 最终镜像：~50MB（仅包含 nginx + 静态文件）

**查看镜像大小：**
```bash
docker images monster-tech-portal
```

## 健康检查

使用提供的健康检查脚本：

```bash
# 运行健康检查
./healthcheck.sh

# 或使用 make 命令
make health
```

## 常用调试命令

```bash
# 查看容器日志
docker logs -f monster-tech-portal

# 查看容器资源使用
docker stats monster-tech-portal

# 进入容器调试
docker exec -it monster-tech-portal sh

# 检查 nginx 配置
docker exec monster-tech-portal nginx -t

# 重启容器
docker restart monster-tech-portal

# 查看容器详细信息
docker inspect monster-tech-portal
```

## 回滚操作

如果部署出现问题，快速回滚：

```bash
# 停止当前容器
docker stop monster-tech-portal
docker rm monster-tech-portal

# 拉取上一个版本
docker pull ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:previous

# 运行旧版本
docker run -d -p 80:80 --name monster-tech-portal --restart unless-stopped \
  ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:previous
```

## 联系支持

如果问题仍未解决：

1. 查看详细日志：`docker logs monster-tech-portal`
2. 检查系统资源：`docker stats`
3. 查看 [DEPLOY.md](./DEPLOY.md) 获取更多部署信息
4. 访问官网：https://yanhaixiang.com

---

© 2025 海怪科技有限公司软件工作室

