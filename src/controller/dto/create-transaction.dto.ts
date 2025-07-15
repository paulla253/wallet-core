import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionRequestDTO {
  @ApiProperty({
    example: '7d356b49-649c-42f8-a5fc-0967e3073b03',
    description: 'Id da conta de origem',
  })
  accountIdFrom: string;

  @ApiProperty({
    example: 'bff5090d-c260-4f8a-8a86-e24bceda78ac',
    description: 'Id da conta de destino',
  })
  accountIdTo: string;

  @ApiProperty({
    example: 10,
    description: 'Valor para transferencia',
  })
  amount: number;
}
