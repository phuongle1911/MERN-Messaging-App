
FROM node:22-alpine AS base

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app
    # chown -R nodejs:nodejs /usr/local

# install all dependencies
FROM base AS deps

COPY package.json ./

USER nodejs

RUN npm install 

# build stage

# FROM deps AS build

# COPY . .

# USER nodejs

# RUN npm run build

# development stage

FROM deps AS development

ENV NODE_ENV=development

COPY . .

USER nodejs

EXPOSE 5173

CMD ["npm", "run", "dev"]

# testing stage
FROM deps AS test

ENV NODE_ENV=test

COPY . .

USER nodejs

CMD ["npm","run","test"]

# Production stage
# install essential dependencies and build to prepare for production

# FROM node:22-alpine AS build-prod

# WORKDIR /app

# COPY --exclude=**/*.test.* --exclude=**/__tests__/** --exclude=setupTests.js --exclude=eslint.config.js . .

# RUN npm install --omit=dev

# RUN npm run build

# # production with nginx
# FROM nginxinc/nginx-unprivileged AS production

# ENV NODE_ENV=production

# # Copy custom Nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

# # Copy the static build output from the build stage to Nginx's default HTML serving directory
# COPY --chown=nginx:nginx  --from=build-prod /app/dist /usr/share/nginx/html


# USER nginx

# EXPOSE 8080

# ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
# CMD ["-g", "daemon off;"]

# FROM node:22-alpine AS production

# WORKDIR /app

# RUN addgroup -g 1001 -S nodejs && \
#     adduser -S nodejs -u 1001 -G nodejs && \
#     chown -R nodejs:nodejs /app

# ENV NODE_ENV=production

# # copy all project file except test files and eslint config file
# COPY --exclude=**/*.test.* --exclude=**/__tests__/** --exclude=setupTests.js --exclude=eslint.config.js . .
# COPY --from=build --chown=nodejs:nodejs /app/dist ./dist

# USER nodejs
# # only install production dependencies
# RUN npm install --omit=dev

# RUN npm i -g serve

# EXPOSE 5173

# CMD ["serve", "-s", "dist"]
