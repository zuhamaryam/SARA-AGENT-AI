# SARA-AGENT-AI
A# SARA-AI-AGENT
Sara AI is an intelligent scam honeypot designed to engage scammers in realistic conversations, extract threat intelligence, and provide security teams with actionable insights. Instead of immediately blocking suspicious actors, Sara behaves like a genuine user, allowing the system to collect valuable information such as phone numbers, UPI IDs, bank details, phishing links, and scam patterns.

The project combines conversational AI with agent memory and runtime intelligence to improve response quality, reduce hallucinations, and optimize model selection.

---https://polite-crostata-ff96a8.netlify.app/

# Features

* Human-like conversational AI agent
* Persistent memory using Hindsight
* Runtime model routing using cascadeflow
* Voice agent support (Speech-to-Text and Text-to-Speech)
* Scam detection and classification
* Automatic intelligence extraction
* Runtime monitoring and analytics
* REST API
* Secure authentication
* Modular architecture for future integrations

---

# Architecture

```
Incoming Message
        │
        ▼
Scam Detection Engine
        │
        ▼
Hindsight Memory Retrieval
        │
        ▼
Prompt Builder
        │
        ▼
cascadeflow Runtime Router
        │
        ▼
Sara AI
        │
        ▼
Response Validation
        │
        ▼
Threat Intelligence Extraction
        │
        ▼
Memory Storage
        │
        ▼
Dashboard & Webhook
```

---

# Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express
* TypeScript

## Database

* PostgreSQL
* Drizzle ORM

## AI Technologies

* OpenAI
* Hindsight
* cascadeflow

## Voice Integration

* Speech-to-Text
* Text-to-Speech
* Twilio (Ready)
* Exotel (Ready)

---

# Project Structure

```
project/

├── api-server/
├── frontend/
├── packages/
├── shared/
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# System Workflow

1. Receive an incoming message.
2. Detect potential scam patterns.
3. Retrieve relevant memories using Hindsight.
4. Build a contextual prompt.
5. Route the request through cascadeflow.
6. Generate Sara's response.
7. Validate the response.
8. Extract threat intelligence.
9. Store updated conversation memory.
10. Display runtime analytics.

---

# Hindsight Integration

Hindsight enables persistent memory across conversations.

Capabilities include:

* Conversation storage
* Memory retrieval
* Context-aware prompting
* Long-term scam pattern recognition
* Reduced hallucinations

---

# cascadeflow Integration

cascadeflow provides runtime intelligence by routing requests to the most appropriate model.

Routing examples:

```
Greeting
    ↓
Small Model

Scam Analysis
    ↓
Reasoning Model

Information Extraction
    ↓
Structured Output Model
```

Benefits include:

* Reduced latency
* Lower inference cost
* Better runtime visibility
* Efficient model utilization

---

# Threat Intelligence Extraction

Sara automatically extracts:

* Phone Numbers
* UPI IDs
* Bank Names
* Account Numbers
* URLs
* Email Addresses
* Scam Category
* Risk Score

---

# Runtime Monitoring

Each request records:

* Selected Model
* Routing Decision
* Response Time
* Token Usage
* Estimated Cost

---

# Voice Agent

Voice interaction follows the pipeline below:

```
Speech
   ↓
Speech-to-Text
   ↓
Sara AI
   ↓
Text-to-Speech
   ↓
Caller
```

The architecture is designed for future deployment with Twilio and Exotel.

---

# API Endpoints

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| GET    | /health             | Health check                      |
| POST   | /api/detect         | Detect scam and generate response |
| GET    | /api/session/:id    | Retrieve session                  |
| GET    | /api/runtime        | Runtime logs                      |
| POST   | /api/manual-end/:id | End session manually              |

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build the project:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

---

# Environment Variables

```
OPENAI_API_KEY=

DATABASE_URL=

HINDSIGHT_API_KEY=

CASCADEFLOW_API_KEY=

JWT_SECRET=
```

---

# Dashboard

The dashboard provides:

* Live Sessions
* Runtime Logs
* Memory Timeline
* Threat Intelligence
* Voice Status
* AI Performance Metrics

---

# Future Enhancements

* WhatsApp Integration
* SMS Gateway Support
* Multi-language Conversations
* Advanced Threat Analytics
* Real-time Fraud Intelligence Sharing
* Voice Cloning Support
* Multi-Agent Collaboration

---

# Screenshots

Include screenshots of:

* Dashboard
* Sara Conversation Interface
* Runtime Logs
* Memory Timeline
* Threat Intelligence Panel
* Voice Agent
* System Architecture

---

# License

This project is licensed under the MIT License.

---

# Acknowledgements

This project is built using:

* Hindsight
* cascadeflow
* OpenAI
* React
* Express
* PostgreSQL
* Drizzle ORM

