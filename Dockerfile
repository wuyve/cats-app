FROM nginx:latest

# 设置应用的默认主机
RUN echo "server {
    listen 80;
    server_name example.com;
    root /var/www/html;
}
" > /etc/nginx/sites-available/default

# 创建应用的工作目录
RUN mkdir /app

# 将应用上传到工作目录
COPY react /app

# 将应用部署到工作目录
COPY . /app
WORKDIR /app

# 修改应用的启动端口
RUN ln -s /app/example.com /var/www/html/example.com

# 在容器中启动Nginx
CMD ["nginx", "-g", "daemon off;"]
