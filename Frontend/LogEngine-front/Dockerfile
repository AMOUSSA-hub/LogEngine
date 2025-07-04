FROM node:21-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.29.0-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
#COPY app.conf /etc/nginx/conf.d/app.conf // COnfiguration de reverse proxy pour essayer de contourner le problème de CORS
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]