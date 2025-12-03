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
<!-- ### Also able run with `docker compose up -d` -->

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
- Sent to chat `/chat/:id/send` (POST)

### For curl examples check `./CURL-X.md`

# mongoose schema:
```
userId: { type: String, required: true },
    systemPrompt: String,
    messages: [
        {
            role: { type: String },
            content: { type: String },
            sentAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
```

### Node v24.11.1 --- Версия Node.js

# Немного конспекта
### System prompt
```
System prompt из себя преставляет запрос для LLM, который задает формулу взаимодействия с пользователем, т.е. создает ограничения или описывает каким именно образом взаимодействовать с пользователем (например, описание настроения, с которым будет отдавать ответы модель).
```
### Prompt chain
```
Prompt chain представляет собой цепочку сообщений с атрибутами кем и в какой последовательности были отправлены сообщения, таким образом, модель может "улавливать" контекст и отдавать более осмысленные ответы. В том числе учитывается system prompt, который имеет роль system. Для разных задач может использоваться разный объем (длинна) цепочки сообщений. Важно находить баланс, чтобы модель как бы не терялась в контексте, но так же нельзя, отправлять слишком длинную цепь запросов. При слишком большом объеме, ответы модель отдает дольше, а стоимость каждого такого запроса дороже.
