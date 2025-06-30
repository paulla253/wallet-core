import {
  EEvent,
  IEventDispatcher,
  TOutputEvent,
} from 'src/core/event/event-dispatcher.interface';
import KafkaConfig from '../config/kafka.config';
import { Kafka, Partitioners, Producer } from 'kafkajs';

export default class KafkaAdapter implements IEventDispatcher {
  private readonly producer: Producer;
  private connected = false;

  constructor() {
    const kafka = new Kafka({
      clientId: KafkaConfig.CLIENT_ID,
      brokers: [KafkaConfig.BROKER_URL],
    });

    this.producer = kafka.producer({
      allowAutoTopicCreation: false,
      createPartitioner: Partitioners.LegacyPartitioner,
    });
  }

  async send(output: TOutputEvent): Promise<void> {
    await this.connect();

    const topic = this.getTopic(output.event);
    const message = { value: JSON.stringify(output.payload) };

    try {
      await this.producer.send({
        topic,
        messages: [message],
        timeout: 5000,
      });

      console.log(`Enviando para tópico ${topic}:`, message);
    } catch (e) {
      console.error('Erro ao enviar mensagem para Kafka:', e);
      throw e;
    }
  }

  private async connect() {
    if (!this.connected) {
      await this.producer.connect();
      this.connected = true;
    }
  }

  private getTopic(event: EEvent): string {
    if (event == EEvent.TRANSACTION) return KafkaConfig.TRANSACTION_TOPIC;

    if (event == EEvent.UPDATE_BALANCE) return KafkaConfig.UPDATE_BALANCE_TOPIC;
  }
}
