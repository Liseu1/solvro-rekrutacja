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

export class QueryCocktailDto {
  @IsOptional()
  @IsEnum(CocktailCategory)
  category?: CocktailCategory;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true") {
      return true;
    }
    return value === "false" ? false : "";
  })
  isAlcoholic?: boolean;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => Number.parseInt(value as string, 10))
  ingredientId?: number;

  @IsOptional()
  @IsString()
  @IsIn(["name", "createdAt", "updatedAt"]) // Pola do sortowania
  sort?: string;

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}
