import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  weight_gram: number;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsDateString()
  expiration: string;
  
  @IsDateString()
  notify_before_expiration: string;
}