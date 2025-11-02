import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class IngredientAmountDto {
  @ApiProperty({
    description: "ID istniejącego składnika",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  ingredientId: number;

  @ApiProperty({
    description: "Ilość składnika",
    example: "50ml",
  })
  @IsString()
  @IsNotEmpty()
  amount: string;
}
