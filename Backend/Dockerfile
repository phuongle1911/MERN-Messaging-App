

# setup base layer for backend

FROM node:22-alpine AS base

# setting work directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# install dependencies stage for backend
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm ci

# development stage for backend
FROM deps AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY . .

USER nodejs

EXPOSE 3000 27017

CMD ["npm","run","dev"]


# testing stage

FROM deps AS test

ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}

COPY . .

USER nodejs

CMD ["npm","run","test"]

# production stage
# build stage for frontend, prepare for production stage
FROM node:22-alpine AS frontend-build

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs
    # chown -R nodejs:nodejs /app

COPY --exclude=**/*.test.* --exclude=**/__tests__/** --exclude=setupTests.js --exclude=eslint.config.js ../Frontend ./


# only install production dependencies from frontend
RUN npm ci --omit=dev

RUN npm run build

RUN chown -R nodejs:nodejs /app

USER nodejs

# production stage
FROM frontend-build AS production

COPY --exclude=**/*.test.* --exclude=**/__tests__/** --exclude=index.html --chown=nodejs:nodejs ./Backend ./
COPY --from=frontend-build --chown=nodejs:nodejs /app/dist /app/src/public


RUN npm ci --omit=dev


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

USER nodejs

EXPOSE 3000 

CMD ["node","./src/index.js"]






