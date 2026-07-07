# SARA-AGENT-AI

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






