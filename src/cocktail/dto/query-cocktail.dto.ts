import { CocktailCategory } from "@prisma/client";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class QueryCocktailDto {
  @ApiPropertyOptional({
    description: "Filtruj koktajle po kategorii",
    enum: CocktailCategory,
  })
  @IsOptional()
  @IsEnum(CocktailCategory)
  category?: CocktailCategory;

  @ApiPropertyOptional({
    description:
      "Filtruj koktajle na podstawie zawartości alkoholu (true = alkoholowe, false = bezalkoholowe)",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true") {
      return true;
    }
    return value === "false" ? false : "";
  })
  isAlcoholic?: boolean;

  @ApiPropertyOptional({
    description: "Filtruj koktajle zawierające składnik o podanym ID",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => Number.parseInt(value as string, 10))
  ingredientId?: number;

  @ApiPropertyOptional({
    description: "Pole, po którym nastąpi sortowanie",
    enum: ["name", "createdAt", "updatedAt"],
  })
  @IsOptional()
  @IsString()
  @IsIn(["name", "createdAt", "updatedAt"]) // Pola do sortowania
  sort?: string;

  @ApiPropertyOptional({
    description: "Kierunek sortowania",
    enum: ["asc", "desc"],
    default: "asc",
  })
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}
