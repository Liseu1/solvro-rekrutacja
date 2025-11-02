import { Prisma } from "@prisma/client";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { QueryIngredientDto } from "./dto/query-ingredient.dto";
import { UpdateIngredientDto } from "./dto/update-ingredient.dto";

@Injectable()
export class IngredientService {
  constructor(private readonly database: DatabaseService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    try {
      return await this.database.ingredient.create({
        data: createIngredientDto,
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2002") {
        throw new BadRequestException(
          "Ingredient with this name already exists!",
        );
      }
    }
  }

  async findAll(query: QueryIngredientDto) {
    const { isAlcohol, sort, order } = query;

    const whereOptions: Prisma.IngredientWhereInput = {};
    const orderByOptions: Prisma.IngredientOrderByWithRelationInput = {};

    if (isAlcohol !== undefined) {
      whereOptions.isAlcohol = isAlcohol;
    }

    if (sort != null) {
      orderByOptions[sort] = order ?? "asc";
    }

    return await this.database.ingredient.findMany({
      where: whereOptions,
      orderBy: orderByOptions,
    });
  }

  async findOne(id: number) {
    const ingredient = await this.database.ingredient.findUnique({
      where: { id },
    });

    if (ingredient != null) {
      return ingredient;
    }
    throw new NotFoundException("Ingredient with this id does not exist!");
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    try {
      return await this.database.ingredient.update({
        where: { id },
        data: updateIngredientDto,
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2002") {
        throw new BadRequestException(
          "Ingredient with this name already exists!",
        );
      } else if (databaseError.code === "P2025") {
        throw new NotFoundException("Ingredient with this id does not exist!");
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.database.ingredient.delete({ where: { id } });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2025") {
        throw new NotFoundException("Ingredient with this id does not exist!");
      }
    }
  }
}
