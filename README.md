# Chat Backend
### Backend web server based on NodeJS to interact with ChatGPT
## How to run:
### 1. Clone the repo:
```bash
git clone git@github.com:Tsuyakashi/chat-backend.git
```
### 2. Install requirements
```bash
npm install
```
### 3. Configure .env
### 4. Run MongoDB (for example with docker)
```bash
docker run -d --name my-mongo-database -p 27017:27017 mongo
```
### 5. Start with NodeJS
```bash
node index.js
```

# Used:
- NodeJS + npm:
    - express
    - dotenv
    - mongoose
- Docker:
    - MongoDB

# Endpoints:
- All chats `/` (GET)
- Create chat `/chats` (POST)
- Show chat history `/:id` (GET)
- Delete chat `/:id` (DELETE)
### Soon:
- Sent to chat `/chat/send` (POST)

# mongoose schema:
```
userId: { type: String, required: true },
systemPrompt: String,
chatHistory: [{
    role: { type: String },
    message: { type: String },
    sentAt: { type: Date, default: Date.now }
}],
createdAt: { type: Date, default: Date.now }
```

### Node v24.11.1
