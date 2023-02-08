.PHONY: test

# ===== CHECK API ====
account_id=1234
api.get_balance:
	curl -i -H 'Accept-encoding: application/json' http://localhost:3000/account/$(account_id);

source_account_id=1234
target_account_id=5678
amount=1234
api.transfer:
	curl -i -X POST http://localhost:3000/transfer/$(source_account_id)/$(target_account_id) -H 'Content-type: application/json' -d '{"amount":$(amount)}';
# ===== END CHECK API ====

# ===== Setup project ====
up:
	docker-compose up -d;
	docker-compose logs -f --tail 100 | sed -u 's/^[^|]*[^ ]* //';

down:
	docker-compose down;

test:
	docker-compose run backend npx jest --verbose

test.watch:
	docker-compose run backend npx jest --verbose --watchAll
# ===== END Setup project ====