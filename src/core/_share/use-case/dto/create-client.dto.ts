export interface ICreateClientInputDTO {
  name: string;
  email: string;
}

export interface ICreateClientOutputDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
