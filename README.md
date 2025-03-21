# Shopping Cart - React & Firebase

This is a simple shopping cart system built with React and Firebase Firestore. Users can browse products, add them to their cart, adjust quantities, and remove items.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Development Server](#running-the-development-server)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches products from Fake Store API.
- Users can add products to the cart.
- Cart items show quantity and total price.
- Users can increase or decrease item quantity.
- Items can be removed from the cart.
- Uses Firebase Firestore for cart storage.

## Prerequisites

- Node.js
- Firebase Firestore project

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NavinduV/FakeStore.git .
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

```

## Running the Development Server

Running the Development Server:

```bash
npm run dev
```

## Usage

1. Open http://localhost:5173 in your browser.
2. Browse products and add them to the cart.
3. Increase, decrease, or remove items from the cart.
4. Cart updates in real-time using Firebase Firestore.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
