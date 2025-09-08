ozmap-sync/
├── src/
│   ├── config/           # Configurações (env, DB, etc)
│   ├── database/         # Conexão e modelos do MongoDB ou MySQL
│   ├── integrations/     # Comunicação com o ISP e OZmap
│   ├── services/         # Regras de negócio (transformação dos dados)
│   ├── utils/            # Logs, tratamento de erros, rate limits
│   ├── jobs/             # Agendador para buscar os dados periodicamente
│   ├── app.ts            # Inicialização do servidor
│   └── index.ts          # Ponto de entrada
├── tests/                # Testes unitários e de integração
├── db.json               # Mock do sistema ISP
├── tsconfig.json
├── package.json
└── README.md
