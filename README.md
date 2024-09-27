# React + Redux Comments Application

This application is a simple React + Redux application that interacts with a comments API, allowing users to add, delete, and view comments.

## Features

- Fetch comments from an external API
- Display a list of comments
- Add new comments
- Delete existing comments
- Error handling for fetching and deleting comments
- Continuous integration (CI) setup using GitHub Actions
- Automatic deployment via Netlify

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **Redux Toolkit**: A library for efficient Redux development
- **React Testing Library**: A library for testing React components
- **TypeScript**: A typed superset of JavaScript for better tooling and reliability
- **GitHub Actions**: Automates the build and testing process using a CI/CD pipeline
- **Netlify**: Hosts and deploys the live application

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. Each time you push to the `main` branch or submit a pull request to `main`, the following steps are automatically triggered:

1. Install dependencies
2. Build the application
3. Run tests
4. Upload build artifacts

You can view the live application here: [Live App](https://lively-bunny-83771e.netlify.app/).

## Getting Started

Follow these instructions to set up your development environment:

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (comes with Node.js)

### Installation

1. Clone the repository: `git clone https://github.com/JIetForce/comments.git`
2. Install the dependencies: `npm install`

### Running the Application

To start the development server, run: `npm start`

Open your browser and navigate to `http://localhost:3000` to view the application.

### Running Tests

To run tests and generate a coverage report, execute the following command: `npm test -- --coverage`
