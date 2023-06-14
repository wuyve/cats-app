# 基于Node.js镜像构建
FROM node:latest as build

# 设置工作目录
WORKDIR /app

# 复制代码到容器中
COPY . .

# 安装依赖和构建项目
RUN npm install && npm run build

# 基于Nginx镜像构建
FROM nginx:alpine

# 将构建好的代码复制到Nginx的默认站点目录中
COPY --from=build /app/build /usr/share/nginx/html

# 将Nginx配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
