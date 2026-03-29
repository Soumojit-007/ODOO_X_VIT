# ---- Base Image ----
FROM node:20-alpine

# ---- Set Working Directory ----
WORKDIR /app

# ---- Install system dependencies (Prisma + OpenSSL) ----
RUN apk add --no-cache openssl

# ---- Copy package files ----
COPY package*.json ./

# ---- Install dependencies ----
RUN npm install --omit=dev

# ---- Copy source code ----
COPY . .

# ---- Generate Prisma Client ----
RUN npx prisma generate

# ---- Expose Port ----
EXPOSE 5000

# ---- Start server ----
CMD ["node", "src/server.js"]