export default class ClientTableQuery {
  static CREATE = `
    CREATE TABLE clients(
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`;

  static DROP = `
    DROP TABLE IF EXISTS clients;`;

  static INSERT = ``;
}
