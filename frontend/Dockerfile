FROM node:lts-bullseye-slim

WORKDIR /app

COPY package.json yarn.lock ./

# RUN yarn config set unsafe-perm true

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 4173

CMD ["yarn","start"]
