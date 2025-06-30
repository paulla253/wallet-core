export default class AccountTable {
  static CREATE = `
    CREATE TABLE accounts (
      id VARCHAR(36) PRIMARY KEY,
      client_id VARCHAR(36) NOT NULL,
      balance DECIMAL(10,2) DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id))`;

  static DROP = `
    DROP TABLE IF EXISTS accounts;`;

  static INSERT = `INSERT INTO wallet.accounts (id, client_id, balance, created_at, updated_at) VALUES
  ('7d356b49-649c-42f8-a5fc-0967e3073b03', '7d356b49-649c-42f8-a5fc-0967e3073b03', 100, '2025-06-22 10:58:33', '2025-06-22 10:58:33'),
  ('bff5090d-c260-4f8a-8a86-e24bceda78ac', 'bff5090d-c260-4f8a-8a86-e24bceda78ac', 0.00, '2025-06-22 10:58:33', '2025-06-22 10:58:33');`;
}
