#!/bin/bash

# 海怪科技门户网站部署脚本

echo "🚀 开始构建 Docker 镜像..."

# 构建 Docker 镜像
docker build -t monster-tech-portal:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker 镜像构建成功！"
    echo ""
    echo "📦 镜像信息："
    docker images | grep monster-tech-portal
    echo ""
    echo "🎯 部署选项："
    echo ""
    echo "1. 本地运行："
    echo "   docker run -d -p 80:80 --name monster-tech-portal monster-tech-portal:latest"
    echo ""
    echo "2. 使用 docker-compose："
    echo "   docker-compose up -d"
    echo ""
    echo "3. 推送到腾讯云容器镜像服务："
    echo "   # 登录腾讯云镜像仓库"
    echo "   docker login ccr.ccs.tencentyun.com"
    echo "   # 标记镜像"
    echo "   docker tag monster-tech-portal:latest ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest"
    echo "   # 推送镜像"
    echo "   docker push ccr.ccs.tencentyun.com/你的命名空间/monster-tech-portal:latest"
    echo ""
else
    echo "❌ Docker 镜像构建失败！"
    exit 1
fi

