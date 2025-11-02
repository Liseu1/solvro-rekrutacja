import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class IngredientAmountDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  ingredientId: number;

  @IsString()
  @IsNotEmpty()
  amount: string;
}
