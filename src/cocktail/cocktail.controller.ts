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

import { CocktailService } from "./cocktail.service";
import { CreateCocktailDto } from "./dto/create-cocktail.dto";
import { QueryCocktailDto } from "./dto/query-cocktail.dto";
import { UpdateCocktailDto } from "./dto/update-cocktail.dto";

@Controller("cocktail")
export class CocktailController {
  constructor(private readonly cocktailService: CocktailService) {}

  @Post()
  async create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailService.create(createCocktailDto);
  }

  @Get()
  async findAll(@Query() query: QueryCocktailDto) {
    return this.cocktailService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.cocktailService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCocktailDto: UpdateCocktailDto,
  ) {
    return this.cocktailService.update(id, updateCocktailDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.cocktailService.remove(id);
  }
}
