# CURL Examples for Chat Backend API

Все примеры используют базовый URL: `http://localhost:3000`

---

## 1. Получить все чаты

**GET** `/chats`

```bash
curl -X GET http://localhost:3000/chats
```

**Ответ:**
```json
[
  {
    "id": "69518ed07df147966a6fb4de",
    "userId": "testUser",
    "messages": [
      {
        "role": "system",
        "content": "Answer like a pirate",
        "sentAt": "2025-12-28T20:10:56.954Z"
      },
      {
        "role": "user",
        "content": "Привет",
        "sentAt": "2025-12-28T20:11:49.265Z"
      },
      {
        "role": "assistant",
        "content": "Аррр, привет, дружище!",
        "sentAt": "2025-12-28T20:11:50.428Z"
      }
    ]
  }
]
```

---

## 2. Получить чат по ID

**GET** `/chats/:id?userId=xxx`

**Параметры:**
- `:id` - ID чата (в URL)
- `userId` - ID пользователя (query параметр, обязательный)

```bash
curl -X GET "http://localhost:3000/chats/69518ed07df147966a6fb4de?userId=testUser"
```

**Ответ (успех):**
```json
{
  "id": "69518ed07df147966a6fb4de",
  "userId": "testUser",
  "messages": [...]
}
```

**Ошибки:**
- `400` - отсутствует userId: `{"message": "UserId query parameter is required"}`
- `403` - нет доступа: `{"message": "Unauthorized: You do not have access to this chat"}`
- `404` - чат не найден: `{"message": "Chat not found"}`

---

## 3. Создать новый чат

**POST** `/chats/`

**Тело запроса:**
```json
{
  "userId": "testUser",
  "systemPrompt": "Answer like a pirate"
}
```

- `userId` - обязательный параметр (ID владельца чата)
- `systemPrompt` - необязательный параметр (системный промпт для LLM)

**Пример без systemPrompt:**
```bash
curl -X POST http://localhost:3000/chats/ \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "testUser"
  }'
```

**Пример с systemPrompt:**
```bash
curl -X POST http://localhost:3000/chats/ \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "testUser",
    "systemPrompt": "Answer like a pirate"
  }'
```

**Ответ (201):**
```json
{
  "id": "69518ed07df147966a6fb4de",
  "userId": "testUser",
  "messages": [
    {
      "role": "system",
      "content": "Answer like a pirate",
      "sentAt": "2025-12-28T20:10:56.954Z"
    }
  ]
}
```

---

## 4. Отправить сообщение в чат

**POST** `/chats/send/:id`

**Параметры:**
- `:id` - ID чата (в URL)

**Тело запроса:**
```json
{
  "userId": "testUser",
  "message": "Привет, как дела?"
}
```

- `userId` - обязательный параметр (ID пользователя, должен совпадать с владельцем чата)
- `message` - обязательный параметр (текст сообщения)

```bash
curl -X POST http://localhost:3000/chats/send/69518ed07df147966a6fb4de \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "testUser",
    "message": "Привет, как дела?"
  }'
```

**Ответ (200):**
```json
{
  "role": "assistant",
  "content": "Аррр, все отлично, дружище!",
  "sentAt": "2025-12-28T20:11:50.428Z"
}
```

**Ошибки:**
- `400` - отсутствует или пустое сообщение: `{"message": "Message is required"}` или `{"message": "Invalid message"}`
- `403` - нет доступа: `{"message": "Unauthorized: You do not have access to this chat"}`
- `404` - чат не найден: `{"message": "Chat not found"}`

---

## 5. Удалить чат

**DELETE** `/chats/:id`

**Параметры:**
- `:id` - ID чата (в URL)

```bash
curl -X DELETE http://localhost:3000/chats/69518ed07df147966a6fb4de
```

**Ответ (200):**
```json
{
  "message": "Chat deleted successfully"
}
```

**Ошибки:**
- `404` - чат не найден: `{"message": "Chat not found"}`

---

## Структура данных

### Chat
```typescript
{
  id: string;
  userId: string;  // ID владельца чата
  messages: Message[];
}
```

### Message
```typescript
{
  role: 'system' | 'assistant' | 'user';
  content: string;
  sentAt: Date;
}
```

---

## Примечания

- Все даты в формате ISO 8601
- По умолчанию сервер работает на порту `3000`
- Максимальное количество сообщений в истории чата: 25 (настраивается в `config.chat.maxMessagesLimit`)
- Системное сообщение всегда сохраняется при ограничении истории
- Для доступа к чату `userId` должен совпадать с `userId` владельца чата

