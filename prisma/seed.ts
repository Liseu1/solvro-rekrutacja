import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.cocktail.create({
    data: {
      name: "Mojito",
      description:
        "Klasyczny kubański koktajl o orzeźwiającym, miętowo-limonkowym smaku.",
      manual:
        "1. W wysokiej szklance delikatnie ugnieć liście mięty z cukrem i sokiem z limonki. 2. Dodaj kruszony lód. 3. Wlej rum. 4. Uzupełnij wodą gazowaną i delikatnie wymieszaj. 5. Udekoruj gałązką mięty i plasterkiem limonki.",
      ingredients: {
        create: [
          {
            amount: "60ml",
            ingredient: {
              connectOrCreate: {
                where: { name: "Biały rum" },
                create: {
                  name: "Biały rum",
                  description: "Klarowny rum, baza wielu koktajli.",
                  isAlcohol: true,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "1/2 sztuki",
            ingredient: {
              connectOrCreate: {
                where: { name: "Limonka" },
                create: {
                  name: "Limonka",
                  description: "Kwaśny cytrus.",
                  isAlcohol: false,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "10 listków",
            ingredient: {
              connectOrCreate: {
                where: { name: "Świeża mięta" },
                create: {
                  name: "Świeża mięta",
                  description: "Nadaje orzeźwiający aromat.",
                  isAlcohol: false,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "2 łyżeczki",
            ingredient: {
              connectOrCreate: {
                where: { name: "Cukier trzcinowy" },
                create: {
                  name: "Cukier trzcinowy",
                  description: "Słodycz do drinków.",
                  isAlcohol: false,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "do uzupełnienia",
            ingredient: {
              connectOrCreate: {
                where: { name: "Woda gazowana" },
                create: {
                  name: "Woda gazowana",
                  description: "Woda gazowana",
                  imageUrl: "abc.jpg",
                  isAlcohol: false,
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.cocktail.create({
    data: {
      name: "Aperol Spritz",
      description:
        "Popularny włoski aperitif o charakterystycznym pomarańczowym kolorze i lekko gorzkim smaku.",
      manual:
        "1. Do dużego kieliszka do wina wrzuć kostki lodu. 2. Wlej Prosecco. 3. Wlej Aperol. 4. Dodaj odrobinę wody gazowanej. 5. Delikatnie wymieszaj i udekoruj plasterkiem pomarańczy.",
      ingredients: {
        create: [
          {
            amount: "3 części (90ml)",
            ingredient: {
              connectOrCreate: {
                where: { name: "Prosecco" },
                create: {
                  name: "Prosecco",
                  description: "Włoskie wino musujące.",
                  isAlcohol: true,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "2 części (60ml)",
            ingredient: {
              connectOrCreate: {
                where: { name: "Aperol" },
                create: {
                  name: "Aperol",
                  description: "Pomarańczowy likier.",
                  isAlcohol: true,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "1 część (30ml)",
            ingredient: {
              connectOrCreate: {
                where: { name: "Woda gazowana" },
                create: {
                  name: "Woda gazowana",
                  description: "Woda gazowana",
                  imageUrl: "abc.jpg",
                  isAlcohol: false,
                },
              },
            },
          },
          {
            amount: "1 plaster",
            ingredient: {
              connectOrCreate: {
                where: { name: "Pomarańcza" },
                create: {
                  name: "Pomarańcza",
                  description: "Do dekoracji.",
                  isAlcohol: false,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.cocktail.create({
    data: {
      name: "Cosmopolitan",
      description:
        'Elegancki, różowy koktajl znany z serialu "Seks w wielkim mieście".',
      manual:
        "1. Schłodź kieliszek koktajlowy. 2. Do shakera wypełnionego lodem wlej wódkę cytrynową, Cointreau, sok żurawinowy i sok z limonki. 3. Energicznie wstrząsaj przez ok. 15 sekund. 4. Przelej do schłodzonego kieliszka przez sitko. 5. Udekoruj skórką pomarańczy.",
      ingredients: {
        create: [
          {
            amount: "40ml",
            ingredient: {
              connectOrCreate: {
                where: { name: "Wódka cytrynowa" },
                create: {
                  name: "Wódka cytrynowa",
                  description: "Wódka z nutą cytrusów.",
                  isAlcohol: true,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "20ml",
            ingredient: {
              connectOrCreate: {
                where: { name: "Cointreau" },
                create: {
                  name: "Cointreau",
                  description: "Likier pomarańczowy typu triple sec.",
                  isAlcohol: true,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "20ml",
            ingredient: {
              connectOrCreate: {
                where: { name: "Sok żurawinowy" },
                create: {
                  name: "Sok żurawinowy",
                  description: "Nadaje kolor i cierpkość.",
                  isAlcohol: false,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
          {
            amount: "10ml",
            ingredient: {
              connectOrCreate: {
                where: { name: "Sok z limonki" },
                create: {
                  name: "Sok z limonki",
                  description: "Sok z limonki",
                  isAlcohol: false,
                  imageUrl: "placeholder.jpg",
                },
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    throw new Error("query failed");
  });
