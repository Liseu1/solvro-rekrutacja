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

import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { QueryIngredientDto } from "./dto/query-ingredient.dto";
import { UpdateIngredientDto } from "./dto/update-ingredient.dto";
import { IngredientService } from "./ingredient.service";

@Controller("ingredient")
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  async findAll(@Query() query: QueryIngredientDto) {
    return this.ingredientService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ingredientService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.ingredientService.remove(id);
  }
}
