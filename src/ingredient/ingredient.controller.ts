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

import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { QueryIngredientDto } from "./dto/query-ingredient.dto";
import { UpdateIngredientDto } from "./dto/update-ingredient.dto";
import { IngredientService } from "./ingredient.service";

@ApiTags("Ingredient")
@Controller("ingredient")
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @ApiOperation({ summary: "Tworzy nowy składnik" })
  @ApiResponse({
    status: 201,
    description: "Składnik został poprawnie utworzony.",
  })
  @ApiResponse({
    status: 400,
    description: "Błąd walidacji lub składnik o tej nazwie już istnieje.",
  })
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({
    summary: "Pobiera listę składników z filtrowaniem i sortowaniem",
  })
  @ApiResponse({
    status: 200,
    description: "Zwraca listę składników.",
  })
  @ApiResponse({
    status: 400,
    description: "Błędne parametry filtrowania lub sortowania.",
  })
  async findAll(@Query() query: QueryIngredientDto) {
    return this.ingredientService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Pobiera jeden składnik po jego ID" })
  @ApiResponse({ status: 200, description: "Zwraca znaleziony składnik." })
  @ApiResponse({
    status: 404,
    description: "Składnik o podanym ID nie został znaleziony.",
  })
  @ApiResponse({
    status: 400,
    description: "ID ma niepoprawny format (musi być liczbą).",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ingredientService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Aktualizuje istniejący składnik" })
  @ApiResponse({
    status: 200,
    description: "Składnik został poprawnie zaktualizowany.",
  })
  @ApiResponse({
    status: 404,
    description: "Składnik o podanym ID nie został znaleziony.",
  })
  @ApiResponse({
    status: 400,
    description:
      "Błąd walidacji lub próba ustawienia nazwy, która już istnieje.",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Usuwa składnik po jego ID" })
  @ApiResponse({
    status: 200,
    description: "Składnik został poprawnie usunięty.",
  })
  @ApiResponse({
    status: 404,
    description: "Składnik o podanym ID nie został znaleziony.",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.ingredientService.remove(id);
  }
}
