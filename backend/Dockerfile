# Usar Node.js como base
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar código restante
COPY . .

# Expor a porta do Sails.js
EXPOSE 1337

# Comando para rodar o servidor
CMD ["npx", "sails", "lift"]
