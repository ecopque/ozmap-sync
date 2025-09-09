//FILE: /step-by-step.md

# STEP BY STEP:

# 1: Criar o projeto
. mkdir ozmap-sync
. cd ozmap-sync
. npm init -y
. npm install typescript ts-node nodemon @types/node --save-dev
. npx tsc --init

# 2: Instalar dependências
. npm install axios dotenv winston node-cron mongoose
. npm install mongoose              # Se escolher MongoDB
  ou
. npm install mysql2 sequelize      # Se escolher MySQL

# 3: Crie um arquivo db.json e cole o conteúdo (ver em anexo)
. vim db.json (colar conteúdo dentro)

# 4: Rodar o mock do ISP / Testar
. npx json-server --watch db.json --port 4000
. curl http://localhost:4000/cables

# 5: Confeccionar package.json

# 6: Confeccionar tsconfig.json

# 7: Confeccionar .env

# 8: Confeccionar db.json (mock do ISP)

# 9: Confeccionar src/index.ts

# 10: Confeccionar src/app.ts

# 11: Confeccionar src/config/index.ts

# 12: Confeccionar src/database/mongodb.ts

# 13: Confeccionar src/integrations/ispClient.ts

# 14: Confeccionar src/integrations/ozmapClient.ts

# 15: Confeccionar src/services/transformService.ts

# 16: Confeccionar src/utils/rateLimiter.ts

# 17: Confeccionar src/utils/logger.ts

# 18: Confeccionar arquivo .env (diretório raiz)

# 19: Criar diretório /logs

# 20: Confeccionar /src/testLogger.ts

# 21: Testar logger:
. npx ts-node src/testLogger.ts

# 22: Preparar a integração com o MongoDB
. sudo systemctl status mongod
. sudo systemctl start mongod (se estiver Inativo, rode o start)

# 23: Testar conexão MongoDB
. mongosh

# 24: Criar o banco de dados
. use ozmap_sync;
  . db.createCollection("sync_records");

# 25: Rodar o serviço de sincronização
. npm run dev

# 26: Criar a pasta e arquivo: src/jobs/scheduler
. mkdir -p src/jobs

# 27: Criar arquivo scheduler e confeccionar:
. vim src/jobs/scheduler.ts

# SE APRESENTADO ALGUM ERRO, MELHOR LIMPAR O CHACHE DO TS-NODE-DEV
. rm -rf dist
. rm -rf node_modules/.cache

# 28: Criar e confeccionar src/services/syncService.ts
. vim src/services/syncService.ts

# 28: Rode o serviço de sincronização novamente
. npm run dev
