import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CocktailService } from "./cocktail.service";
import { CreateCocktailDto } from "./dto/create-cocktail.dto";
import { QueryCocktailDto } from "./dto/query-cocktail.dto";
import { UpdateCocktailDto } from "./dto/update-cocktail.dto";

@ApiTags("Cocktail")
@Controller("cocktail")
export class CocktailController {
  constructor(private readonly cocktailService: CocktailService) {}

  @Post()
  @ApiOperation({ summary: "Tworzy nowy koktajl" })
  @ApiResponse({
    status: 201,
    description: "Koktajl został poprawnie utworzony.",
  })
  @ApiResponse({
    status: 400,
    description: "Błąd walidacji lub koktajl o tej nazwie już istnieje.",
  })
  @ApiResponse({
    status: 404,
    description: "Jeden lub więcej składników nie zostało znalezionych.",
  })
  async create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailService.create(createCocktailDto);
  }

  @Get()
  @ApiOperation({
    summary: "Pobiera listę koktajli z filtrowaniem i sortowaniem",
  })
  @ApiResponse({
    status: 200,
    description: "Zwraca listę koktajli.",
  })
  @ApiResponse({
    status: 400,
    description: "Błędne parametry filtrowania lub sortowania.",
  })
  async findAll(@Query() query: QueryCocktailDto) {
    return this.cocktailService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Pobiera jeden koktajl po jego ID" })
  @ApiResponse({ status: 200, description: "Zwraca znaleziony koktajl." })
  @ApiResponse({
    status: 404,
    description: "Koktajl o podanym ID nie został znaleziony.",
  })
  @ApiResponse({
    status: 400,
    description: "ID ma niepoprawny format (musi być liczbą).",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.cocktailService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Aktualizuje istniejący koktajl" })
  @ApiResponse({
    status: 200,
    description: "Koktajl został poprawnie zaktualizowany.",
  })
  @ApiResponse({
    status: 404,
    description:
      "Koktajl o podanym ID lub jeden z jego składników nie został znaleziony.",
  })
  @ApiResponse({
    status: 400,
    description:
      "Błąd walidacji lub próba ustawienia nazwy, która już istnieje.",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCocktailDto: UpdateCocktailDto,
  ) {
    return this.cocktailService.update(id, updateCocktailDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Usuwa koktajl po jego ID" })
  @ApiResponse({
    status: 200,
    description: "Koktajl został poprawnie usunięty.",
  })
  @ApiResponse({
    status: 404,
    description: "Koktajl o podanym ID nie został znaleziony.",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.cocktailService.remove(id);
  }
}
