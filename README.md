# RentalCar

**Short Description:**  
This project is a web application for browsing and filtering rental cars. Users can select a brand, price, mileage, and view car details. Pagination and asynchronous data loading are supported.

---

## Features

- Search cars by brand, price, and mileage
- Dynamic car loading with "Load More" button
- Car list display with cards (CarList component)
- Favorite cars selection
- Loader displayed during asynchronous requests
- Filters and selected cars stored in global state (Zustand)

---

## Technologies Used

- React + Next.js
- TypeScript
- Zustand (global state management)
- React Query (for async requests)
- CSS Modules
- Axios (for HTTP requests)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Mariana331/rental-car.git
cd rental-car

2. Install dependencies:
bash
npm install
# or
yarn install

3. Run the development server:
bash
npm run dev
# or
yarn dev

4. Open in your browser:
http://localhost:3000

Usage
- On the catalog page, you can select filters:
  - Brand
  - Price per hour
  - Mileage
- Click the "Search" button to apply filters
- Click the "Load More" button to fetch more cars
- A Loader appears while data is being fetched

Author: Mariana Koval
Email: m.koval000@gmail.com
GitHub: https://github.com/Mariana331

```
