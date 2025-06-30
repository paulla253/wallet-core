import { Module } from '@nestjs/common';
import { EventDispatcherToken } from '../token/event-dispatcher.token';
import KafkaAdapter from 'src/infrastructure/event/kafka.adapter';

@Module({
  providers: [
    {
      provide: EventDispatcherToken,
      useFactory: () => {
        return new KafkaAdapter();
      },
      inject: [],
    },
  ],
  exports: [EventDispatcherToken],
  imports: [],
  controllers: [],
})
export class EventDispatcherModule {}
