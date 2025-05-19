import { ApiProperty } from '@nestjs/swagger';

export class CreateClientRequestDTO {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  name: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'Endereço de e-mail do usuário',
  })
  email: string;
}
