npm run build
cp -r ../dist ./
docker build -t registry.cn-beijing.aliyuncs.com/xydh/xydh:v0.3.0 ./
docker push registry.cn-beijing.aliyuncs.com/xydh/xydh:v0.3.0