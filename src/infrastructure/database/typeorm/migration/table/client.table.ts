export default class ClientTable {
  static CREATE = `
    CREATE TABLE clients(
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`;

  static DROP = `
    DROP TABLE IF EXISTS clients;`;

  static INSERT = `INSERT INTO clients (id, name, email, created_at, updated_at) VALUES
  ('596f85c7-200b-4598-a928-9ac62f1a62fe', 'Test', 'test@test.com', '2025-06-22 10:51:09', '2025-06-22 10:51:09'),
  ('bff5090d-c260-4f8a-8a86-e24bceda78ac', 'Test2', 'test2@test.com', '2025-06-22 10:51:09', '2025-06-22 10:51:09'),
  ('7d356b49-649c-42f8-a5fc-0967e3073b03', 'Test3', 'test3@test.com', '2025-06-22 10:51:09', '2025-06-22 10:51:09');`;
}
