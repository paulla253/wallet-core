const { Kafka } = require('kafkajs');

async function run() {
  const requiredEnv = [
    'KAFKA_CLIENT_ID',
    'KAFKA_BROKER_URL',
    'TRANSACTION_TOPIC',
    'UPDATE_BALANCE_TOPIC',
  ];
  requiredEnv.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Variável de ambiente ${envVar} não definida`);
    }
  });

  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER_URL],
  });

  const admin = kafka.admin();
  const producer = kafka.producer();

  try {
    await admin.connect();
    await producer.connect();

    await admin.fetchTopicMetadata();
    const topics = await admin.listTopics();

    const topicTransaction = process.env.TRANSACTION_TOPIC;
    await checkTopic(admin, topicTransaction, topics);

    const topicBalanceUpdate = process.env.UPDATE_BALANCE_TOPIC;
    await checkTopic(admin, topicBalanceUpdate, topics);
  } catch (error) {
    console.error('Erro no Kafka:', error);
  } finally {
    await producer.disconnect();
    await admin.disconnect();
  }
}

async function checkTopic(admin, topic, topics) {
  if (!topics.includes(topic)) {
    console.log(`Tópico "${topic}" não existe. Criando...`);
    await admin.createTopics({
      topics: [
        {
          topic,
          numPartitions: 1,
          replicationFactor: 1,
        },
      ],
    });
    console.log(`Tópico "${topic}" criado com sucesso.`);
  } else {
    console.log(`Tópico "${topic}" já existe.`);
  }
}

run();
