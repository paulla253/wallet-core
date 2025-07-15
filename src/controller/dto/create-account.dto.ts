import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountRequestDTO {
  @ApiProperty({
    example: '596f85c7-200b-4598-a928-9ac62f1a62fe',
    description: 'Id do cliente',
  })
  clientId: string;
}
