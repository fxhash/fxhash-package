FROM node:16-alpine AS builder
LABEL appName="web"

# Create app directory
WORKDIR /root/app

# Install system dependencies
RUN apk add --no-cache \
  git

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

ARG NEXT_TELEMETRY_DISABLED

RUN yarn build


FROM node:16-alpine as production

WORKDIR /usr/app/frontend

COPY --from=builder /root/app/.next ./.next
COPY --from=builder /root/app/node_modules ./node_modules
COPY --from=builder /root/app/public ./public
COPY --from=builder /root/app/package.json ./package.json

RUN ls -la

CMD ["yarn", "start"]
