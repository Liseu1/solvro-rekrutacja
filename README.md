# Koktajl API

REST API do zarządzania przepisami na koktajle i ich składnikami. Projekt został zrealizowany w ramach zadania rekrutacyjnego, wykorzystując framework **NestJS** oraz **Prisma ORM**.

## Użyte Technologie

- **Framework:** NestJS
- **Język:** TypeScript
- **ORM:** Prisma
- **Baza Danych:** PostgreSQL
- **Dokumentacja:** Swagger

---

## API Endpoints

### Składniki (`/ingredient`)

- `POST /ingredient` - Tworzenie nowego składnika.
- `GET /ingredient` - Pobieranie listy składników (wspiera filtrowanie i sortowanie).
- `GET /ingredient/:id` - Pobieranie szczegółów jednego składnika.
- `PATCH /ingredient/:id` - Aktualizacja składnika.
- `DELETE /ingredient/:id` - Usuwanie składnika.

### Koktajle (`/cocktail`)

- `POST /cocktail` - Tworzenie nowego koktajlu wraz z listą składników.
- `GET /cocktail` - Pobieranie listy koktajli (wspiera filtrowanie i sortowanie).
- `GET /cocktail/:id` - Pobieranie szczegółów jednego koktajlu.
- `PATCH /cocktail/:id` - Aktualizacja koktajlu (w tym jego składników).
- `DELETE /cocktail/:id` - Usuwanie koktajlu.
