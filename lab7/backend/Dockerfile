FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# !!! ДОБАВЛЕНА СЕКЦИЯ !!!
# Установка зависимостей для сборки нативных модулей (если они есть)
# python3, make, g++ часто нужны для node-gyp
RUN apk add --no-cache python3 make g++

# Установка зависимостей
RUN npm ci --only=production

# (Опционально) Удаление инструментов сборки для уменьшения размера образа
# RUN apk del python3 make g++

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["npm", "start"]