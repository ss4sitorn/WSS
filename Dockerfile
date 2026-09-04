# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Stage 2: Build Next.js static export
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Unprivileged Production web server (Non-root Nginx Alpine - Patched Base Image)
FROM nginxinc/nginx-unprivileged:alpine AS runner
WORKDIR /usr/share/nginx/html

# Default port for Google Cloud Run (can be overridden by GCP runtime PORT env)
ENV PORT=8080

# Copy built static output from builder (chown to non-root nginx user 101)
COPY --from=builder --chown=101:101 /app/out ./

# Copy custom Nginx config template (Nginx auto-substitutes $PORT on container startup)
COPY --chown=101:101 nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 8080

USER 101

CMD ["nginx", "-g", "daemon off;"]
