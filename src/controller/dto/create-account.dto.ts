import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountRequestDTO {
  @ApiProperty({
    example: 'aebea8b6-d246-4ff6-af61-41309c3c6322',
    description: 'Id do cliente',
  })
  clientId: string;
}
