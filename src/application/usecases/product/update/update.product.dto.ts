export interface InputUpdateProductDto {
  id: string;
  name: string;
  price: number;
}

export interface OutputUpdateProductDto extends InputUpdateProductDto {}
