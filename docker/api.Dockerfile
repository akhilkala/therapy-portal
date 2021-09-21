FROM node:alpine as builder
WORKDIR "/app"
COPY  package*.json ./
RUN npm install -D
COPY . .
RUN npm run build; exit 0

FROM node:alpine
WORKDIR "/app"
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app
RUN npm install --only=prod

CMD ["npm", "run", "prod"]
