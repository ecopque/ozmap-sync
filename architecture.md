ozmap-sync/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection configuration
│   │   └── env.ts               # Environment variables loader (dotenv)
│   │
│   ├── database/
│   │   ├── models/
│   │   │   └── syncRecord.ts    # Mongoose schema for sync records
│   │   └── index.ts             # Database connection initializer
│   │
│   ├── integrations/
│   │   ├── ispClient.ts         # Fetch data from the ISP (json-server)
│   │   └── ozmapClient.ts       # Simulated OZmap SDK client
│   │
│   ├── jobs/
│   │   └── scheduler.ts         # Cron job to trigger synchronization
│   │
│   ├── services/
│   │   ├── syncService.ts       # Main sync process orchestration
│   │   └── transformService.ts  # Transforms ISP data to OZmap format
│   │
│   ├── utils/
│   │   ├── logger.ts            # Centralized logging (Winston)
│   │   └── rateLimiter.ts       # Handles request throttling per minute
│   │
│   ├── app.ts                   # Initializes app, scheduler, and configs
│   └── index.ts                 # Main entry point
│
├── logs/
│   ├── combined.log             # All application logs
│   ├── error.log                # Only error logs
│   ├── exceptions.log           # Exceptions captured automatically
│   └── rejections.log           # Promise rejections logs
│
├── docs/
│   └── architecture-diagram.png # Architecture diagram for README
│
├── db.json                      # Mock ISP data (json-server)
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignored files and folders
├── package.json
├── tsconfig.json               # TypeScript configuration
└── README.md

