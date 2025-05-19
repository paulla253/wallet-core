export default class AccountTableQuery {
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

  static INSERT = ``;
}
