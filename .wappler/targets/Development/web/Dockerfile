FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

ENV PATH /opt/node_app/node_modules/.bin:$PATH
ENV NODE_ENV development
WORKDIR /opt/node_app
COPY index.js .
COPY package.json .
RUN npm install --no-optional --no-package-lock
CMD [ "nodemon", "--polling-interval", "5000", "--legacy-watch", "./index.js" ]
