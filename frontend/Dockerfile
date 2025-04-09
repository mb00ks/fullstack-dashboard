FROM node:18

WORKDIR /app

# Salin file yang diperlukan untuk install
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Salin semua file project ke container
COPY . .

# Build project Next.js
RUN npm run build

# Jalankan Next.js (production)
EXPOSE 3000
CMD ["npm", "start"]
