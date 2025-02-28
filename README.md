# React + TypeScript + Vite

```bash
bun run dev //локальный сервер
bun orval:gen //нагенерить запросы из swagger.yaml
bun run build //билд
```
чтоб локально запустить надо добавить токен из телеги(через девмод) и убрать init() в main.tsx
без токена не прогрузятся данные из базы, init() работает только в среде telegram если настроить telegramdebugenv