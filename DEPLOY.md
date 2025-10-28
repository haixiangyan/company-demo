# 腾讯云部署指南

本文档详细说明如何将海怪科技门户网站部署到腾讯云。

## 前置要求

- 已安装 Docker
- 拥有腾讯云账号
- 已开通腾讯云容器镜像服务（TCR）或容器服务（TKE）

## 部署方式

### 方式一：腾讯云容器镜像服务 + 云服务器

#### 1. 本地构建镜像

```bash
# 构建 Docker 镜像
docker build -t monster-tech-portal:latest .
```

#### 2. 登录腾讯云容器镜像服务

```bash
# 登录个人版镜像仓库（推荐）
docker login --username=你的用户名 ccr.ccs.tencentyun.com

# 或登录企业版镜像仓库
docker login --username=你的用户名 你的实例域名
```

> 登录密码在腾讯云控制台获取：容器镜像服务 -> 个人版 -> 访问凭证

#### 3. 标记并推送镜像

```bash
# 标记镜像（个人版）
docker tag monster-tech-portal:latest ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:latest

# 推送镜像
docker push ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:latest
```

#### 4. 在云服务器上拉取并运行

登录到您的腾讯云服务器（CVM），执行：

```bash
# 登录镜像仓库
docker login --username=你的用户名 ccr.ccs.tencentyun.com

# 拉取镜像
docker pull ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:latest

# 停止旧容器（如果存在）
docker stop monster-tech-portal 2>/dev/null
docker rm monster-tech-portal 2>/dev/null

# 运行新容器
docker run -d \
  --name monster-tech-portal \
  --restart unless-stopped \
  -p 80:80 \
  ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:latest
```

#### 5. 配置域名和 SSL（可选）

如果需要使用 HTTPS，可以：

1. 在腾讯云申请免费 SSL 证书
2. 配置 Nginx 反向代理
3. 或使用腾讯云 CLB（负载均衡）配置 SSL

### 方式二：腾讯云容器服务（TKE）

#### 1. 推送镜像到容器镜像服务

按照方式一的步骤 1-3 完成镜像推送。

#### 2. 创建 TKE 集群

1. 登录腾讯云控制台
2. 进入 **容器服务 TKE**
3. 点击 **新建集群**
4. 选择地域和配置（可选择标准集群或 Serverless 集群）
5. 完成集群创建

#### 3. 创建工作负载

1. 在 TKE 控制台，选择 **工作负载** -> **Deployment**
2. 点击 **新建**
3. 配置如下：
   - **名称**：monster-tech-portal
   - **命名空间**：default
   - **镜像**：选择刚才推送的镜像
   - **镜像版本**：latest
   - **实例数量**：1-3（根据需求）
   - **端口映射**：容器端口 80，服务端口 80

#### 4. 创建 Service

1. 在工作负载详情页，点击 **新建 Service**
2. 配置：
   - **类型**：LoadBalancer（公网访问）
   - **端口映射**：80:80

#### 5. 访问应用

创建完成后，TKE 会自动分配一个公网 IP，通过该 IP 即可访问网站。

### 方式三：腾讯云 Serverless 容器服务

#### 1. 开通 Serverless 容器服务

登录腾讯云控制台，开通 **Serverless 容器服务**。

#### 2. 创建服务

```bash
# 使用腾讯云 CLI
tccli tke CreateService \
  --region ap-guangzhou \
  --ClusterType serverless \
  --ServiceSpec '{
    "ServiceName": "monster-tech-portal",
    "Containers": [{
      "ImageName": "ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:latest",
      "ContainerPort": 80
    }]
  }'
```

或者在控制台界面操作：

1. 进入 **Serverless 容器服务**
2. 点击 **新建服务**
3. 选择镜像并配置端口
4. 完成创建

## 使用 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Tencent Cloud

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Login to Tencent Container Registry
      run: |
        docker login --username=${{ secrets.TENCENT_USERNAME }} \
          --password=${{ secrets.TENCENT_PASSWORD }} \
          ccr.ccs.tencentyun.com
    
    - name: Build and Push
      run: |
        docker build -t ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:latest .
        docker push ccr.ccs.tencentyun.com/命名空间/monster-tech-portal:latest
```

在 GitHub 仓库设置中添加 Secrets：
- `TENCENT_USERNAME`：腾讯云镜像仓库用户名
- `TENCENT_PASSWORD`：腾讯云镜像仓库密码

## 性能优化建议

1. **使用 CDN**
   - 将静态资源托管到腾讯云 CDN
   - 加速全国各地访问速度

2. **配置缓存**
   - 在 nginx.conf 中已配置静态资源缓存
   - 可考虑使用 Redis 缓存动态内容

3. **启用 HTTPS**
   - 在腾讯云申请免费 SSL 证书
   - 配置 CLB 或 Nginx SSL

4. **监控告警**
   - 使用腾讯云监控服务
   - 配置异常告警通知

## 费用估算

- **云服务器（CVM）**：约 50-200 元/月（1-2核 2-4G）
- **容器镜像服务（TCR）**：个人版免费，企业版按存储计费
- **TKE 集群**：节点费用 + 管理费用
- **Serverless 容器**：按使用量计费，低流量约 10-50 元/月

## 故障排查

### 容器无法启动

```bash
# 查看容器日志
docker logs monster-tech-portal

# 检查容器状态
docker ps -a

# 进入容器调试
docker exec -it monster-tech-portal sh
```

### 网站无法访问

1. 检查安全组是否开放 80/443 端口
2. 检查防火墙设置
3. 验证镜像是否正确拉取
4. 查看 nginx 日志

### 镜像推送失败

1. 确认已正确登录
2. 检查命名空间是否存在
3. 确认网络连接正常

## 技术支持

如有问题，请访问：
- 腾讯云容器服务文档：https://cloud.tencent.com/document/product/457
- 海怪科技官网：https://yanhaixiang.com

---

© 2025 海怪科技有限公司软件工作室

