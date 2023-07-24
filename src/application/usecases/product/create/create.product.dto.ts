export interface InputCreateProductDto {
  name: string;
  price: number;
}

export interface OutputCreateProductDto extends InputCreateProductDto {
  id: string;
}
