

# setup base layer for backend
# setting work directory
FROM node:22-alpine AS base

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# install dependencies stage for backend
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm install

# development stage for backend
FROM deps AS development

ENV NODE_ENV=development

COPY . .

USER nodejs

EXPOSE 3000

CMD ["npm","run","dev"]

# testing stage

FROM deps AS test

ENV NODE_ENV=test 

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
RUN npm install --omit=dev

RUN npm run build

RUN chown -R nodejs:nodejs /app

USER nodejs

# production stage
FROM frontend-build AS production

# WORKDIR /app

COPY --exclude=**/*.test.* --exclude=**/__tests__/** --exclude=index.html --chown=nodejs:nodejs ./Backend ./
COPY --from=frontend-build --chown=nodejs:nodejs /app/dist /app/src/public


RUN npm install --omit=dev

ENV NODE_ENV=production

USER nodejs

EXPOSE 3000 

CMD ["node","./src/index.js"]




