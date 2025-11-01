import { IsBoolean, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isAlcohol: boolean;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
