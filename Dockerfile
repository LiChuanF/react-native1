FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expo Web 构建（适用于 SDK 49/50/51）
RUN npx expo export --platform web

RUN npm install -g serve

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
