import 'dotenv/config';

export default class DatabaseConfig {
  public static readonly MYSQL_HOST: string = process.env.MYSQL_HOST;
  public static readonly MYSQL_PORT: number = Number(process.env.MYSQL_PORT);
  public static readonly MYSQL_USER: string = process.env.MYSQL_USER;
  public static readonly MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD;
  public static readonly MYSQL_DATABASE: string = process.env.MYSQL_DATABASE;
}
