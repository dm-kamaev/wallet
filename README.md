## Description
Http коды ошибок:
* 400 - неверные данные: cумма не указана или <= 0 и т.д.
* 404 - сущность (аккаунт) не найдена
* 422 - операция нельзя совершить: нехватает средств, превышение лимита

## Comments
* Я бы хранил деньги в копейках, используя bigint, чтобы дополнительное не обрабатывать проблемы с потерей точности при арифмитических операциях.
* Не понятно почему по условиям задания баланс не может быть равен 0 🤔


## Installation
```sh
npm install
```

## Running the app

```bash
# up containers
make up

# down containers
make down

# run test
make test
```

## API
```sh
# get balance
make api.get_balance account_id=1234
# make transfer
make api.transfer source_account_id=1234 target_account_id=5678 amount=10
```
