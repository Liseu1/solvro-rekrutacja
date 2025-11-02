import { Prisma } from "@prisma/client";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { CreateCocktailDto } from "./dto/create-cocktail.dto";
import { QueryCocktailDto } from "./dto/query-cocktail.dto";
import { UpdateCocktailDto } from "./dto/update-cocktail.dto";

@Injectable()
export class CocktailService {
  constructor(private readonly database: DatabaseService) {}

  async create(createCocktailDto: CreateCocktailDto) {
    try {
      const ingredients = createCocktailDto.ingredients.map((ingredient) => ({
        amount: ingredient.amount,
        ingredient: { connect: { id: ingredient.ingredientId } },
      }));

      return await this.database.cocktail.create({
        data: {
          name: createCocktailDto.name,
          manual: createCocktailDto.manual,
          description: createCocktailDto.description,
          category: createCocktailDto.category,
          ingredients: {
            create: ingredients,
          },
        },
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;

      if (databaseError.code === "P2002") {
        throw new BadRequestException(
          "Cocktail with this name already exists!",
        );
      } else if (databaseError.code === "P2025") {
        throw new NotFoundException("One or more ingredients not found.");
      }
      throw error;
    }
  }

  async findAll(query: QueryCocktailDto) {
    const { category, sort, order, isAlcoholic, ingredientId } = query;

    const whereOptions: Prisma.CocktailWhereInput = {};
    const orderByOptions: Prisma.CocktailOrderByWithRelationInput = {};

    if (category) {
      whereOptions.category = category;
    }

    if (sort != null) {
      orderByOptions[sort] = order ?? "asc";
    }

    if (isAlcoholic !== undefined) {
      whereOptions.ingredients = isAlcoholic
        ? {
            some: { ingredient: { isAlcohol: true } },
          }
        : {
            none: { ingredient: { isAlcohol: true } },
          };
    }

    if (ingredientId != null) {
      whereOptions.ingredients = {
        ...whereOptions.ingredients,
        some: {
          ...whereOptions.ingredients?.some,
          ingredientId,
        },
      };
    }

    return await this.database.cocktail.findMany({
      where: whereOptions,
      orderBy: orderByOptions,
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const cocktail = await this.database.cocktail.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (cocktail != null) {
      return cocktail;
    }

    throw new NotFoundException(`Cocktail with this id does not exist!`);
  }

  async update(id: number, updateCocktailDto: UpdateCocktailDto) {
    const { ingredients, ...simpleFields } = updateCocktailDto;

    let ingredientsData:
      | Prisma.IngredientsOnCocktailsCreateWithoutCocktailInput[]
      | undefined;
    if (ingredients != null) {
      ingredientsData = ingredients.map((ing) => ({
        amount: ing.amount,
        ingredient: { connect: { id: ing.ingredientId } },
      }));
    }

    try {
      const dataToUpdate: Prisma.CocktailUpdateInput = {
        ...simpleFields,
      };

      if (ingredientsData != null) {
        dataToUpdate.ingredients = {
          deleteMany: {},
          create: ingredientsData,
        };
      }

      return await this.database.cocktail.update({
        where: { id },
        data: dataToUpdate,
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2002") {
        throw new BadRequestException(
          "Cocktail with this name already exists.",
        );
      }
      if (databaseError.code === "P2025") {
        throw new NotFoundException(
          "Cocktail or one of its ingredients not found.",
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.database.cocktail.delete({
        where: { id },
      });
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      if (databaseError.code === "P2025") {
        throw new NotFoundException(`Cocktail with this id does not exist!`);
      }
    }
  }
}
