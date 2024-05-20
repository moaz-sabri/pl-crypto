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
   - Create sub-components such as `HeaderComponent`, `ModalComponent`, `FooterComponent`, `AlertComponent` and `NavbarComponent`.

3. **Create Interfaces**:

   - Define interfaces for data structures:
     - `Categories`
     - `Category`
     - `Data`
     - `Coin`
     - `MarketData`
     - `Tickers`

4. **Implement Services**:

   - Create `Alert` to .
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
│   │   ├── global/
│   │   │   ├── coin-list/
│   │   │   │   ├── coin-list.component.html
│   │   │   │   ├── coin-list.component.css
│   │   │   │   ├── coin-list.component.ts
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

## Cryptocurrency

1. **loadCryptocurrencies()**: Method to fetch and load cryptocurrencies based on parameters like page, perPage, category, and order. Handles API call success and failure scenarios, and fallbacks to local data in case of API failure.

2. **setTheActiveSortButton(sort: string)**: Method to set the active sort button based on the provided sort parameter. Removes the 'active' and 'btn-primary' classes from all sort buttons and adds them to the active button.

- **sortPage(param: string, val: number)**: Method to sort the page based on a given parameter and value. Updates the query parameters for order and navigates to the updated route.

- **loadPerPage(val: number)**: Method to load a specific number of items per page. Updates the query parameter for 'per_page' and navigates to the updated route.

- **nextPage()**: Method to navigate to the next page. Increments the current page number and reloads cryptocurrencies for the next page.

- **previousPage()**: Method to navigate to the previous page. Decrements the current page number if it's greater than 1 and reloads cryptocurrencies for the previous page.

- **moreCategories()**: Method to load more categories. Increases the number of categories per page by 10 and updates the view of categories accordingly.

- **loadTrending()**: Method to load trending data from the CoingeckoService. Handles API call success and failure scenarios, and fallbacks to local data in case of API failure.

- **loadChart(data: any)**: Method to load chart data based on the fetched cryptocurrency data.

- **fetchCryptocurrency(id: string)**: Method to fetch cryptocurrency data by ID from the CoingeckoService. Handles API call success and failure scenarios, and fallbacks to local data in case of API failure.

## Search

- **openModal(result: any)**: Method to open a modal with the search result data.

- **search()**: Method to perform a search using the CoingeckoService. Opens a modal with the search result data and handles API call failure scenarios by fallbacking to local data.

- **onRouteChange()**: Method to execute logic when a route changes. Scrolls the window to the top.

## Alert

- **loadCategories()**: Method to load categories from the CoingeckoService. Handles API call success and failure scenarios, and fallbacks to local data in case of API failure.

- **showAlert(type: 'success' | 'danger' | 'warning' | 'info', message: string)**: Method to show an alert message with a specified type and message.

- **clearAlert()**: Method to clear the alert message.

- **closeModal()**: Method to close the modal.

- **removeAlert(alertToRemove: Alert)**: Method to remove a specific alert from the alerts array and clear the alert.

### Project Version

The current version of the project is **1.0.0**, representing the initial release version.

## Online Demo

You can try out a live demo of this project on [pl.joudev.com](https://pl.joudev.com/).

## License

This project is licensed under the [License](LICENSE).
