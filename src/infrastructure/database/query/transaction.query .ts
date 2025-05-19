export default class TransactionTableQuery {
  static CREATE = `
    CREATE TABLE transactions (
      id VARCHAR(36) PRIMARY KEY,
      account_id_from VARCHAR(36) NOT NULL,
      account_id_to VARCHAR(36) NOT NULL,
      amount DECIMAL(10,2) DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (account_id_from) REFERENCES accounts(id),
      FOREIGN KEY (account_id_to) REFERENCES accounts(id))`;

  static DROP = `
    DROP TABLE IF EXISTS transactions;`;

  static INSERT = ``;
}
