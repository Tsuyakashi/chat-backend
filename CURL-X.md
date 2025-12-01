Show all chats:
```bash
curl -X GET \
    -H "Content-Type: application/json" \
    localhost:3000/
```
Show chat by id:
```bash
curl -X GET \
    -H "Content-Type: application/json" \
    localhost:3000/:id
```
Create chat:
```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"userId": "User123"}' localhost:3000/chats
```
Delete chat by id:
```bash
curl -X DELETE \
    -H "Content-Type: application/json" \
    localhost:3000/:id
```