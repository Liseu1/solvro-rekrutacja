import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsString } from "class-validator";

export class QueryIngredientDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true") {
      return true;
    }
    return value === "false" ? false : "";
  })
  isAlcohol?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(["name", "createdAt", "updatedAt"])
  sort?: string;

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}
