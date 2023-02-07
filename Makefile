# ===== CHECK API ====
account_id=1234
api.get_balance:
	curl -H 'Accept-encoding: application/json' http://localhost:3000/account/$(account_id);

source_account_id=1234
target_account_id=5678
amount=1234
api.transfer:
	curl -X POST http://localhost:3000/transfer/$(source_account_id)/$(target_account_id) -H 'Content-type: application/json' -d '{"amount":$(amount)}';
# ===== END CHECK API ====

# ===== UP/DOWN project ====
up:
	docker-compose -f docker-compose.yaml up -d
	docker-compose -f docker-compose.yaml logs -f --tail 100 | sed -u 's/^[^|]*[^ ]* //';

down:
	docker-compose -f docker-compose.yaml down;
# ===== END UP/DOWN project ====