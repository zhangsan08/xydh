npm run build
rm -rf dist
cp -r ../dist ./
docker build -t registry.cn-beijing.aliyuncs.com/xydh/xydh:v0.8.82 ./
docker push registry.cn-beijing.aliyuncs.com/xydh/xydh:v0.8.82