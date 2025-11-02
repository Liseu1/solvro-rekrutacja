import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsString } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class QueryIngredientDto {
  @ApiPropertyOptional({
    description: "Filtruj składniki na podstawie zawartości alkoholu",
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
  isAlcohol?: boolean;

  @ApiPropertyOptional({
    description: "Pole, po którym nastąpi sortowanie",
    enum: ["name", "createdAt", "updatedAt"],
    example: "name",
  })
  @IsOptional()
  @IsString()
  @IsIn(["name", "createdAt", "updatedAt"])
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
