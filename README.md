# Lit Employee Management

Lit Employee Management is a modern and user-friendly web application designed to efficiently manage company employee information.

---

## Table of Contents

- [About](#about)  
- [Installation](#installation)  
- [Project Structure](#project-structure)  
- [Test Coverage](#test-coverage)  
- [Dev Server](#dev-server)  

---

## About

Lit Employee Management allows you to manage employee records, positions, departments etc.

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/Se7eNss/lit-user-management
```

2. Navigate to the project folder:  
```bash
cd lit-employee-management
```

3. Install dependencies:  
```bash
npm install
```

4. Start the application:  
```bash
npm run serve
```

---

## Project Structure

```
src
├── assets                # Static files (images, fonts)
│   ├── fonts
│   └── images
├── components            # Reusable UI components
│   ├── elements          # Atomic components (button, input, modal, etc.)
│   ├── forms             # Form components
│   ├── icons             # SVG icons
│   ├── layouts           # Layout components (header, etc.)
│   └── widgets           # Widgets components
├── config                # Application settings and constants
├── locales               # Localization files
├── pages                 # Page-level components
├── redux                 # Redux store, slices
├── routes                # Application routing definitions
├── styles                # Themes and global styles
├── utils                 # Utility functions
└── index.js              # Application entry point
```

---

## Test Coverage

Tests can be run with the `test` script, which will run your tests against Lit's development mode (with more verbose errors) as well as against Lit's production mode:

```bash
npm test
```

The project currently has 90% test coverage. Regular testing is performed to ensure code quality and maintainability.

---

## Dev Server

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/index.html` that you can view at http://localhost:8000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run serve:prod`.

## Linting

Linting of JavaScript files is provided by [ESLint](eslint.org). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json`.

To lint the project run:

```bash
npm run lint:eslint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.



**Contact:** oguzhanseven18@gmail.com