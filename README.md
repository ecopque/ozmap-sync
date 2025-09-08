# OZmap Sync

![Architecture Diagram](./docs/architecture-diagram.png) <!-- Reserved space -->

## Overview

**OZmap Sync** is a service built with **Node.js + TypeScript** for **data synchronization** between an ISP system (mocked using `json-server`) and an external management system, simulating **OZmap**.

The system:
- Periodically fetches data from the ISP system.
- Transforms the data into the required format.
- Sends processed data to the target system.
- Manages failures and respects request rate limits.
- Logs all operations and events.
- Stores synchronized records in **MongoDB**.

---

## Technologies Used

- **Node.js** + **TypeScript** → Core of the application  
- **json-server** → Mock ISP system  
- **Mongoose** → MongoDB integration  
- **Axios** → HTTP requests  
- **Winston** → Advanced logging  
- **Node-cron** → Scheduling synchronization jobs  
- **dotenv** → Environment configuration

---

## Project Structure
```bash
ozmap-sync/
├── src/
│ ├── config/ # Environment and general settings
│ ├── database/ # MongoDB connection and models
│ ├── integrations/ # Integration with ISP and OZmap (mock)
│ ├── jobs/ # Scheduler for automatic synchronization
│ ├── services/ # Data transformation and sync logic
│ ├── utils/ # Helpers (logger, rate-limiter, etc.)
│ ├── app.ts # App initialization
│ └── index.ts # Main entry point
├── db.json # Mock ISP data
├── .env.example # Example environment configuration
├── package.json
└── README.md
```

---

## Project Setup

### **1. Clone the repository**
```bash
$ git clone https://github.com/your-username/ozmap-sync.git
$ cd ozmap-sync
```

### **2. Install dependencies**
```bash
$ npm install
```

### **3. Configure environment variables**
```bash
Create a .env file in the project root based on .env.example:
ISP_BASE_URL=http://localhost:4000
RATE_LIMIT_PER_MIN=50
SYNC_CRON=*/1 * * * *
MONGODB_URI=mongodb://localhost:27017/ozmap_sync
LOG_LEVEL=debug
```

### **4. ISP Mock Server**
```bash
This project uses json-server to simulate the ISP data source.
$ npx json-server --watch db.json --port 4000
```

### **5. Running the Application**
```bash
Development mode
$ npm run dev

. The app will:
. Connect to MongoDB.
. Fetch data from json-server.
. Transform and send data to the target system (mocked OZmap).
. Store processed records in MongoDB.
. Generate detailed logs in the console and the logs/ folder.
```

### **6. Logs & Data Storage**
```bash
Logs are stored in:

logs/
├── combined.log
├── error.log
├── exceptions.log
└── rejections.log
```

### **7. To check synchronized records in MongoDB**
```bash
$ mongosh
$ use ozmap_sync
$ db.syncrecords.find().pretty()
```

### **8. Architecture**
```bash
The architecture is designed to be modular and scalable, with clear separation of concerns:

+--------------------+
| json-server (ISP)  |
+--------------------+
          ↓
    fetchISPData()
          ↓
+--------------------+
| Transform Service  |
+--------------------+
          ↓
+--------------------+
| OZmap Client (SDK) |
+--------------------+
          ↓
+--------------------+
| MongoDB Storage    |
+--------------------+
```
