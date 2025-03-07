# Selectron (In Development)

Selectron is a powerful, cross-platform desktop Todo application built using Electron, Express, MongoDB (Mongoose) & React-Vite. It offers a secure, intuitive interface for managing your tasks with ease—complete with authentication and all the essential features for handling your daily todos.

## Features

- **Cross-platform Desktop App:** Built with [Electron](https://electronjs.org/)
- **Modern Frontend:** Developed with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- **Robust Backend:** Powered by [Express](https://expressjs.com/)
- **Database Integration:** Uses [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** Secure login and registration system
- **CRUD Operations:** Create, read, update, and delete todos
- **Responsive Design:** Enjoy a seamless experience across different screen sizes

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (>=14.x) installed on your machine
- MongoDB installed locally or access to a MongoDB Atlas cluster

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/selectron.git
   cd selectron
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   - Create a \`.env\` file in the root directory.
   - Add your MongoDB connection string and other configuration details:
     ```
     MONGO_URI=your_mongo_connection_string
     PORT=your_desired_port
     JWT_SECRET=your_jwt_secret
     ```

4. Start the application:
   ```bash
   npm run dev
   ```

5. If you want to contribute, be sure to use:
```bash
npm run dev:watch
```

For hot reloading in the backend of electron as well.

## Build the app

- **Windows**
```bash
npm run build:win
```

- **Linux**
```bash
npm run build:linux
```

- **Mac**
```bash
npm run build:mac
```


## Usage

- **Authentication:** Register and log in to manage your todos.
- **Task Management:** Create, update, mark as complete, and delete your tasks.
- **Real-time Updates:** Experience fast, real-time interactions powered by Electron.

## Contributing

Contributions are welcome! Please fork the repository and submit your pull requests. For major changes, open an issue first to discuss what you would like to change.

## License

Distributed under the MIT License. See the \`LICENSE\` file for more details.

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/selectron](https://github.com/yourusername/selectron)
