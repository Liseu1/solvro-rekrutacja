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

import { ApiProperty } from "@nestjs/swagger";

import { IngredientAmountDto } from "./ingredient-amount.dto";

export class CreateCocktailDto {
  @ApiProperty({
    description: "Unikalna nazwa koktajlu",
    example: "Testowe Mojito",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Instrukcja przygotowania, krok po kroku",
    example: "1. Ugnieć limonkę z cukrem. 2. Dodaj rum.",
  })
  @IsString()
  @IsNotEmpty()
  manual: string;

  @ApiProperty({
    description: "Krótki opis koktajlu",
    example: "Klasyczny drink na bazie rumu.",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Kategoria smakowa koktajlu",
    enum: CocktailCategory,
    example: CocktailCategory.REFRESHING,
  })
  @IsEnum(CocktailCategory)
  @IsNotEmpty()
  category: CocktailCategory;

  @ApiProperty({
    description: "Lista składników wraz z ich ilościami",
    type: [IngredientAmountDto],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => IngredientAmountDto)
  ingredients: IngredientAmountDto[];
}
