# Chat Backend
### Backend web server based on NodeJS (TypeScript) to interact with AI models via OpenRouter
## How to run:
### 1. Clone the repo:
```bash
git clone https://github.com/Tsuyakashi/chat-backend.git
```
### 2. Install requirements
```bash
npm install
```
### 3. Configure .env (or copy from .env.example and paste OpenRouter API key)
```bash
cp .env.example .env
```
### 4. Run MongoDB (for example with docker)
```bash
docker run -d --name mongo-database -p 27017:27017 mongo
```
### 5. Run PostgreSQL (for example with dokcer)
```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
### 5.1 Create DB 
```bash
docker exec -it postgres psql -U postgres -c "CREATE DATABASE events;"
```
### 6. Build TypeScript
```bash
npm run build
```
### 7. Start with NodeJS
```bash
npm start
```
### 7.1. Or run in development mode (with auto-reload)
```bash
npm run dev
```
<!-- ### Also able run with `docker compose up -d` -->
# .env
```env
OPENROUTER_API_KEY="sk-XXX"
MONGO_URI=mongodb://localhost:27017/chat
```
# Centralized config in `src/config/index.ts`
```json
server: {
        port: 3000,
        host: '0.0.0.0',
    },
    chat: {
        model: 'openai/gpt-3.5-turbo',
        maxMessagesLimit: 25,
        maxMessagesLength: 5000
    },
    database: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/chat-backend',
    }
```
# Used:
- NodeJS `24.12.0` + npm `11.6.2`:
    - fastify
    - mongoose
    - dotenv
    - openai (with OpenRouter API client)
    - typescript (dev)
    - @types/node, @types/mongoose (dev)
    - ts-node, nodemon (dev)
- Docker:
    - MongoDB

# Endpoints:
- All chats `/chats/?userId=xxx` (GET) - требует обязательный query параметр userId
- Show chat history `/chats/:id?userId=xxx` (GET) - требует обязательный query параметр userId
---
- Create chat `/chats` (POST)
- Send to chat `/chats/send/:id` (POST)
---
- Delete chat `/chats/:id?userId=xxx` (DELETE) - требует обязательный query параметр userId

### For curl examples check `./CURL.md`

# Немного конспекта

### System prompt

System prompt из себя преставляет запрос для LLM, который задает формулу взаимодействия с пользователем, т.е. создает ограничения или описывает каким именно образом взаимодействовать с пользователем (например, описание настроения, с которым будет отдавать ответы модель).

### Prompt chain

Prompt chain представляет собой цепочку сообщений с атрибутами кем и в какой последовательности были отправлены сообщения, таким образом, модель может "улавливать" контекст и отдавать более осмысленные ответы. В том числе учитывается system prompt, который имеет роль system. Для разных задач может использоваться разный объем (длинна) цепочки сообщений. Важно находить баланс, чтобы модель как бы не терялась в контексте, но так же нельзя, отправлять слишком длинную цепь запросов. При слишком большом объеме, ответы модель отдает дольше, а стоимость каждого такого запроса дороже.
