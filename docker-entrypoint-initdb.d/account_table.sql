CREATE TABLE accounts
(
  account_id bigserial PRIMARY KEY,
  balance decimal(12, 2) CHECK ( balance > 0 )
);

INSERT INTO accounts VALUES (1234, 10642.87);
INSERT INTO accounts VALUES (5678, 391654.11);


-- INSERT INTO accounts VALUES (1234, 4.6);
-- INSERT INTO accounts VALUES (5678, 2.4);
-- transfer 2.3

-- INSERT INTO accounts VALUES (1234, 9999999999.99);
-- INSERT INTO accounts VALUES (5678, 2);
-- transfer 0.01
-- transfer 1


-- INSERT INTO accounts VALUES (1234, 100.02);
-- INSERT INTO accounts VALUES (5678, 500.99);
-- INSERT INTO accounts VALUES (2543534534, 1);