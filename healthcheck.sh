#!/bin/bash

# 健康检查脚本

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查容器状态
echo -e "${YELLOW}🔍 检查容器状态...${NC}"
if docker ps | grep -q monster-tech-portal; then
    echo -e "${GREEN}✅ 容器正在运行${NC}"
else
    echo -e "${RED}❌ 容器未运行${NC}"
    exit 1
fi

# 检查网站响应
echo -e "${YELLOW}🔍 检查网站响应...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ 网站响应正常 (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ 网站响应异常 (HTTP $HTTP_CODE)${NC}"
    exit 1
fi

# 检查容器资源使用
echo -e "${YELLOW}🔍 检查容器资源使用...${NC}"
docker stats --no-stream monster-tech-portal

# 检查容器日志（最后10行）
echo -e "${YELLOW}📋 最近的容器日志:${NC}"
docker logs --tail 10 monster-tech-portal

echo -e "${GREEN}✅ 所有检查通过！${NC}"

