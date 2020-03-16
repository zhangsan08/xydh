npm run build
cp -r ../dist ./
docker build -t registry.cn-beijing.aliyuncs.com/xydh/xydh:v0.2.1 ./
docker push registry.cn-beijing.aliyuncs.com/xydh/xydh:v0.2.1