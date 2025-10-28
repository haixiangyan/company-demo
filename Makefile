.PHONY: help install dev build docker-build docker-run docker-stop clean deploy health

# 默认目标
help:
	@echo "海怪科技门户网站 - 可用命令:"
	@echo ""
	@echo "开发相关:"
	@echo "  make install       - 安装项目依赖"
	@echo "  make dev          - 启动开发服务器"
	@echo "  make build        - 构建生产版本"
	@echo ""
	@echo "Docker 相关:"
	@echo "  make docker-build - 构建 Docker 镜像"
	@echo "  make docker-run   - 运行 Docker 容器"
	@echo "  make docker-stop  - 停止 Docker 容器"
	@echo "  make health       - 运行健康检查"
	@echo ""
	@echo "部署相关:"
	@echo "  make deploy       - 运行部署脚本"
	@echo "  make clean        - 清理构建文件"

# 安装依赖
install:
	npm install

# 启动开发服务器
dev:
	npm start

# 构建生产版本
build:
	npm run build

# 构建 Docker 镜像
docker-build:
	docker build -t monster-tech-portal:latest .

# 运行 Docker 容器
docker-run:
	docker run -d -p 80:80 --name monster-tech-portal --restart unless-stopped monster-tech-portal:latest
	@echo "✅ 容器已启动，访问 http://localhost"

# 停止 Docker 容器
docker-stop:
	docker stop monster-tech-portal || true
	docker rm monster-tech-portal || true
	@echo "✅ 容器已停止"

# 使用 docker-compose 启动
compose-up:
	docker-compose -f docker-compose.prod.yml up -d
	@echo "✅ 服务已启动"

# 使用 docker-compose 停止
compose-down:
	docker-compose -f docker-compose.prod.yml down
	@echo "✅ 服务已停止"

# 健康检查
health:
	./healthcheck.sh

# 部署
deploy:
	./deploy.sh

# 清理构建文件
clean:
	rm -rf build
	rm -rf node_modules
	@echo "✅ 清理完成"

# 查看日志
logs:
	docker logs -f monster-tech-portal

# 重启容器
restart: docker-stop docker-build docker-run
	@echo "✅ 容器已重启"

