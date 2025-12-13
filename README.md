# Alpakowy Bazarek
Alpakowy Bazarek to aplikacja webowa umożliwiająca zarządzanie alpakami oraz ich zakup przez użytkowników.
Projekt został wykonany w Node.js z wykorzystaniem frameworka Express, szablonów EJS oraz bazy danych MongoDB.

## Funkcjonalności
- wyświetlanie listy dostępnych alpak
- filtrowanie alpak po kolorze (GET)
- sortowanie alpak po nazwie i cenie
- dodawanie, edycja oraz usuwanie alpak (CRUD)
- tworzenie użytkowników
- zakup alpaki przez istniejącego użytkownika
- historia zakupów
- walidacja danych i obsługa błędów

## Instalacja i uruchomienie
1. Sklonuj repozytorium projektu.
2. Przejdź do katalogu projektu.
3. Zainstaluj zależności:
   npm install
4. Uruchom aplikację:
   npm start
5. Uruchom bazę danych MongoDB zgodnie z instrukcjami zawartymi w pliku docker.txt.
6. Otwórz aplikację w przeglądarce:
   http://localhost:3003

## Endpointy
GET /
GET /alpaca/new
POST /alpaca/new
GET /alpaca/:id
GET /alpaca/:id/edit
POST /alpaca/:id/edit
POST /alpaca/:id/delete
GET /register
POST /register
GET /users
POST /users/:id/delete
GET /buy
POST /buy
GET /orders

## Technologie
- Node.js
- Express
- EJS
- MongoDB
- MongoDB Compass
- Docker
- HTML
- CSS
- JavaScript

## Licencja
MIT - patrz LICENSE

## Autorzy:
- Patrycja Kula
