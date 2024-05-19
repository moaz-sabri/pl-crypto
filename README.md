# PL-Crypto

## Project Description

The Angular project is a web application designed to provide users with information about cryptocurrencies. Leveraging the CoinGecko API, the application fetches data about various cryptocurrencies, including their prices, market capitalization, categories, and more.

### Features

1. **Cryptocurrency List**: The application displays a list of cryptocurrencies, allowing users to explore different coins and view key information such as their symbols, names, and current prices.

2. **Category Filtering**: Users can filter cryptocurrencies based on categories, enabling them to focus on specific types of coins

3. **Trending Data**: The application provides trending data, showcasing popular cryptocurrencies and trends in the market.

4. **Search Functionality**: Users can search for specific cryptocurrencies using the search feature, making it easy to find information about a particular coin.

5. **Coin Detail View**: Users can view detailed information about a selected cryptocurrency, including its symbol, name, categories, homepage, image, genesis date, and current price.

### Workflow

1. **Setup Angular Project**:

   - Use Angular CLI to create a new Angular project.

2. **Create Components**:

   - Create `CoinListComponent` responsible for displaying the list of coins.
   - Create `CoinDetailComponent` for showing detailed information about a coin.
   - Create `CategoriesComponent` to display categories of coins.
   - Create sub-components such as `HeaderComponent`, `ModalComponent`, `FooterComponent`, and `NavbarComponent`.

3. **Create Interfaces**:

   - Define interfaces for data structures:
     - `Categories`
     - `Category`
     - `Data`
     - `Coin`
     - `MarketData`
     - `Tickers`

4. **Implement Services**:

   - Create `CoingeckoService` to interact with the CoinGecko API.
   - Create `GlobalService` for global data and functionalities shared across components.

5. **Component Implementation**:

   - Implement logic and template for each component.
   - Use the provided services to fetch and manipulate data.

6. **Routing**:
   - Define routes in `app-routing.module.ts` using Angular Router.
   - Map routes to components and specify titles for each route using the provided route configuration.

```typescript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoinListComponent } from "./coin-list/coin-list.component";
import { CoinDetailComponent } from "./coin-detail/coin-detail.component";
import { CategoriesComponent } from "./categories/categories.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full", data: { title: "Home" } },
  { path: "", component: CoinListComponent, data: { title: "Coins" } },
  { path: "coins/:category", component: CoinListComponent, data: { title: "Coins by Category" } },
  { path: "coin/:id", component: CoinDetailComponent, data: { title: "Coin Detail" } },
  { path: "categories", component: CategoriesComponent, data: { title: "Categories" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

7. **Styling**:

   - Style components and sub-components using CSS or SCSS.
   - Utilize Bootstrap classes for layout and styling where applicable.

8. **Testing**:

   - Write unit tests for components and services to ensure functionality and data retrieval.
   - Use Angular TestBed for testing component behavior.

9. **Documentation**:

   - Update the README.md file with information about the project structure, components, services, and interfaces.
   - Include instructions on how to build, test, and run the project.
   - Document any additional features or configurations.

10. **Deployment**:
    - Deploy the Angular application to a hosting platform for users to access.

### Project Structure

```
/angular-project
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── coin-list/
│   │   │   │   ├── coin-list.component.html
│   │   │   │   ├── coin-list.component.css
│   │   │   │   ├── coin-list.component.ts
│   │   │   │   └── coin-list-item.component.ts
│   │   │   ├── coin-detail/
│   │   │   │   ├── coin-detail.component.html
│   │   │   │   ├── coin-detail.component.css
│   │   │   │   └── coin-detail.component.ts
│   │   ├── services/
│   │   │   └── coingecko.service.ts
│   │   ├── models/
│   │   │   └── coin.model.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   │
│   ├── index.html
│   └── styles.css
│
├── README.md
└── angular.json
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/moaz-sabri/pl-crypto.git
   ```

2. Install dependencies:

   ```bash
   cd pl-crypto
   npm install
   ```

## Usage

To run the development server:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200/`.

To run tests:

```bash
ng test
```

To build the project:

```bash
ng build
```

This command will compile the Angular application and generate the necessary files for deployment. You can find the built project in the dist folder within your project directory.

## Development

- For development, you will need Node.js and npm installed on your machine.
- Modify the source code located in the `src/` directory.
- Use Angular CLI commands for building, testing, and generating components.

### Dependencies

The project utilizes the following dependencies to enhance functionality and user experience:

- **Bootstrap 5.3.3**: Provides a robust framework for building responsive and visually appealing web applications, offering extensive styling options and components.
- **bootstrap-icons 1.11.3**: Offers a comprehensive collection of icons for use in Bootstrap projects, enhancing visual elements and user interface components.
- **Charts.js 4.4.2**: Facilitates the creation of interactive and visually engaging charts and graphs, allowing for the visualization of cryptocurrency price data and trends.
- **TypeScript 5.4.2**: Enables the development of scalable and maintainable Angular applications, providing enhanced type checking and compile-time error detection.

### Data Loading Hint

When loading data, the application first attempts to fetch categories from the CoinGecko API using the `loader()` method in the `CoingeckoService`. If the API call fails or encounters an error, the application falls back to loading data from a local JSON file as a backup solution. This ensures a smooth user experience even if there are issues with the API. Please note that this scenario is primarily for testing purposes and should be adjusted accordingly based on API availability and usage limitations.

### Project Version

The current version of the project is **1.0.0**, representing the initial release version.

## License

This project is licensed under the [License Name](LICENSE).
