# React Application Knowledge Transfer (KT) Guide

Welcome! This guide is designed to help you understand the React frontend for the Auditbot SAP application. Since you are coming from a backend background, this will focus on how the "pieces" fit together.

## 1. Tech Stack Overview
- **React (v16.13.1)**: The core UI library. This project uses **Class Components** for many of its main views.
- **Redux**: Used for global state management (e.g., login tokens, site-wide filters).
- **Material UI (@material-ui/core)**: The primary component library for buttons, inputs, tables, and layout.
- **Axios**: For making HTTP requests to your backend (configured via proxy in `package.json`).
- **Charts**: Uses **Nivo** and **Recharts** for data visualization.
- **Router**: Uses **React Router** for page navigation.

---

## 2. Project Structure
The `src/` directory is where all the code lives:

- `index.js`: The entry point. It sets up Redux and attaches the app to the HTML.
- `App.js`: The root component that sets up the Router.
- `container/`: Contains "Page" components (smart components) that represent full views (e.g., `LicenseDashbord.js`, `Login.js`).
- `component/`: Contains smaller, reusable UI pieces (e.g., cards, graphs, tables).
    - Subfolders like `licensecomponent`, `grccomponent`, and `controlcomponent` group components by business module.
- `Store/`: Everything related to Redux:
    - `actions/`: Functions that trigger state changes (where API calls often live).
    - `reducer/`: Where the internal state logic is defined.
- `resources/`: Static assets like images (logos, icons).

---

## 3. How the Application Runs

### Prerequisites
- **Node.js**: Ensure you have a modern version of Node installed.

### Commands
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the App**:
   ```bash
   npm start
   ```
   *Note: If you run into "OSSL" errors, the `package.json` is already configured to handle it with `--openssl-legacy-provider`.*

3. **Backend Integration**:
   The app is configured to proxy requests to `http://localhost:8080`. If your backend runs on a different port, update the `proxy` field in `package.json`.

---

## 4. Understanding the Flow

### Entry Point & Routing
1. `src/index.js` wraps the app in a `<Provider>` (Redux) and `<App />`.
2. `src/App.js` renders `<Application />` inside a `<BrowserRouter>`.
3. `src/container/Application.js` checks for authentication and decides whether to show the `Login` page or the `Home` page.
4. `src/container/Home.js` is the main wrapper for authenticated users. It contains the `Header` and a `<Switch>` that maps URLs (like `/licensedashbord`) to specific page components.

### Example: How a Page is Built
If you visit `/licensedashbord`:
1. `Home.js` detects the route and loads `LicenseDashbord.js`.
2. `LicenseDashbord.js` (in `src/container/`) acts as the "Controller". It might fetch data via Redux actions and then render several "View" components from `src/component/licensecomponent/`.

---

## 5. State Management (Redux)
If you need to change how data is shared across pages:
- **Reducers**: Define what the data looks like (see `src/Store/reducer/`).
- **Actions**: Define the methods to change that data (see `src/Store/actions/`).
- **Connecting Components**: You will see `connect(mapStateToProps, mapDispatchToProps)` at the bottom of many components. This is how React components "talk" to the Redux store.

---

## 6. Tips for Backend Developers
- **DevTools**: Install the "React Developer Tools" and "Redux DevTools" extensions in your browser (Chrome/Edge). They are like a debugger for the UI.
- **Async Logic**: Look into `src/Store/actions/` to see how we handle asynchronous data fetching using `redux-thunk`.
- **Axios Interceptors**: Check how we handle base URLs or authentication headers in the login actions.
