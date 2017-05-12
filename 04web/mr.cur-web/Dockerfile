# Dockerfile to create a docker image
# Base image
FROM node

#Add files to the image
COPY .  /opt/nodejs
WORKDIR /opt/nodejs

# Install the dependenies modules
RUN  npm install --registry=https://registry.npm.taobao.org

EXPOSE 8090
CMD [ "npm", "run","dev" ]