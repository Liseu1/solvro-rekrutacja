import { CocktailCategory } from "@prisma/client";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";

import { IngredientAmountDto } from "./ingredient-amount.dto";

export class CreateCocktailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  manual: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(CocktailCategory)
  @IsNotEmpty()
  category: CocktailCategory;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => IngredientAmountDto)
  ingredients: IngredientAmountDto[];
}
