import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionRequestDTO {
  @ApiProperty({
    example: '855ce48d-e03c-40d4-b677-edd19d25f584',
    description: 'Id da conta de origem',
  })
  accountIdFrom: string;

  @ApiProperty({
    example: '855ce48d-e03c-40d4-b677-edd19d25f584',
    description: 'Id da conta de destino',
  })
  accountIdTo;

  @ApiProperty({
    example: 100,
    description: 'Valor para transferencia',
  })
  amount: number;
}
