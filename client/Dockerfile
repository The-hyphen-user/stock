# # Stage 1
# FROM node:14 as build-stage

# WORKDIR /client
# COPY package.json .
# RUN yarn
# COPY . .

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# RUN yarn build

# # Stage 2
# FROM nginx:1.17.0-alpine

# COPY --from=build-stage /client/build /usr/share/nginx/html
# EXPOSE $REACT_DOCKER_PORT

# CMD nginx -g 'daemon off;'



FROM node:16-alpine
WORKDIR '/app'
COPY ./package.json ./
RUN yarn
COPY . .
CMD ["yarn", "start"]
