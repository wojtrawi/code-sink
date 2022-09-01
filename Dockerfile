# Install dependencies
FROM cypress/browsers:node14.17.6-slim-chrome100-ff99-edge AS dependencies
LABEL cacheable="true"
WORKDIR /app

COPY ./package*.json ./
RUN npm ci

# Base with source code
FROM dependencies AS base
LABEL cacheable="false"
LABEL app_name=code-sink

COPY . .

# Check code formatting
FROM base as format-check
RUN npm run format:check

# Lint ng code
FROM base as lint-ng
RUN npm run lint:ng

# Lint styles code
FROM base as lint-styles
RUN npm run lint:styles

# Test ng code
FROM base as test-ng
RUN node -v

# Build app
FROM base as build-app
RUN npm run build

# Build server with app
FROM nginx:1.19-alpine as build-server
LABEL app_name=code-sink
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/code-sink .

# CMD ["/bin/sh","-c","envsubst < config_tpl.json > config.json && nginx -g 'daemon off;'"]

# Build image with dependencies (cached until package*.json changes or manually removed)
# docker build -t codesink:dependencies --target=dependencies .

# Build image with given target (e.g. simulate running unit tests for ng code in CI)
# docker build -t codesink --target=test-ng .

# Build image with final target (nginx server with codesink app)
# runs all targets (w/o Buildkit) or just the ones needed (with Buildkit)
# docker build -t codesink .

# Start container with codesink app served by the nginx server
# docker run -d --name=web-server -p 4200:80 codesink

# environment cleanup
# - remove stale dependencies image
# docker image prune -f --filter label=cacheable="true"
# - remove images created for the CI jobs purpose
# docker image prune -af --filter app_name="code-sink"
# - remove build cache created for the CI purpose (with Buildkit)
# docker builder prune -f
