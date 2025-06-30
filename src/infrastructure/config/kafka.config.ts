export default class KafkaConfig {
  public static readonly BROKER_URL = process.env.KAFKA_BROKER_URL;
  public static readonly GROUP_ID = process.env.KAFKA_GROUP_ID;
  public static readonly CLIENT_ID = process.env.KAFKA_CLIENT_ID;
  public static readonly TRANSACTION_TOPIC = process.env.TRANSACTION_TOPIC;
  public static readonly UPDATE_BALANCE_TOPIC =
    process.env.UPDATE_BALANCE_TOPIC;
}
