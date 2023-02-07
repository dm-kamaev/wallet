Требуется реализовать «банковский» микросервис, состоящий из 2 endpoint:

Получение баланса по счёту:
```sh
HTTP GET /account/{account-id}.
Endpoint должен возвращать баланс в формате application/json.
Пример вызова: curl -H “Accept-encoding: application/json” http://localhost:3000/account/1234
Пример ответа: {“balance”: 123456.01}
```

```sh
HTTP POST /transfer/{source-account-id}/{target-account-id} .
Сумма перевода приходит в теле запроса в application/json.
Пример вызова: curl -H “Content-type: application/json” –data ‘{“amount”: 1234}’ -X POST http://localhost:3000/transfer/1234/5678
```

Данные о счетах должны храниться в таблице ACCOUNTS. Ниже команда для создания таблицы в PostgreSQL:
```sql
CREATE TABLE accounts
(
account_id bigserial PRIMARY KEY,
balance decimal(12, 2) CHECK ( balance > 0 )
);
```
Оба endpoint должны работать в многопользовательском режиме и обрабатывать ошибки, возвращая http code и message. Выбор кодов нужно пояснить в комментариях в программе.
Микросервис должен быть разработан на NodeJS/TypeScript. Используемые фреймворки – на Ваш вкус.
Вместе с разработанным кодом должен поставляться bash скрипт для запуска docker контейнера с БД и микросервиса.