-- CreateEnum
CREATE TYPE "CocktailCategory" AS ENUM ('SWEET', 'SOUR', 'REFRESHING', 'STRONG', 'OTHER');

-- CreateTable
CREATE TABLE "Cocktail" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manual" TEXT NOT NULL,
    "category" "CocktailCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cocktail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAlcohol" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsOnCocktails" (
    "amount" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "cocktailId" INTEGER NOT NULL,

    CONSTRAINT "IngredientsOnCocktails_pkey" PRIMARY KEY ("cocktailId","ingredientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cocktail_name_key" ON "Cocktail"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- AddForeignKey
ALTER TABLE "IngredientsOnCocktails" ADD CONSTRAINT "IngredientsOnCocktails_cocktailId_fkey" FOREIGN KEY ("cocktailId") REFERENCES "Cocktail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnCocktails" ADD CONSTRAINT "IngredientsOnCocktails_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
