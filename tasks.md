# Tasks
* ~~Problem statement is definitioned~~
* ~~Setup project with NestJS: create two module with routing~~
* ~~Create Dockerfile~~
* ~~Create docker-compose.yaml~~
* Setup postgres:
  * ~~bind with backend~~
  * ~~create tables accounts~~
  * upload seeds
* Setup kysely: create schema, add dao for accounts, https://github.com/kazu728/nestjs-kysely
* Create example of amount transfer
* Create example of concurrent amount transfer
* Resolve problem of sum float digit: 0.01 + 0.06 // 0.06999999999999999
* Create Application Errors
  * Invalid data
  * Not enough fund
  * Not found account
* Setup zodjs and bind with dto
* Create test
  * amount transfer
  * concurrent amount transfer
  * invalid amount
  * not enough fund
  * not exist account source/target


```sh
make api.get_balance account_id=1234
make api.get_balance account_id=5678
```