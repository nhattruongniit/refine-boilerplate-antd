# base os node version 16
FROM node:16-alpine as build

# To minimize image size, it's uncommon for additional related tools (such as git or bash) 
# to be included in Alpine-based images. (https://hub.docker.com/_/node/)
RUN apk --no-cache add git

# RUN yarn global add typescript

# create app directory
RUN mkdir -p /refine-boilerplate-antd
WORKDIR /refine-boilerplate-antd

# install dependencies
COPY package.json ./package.json

# RUN yarn
RUN yarn install
COPY . .

# Build
RUN rm -rf build
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /refine-boilerplate-antd/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
