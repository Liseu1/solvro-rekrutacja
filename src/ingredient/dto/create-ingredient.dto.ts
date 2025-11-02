import { IsBoolean, IsNotEmpty, IsString, IsUrl } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateIngredientDto {
  @ApiProperty({ example: "Limonka", description: "Unikalna nazwa składnika" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Kwaśny owoc cytrusowy.",
    description: "Opis składnika",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: false, description: "Czy składnik zawiera alkohol" })
  @IsBoolean()
  @IsNotEmpty()
  isAlcohol: boolean;

  @ApiProperty({
    example: "http://example.com/lime.jpg",
    description: "URL do zdjęcia",
  })
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
