# Next.js Authentication

A full-stack Next.js application with authentication, utilizing MongoDB, JSON Web Tokens (JWT), and Nodemailer. 

## Features

- User Signup & Login
- User Profile Page
- Email Verification using Nodemailer
- Authentication persistence via HTTP-only cookies
- Password Hashing using `bcryptjs`
- Clean UI built with Tailwind CSS
- Fully Typed with TypeScript

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.
You will also need a MongoDB database (e.g., MongoDB Atlas or a local instance).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file at the root of the project.

Create a `.env` file based on the `env-sample.txt`:

```env
MONGO_URI=""
TOKEN_SECRET=""
DOMAIN="http://localhost:3000"
```

### Explanation of variables

- `MONGO_URI`: **Required**. Your MongoDB connection string. This is used by Mongoose to connect to your database cluster. If you're using MongoDB Atlas, it will look something like `mongodb+srv://<username>:<password>@cluster0...`
- `TOKEN_SECRET`: **Required**. A secure, random string used as the secret key to sign and verify JSON Web Tokens (JWT). These tokens are used for keeping users logged in securely. You can use any long random string for this.
- `DOMAIN`: **Required**. The base URL of your application. This is used when constructing absolute URLs, such as the verification link sent to a user's email during signup. During local development, this should be `http://localhost:3000`. In production, set this to your deployed domain (e.g., `https://your-domain.com`).

## Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the built application.
- `npm run lint`: Runs Biome linter across the codebase.
- `npm run format`: Runs Biome to format the codebase.
