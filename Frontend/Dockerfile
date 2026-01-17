
FROM node:22-alpine AS base

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# install all dependencies
FROM base AS deps

COPY package.json package-lock.json ./

USER nodejs

RUN npm ci


# development stage

FROM deps AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY . .

USER nodejs

EXPOSE 5173

CMD ["npm", "run", "dev"]

# testing stage
FROM deps AS test

ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}

COPY . .

USER nodejs

CMD ["npm","run","test"]


