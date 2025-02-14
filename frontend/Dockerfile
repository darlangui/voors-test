# Usar Node.js como base
FROM node:20-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar código restante
COPY . .

# Expor a porta padrão do Vite (normalmente 5173)
EXPOSE 5173

# Comando para iniciar o Vite no modo desenvolvimento
CMD ["npm", "run", "dev"]
