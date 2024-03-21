# AI Prompt Project: Next.js, NextAuth.js & MongoDB Learning Journey

Welcome to Promptorium, where creativity seamlessly blends with technology. This web application, a craft of Next.js and MongoDB, invites AI enthusiasts, writers, learners, and thinkers into a world of endless possibilities. In Promptorium, you can unleash your creativity, discover new ideas, and share AI-generated prompts that not only inspire but also enhance learning and help in achieving various creative and intellectual endeavors.

AI writing prompts serve as a bridge between you and the AI tool, guiding it to produce precisely what you're looking for. These prompts are crucial in optimizing the AI platform, enabling it to process data quickly and efficiently. This, in turn, helps in extracting valuable insights and generating content that's not only engaging but also thought-provoking. Think of it as instructing a smart assistant to understand and execute your creative commands.

## 🚀 Quick Start

Embark on setting up this project on your local environment by following these simple steps.

### Essentials

Before diving in, ensure you have these tools installed on your system:

- Git
- Node.js
- npm (Node Package Manager)

### Setting Up the Project

Begin by creating a new directory for your project and initializing it with Git and npm:

```bash
mkdir project_next_14_ai_prompt_sharing
cd project_next_14_ai_prompt_sharing
git init
npm init -y

## Installation Process

Proceed with installing all necessary dependencies:
-`npm install next react react-dom mongoose next-auth`
-`npm install tailwindcss postcss autoprefixer`
-`npx tailwindcss init -p`

## Environment Configuration

Generate a .env file at the project's root and populate it as follows:

`NEXTAUTH_URL=http://localhost:3000`
`NEXTAUTH_URL_INTERNAL=http://localhost:3000`
`NEXTAUTH_SECRET=`
`GOOGLE_ID=`
`GOOGLE_CLIENT_SECRET=`
`MONGODB_URI=`

Fill in the blanks with your credentials obtained from Google Cloud Console, Cryptpool (for NEXTAUTH_SECRET), and MongoDB Atlas.
For Google OAuth, visit [Google Cloud Console](https://console.cloud.google.com/) to create a new project and obtain your client ID and secret.

## Connecting to MongoDB

To ensure a successful connection to your database, you need to configure the `MONGODB_URI` in your `.env` file. This URI is essential for storing user data and enabling NextAuth.js functionality in your project. Here's how to set it up:

1. **Obtaining MONGODB_URI**:

   - For cloud-based MongoDB services, you can use MongoDB Atlas at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Create a new cluster and follow the instructions to get your connection string.
   - Alternatively, you can set up a local MongoDB server if you prefer working offline.

2. **Setting Up MONGODB_URI**:
   - Replace `<password>` in the provided URI with your actual password. Ensure there are no `<` or `>` symbols in your `.env` file.
   - Example Format: `MONGODB_URI=mongodb+srv://username:password@cluster-url/test?retryWrites=true&w=majority`

## Configuring NEXTAUTH_SECRET

The `NEXTAUTH_SECRET` is a vital security measure used to encrypt cookies and tokens in your application. Here's how to generate and set it:

1. **Generating a Random String**:

   - You can generate a random string using OpenSSL in your terminal: `openssl rand -base64 32`.

2. **Setting NEXTAUTH_SECRET**:
   - Add the generated string to your `.env` file as `NEXTAUTH_SECRET=<your-generated-string>`.

For more information on NextAuth.js configuration, visit their [official documentation](https://next-auth.js.org/configuration/options).

## Launching the Project

To start the project, run: -`npm run dev`
Access it at http://localhost:3000 in your web browser.

## 🌐 Useful Snippets

Here are some key files to check out:

-`globals.css`: Global styles and Tailwind CSS setup. -`jsconfig.json`: Simplifies import paths in your JavaScript/TypeScript files. -`route.js`: Includes API routes for managing prompts and user data. -`tailwind.config.js`: Configuration for Tailwind CSS. -`user.js` & `prompt.js`: Mongoose models for users and prompts.

## 🔗 Resources & Assets

The foundation of this project was built from `www.jsmastery.pro/ultimate-next-course`
Next.js Official Documentation `https://nextjs.org/docs`
Google OAuth with NextAuth.js Documentation `https://next-auth.js.org/providers/google'

## 📚 Features Added By Me

1.  Search Bar for searching prompts based on: -`prompt` -`tag` -`username`
2.  Category Filter for 'tag', 'username', 'prompt'
3.  Clickable tags redirecting to a page with all prompts associated with that tag.
4.  Profile viewing feature allowing users to view others' profiles by clicking on the profile picture or email, leading to a unique URL (e.g., profile/id/username).

## 📚 Learning Journey

This project is a learning endeavor to deepen my understanding of Next.js, NextAuth and MongoDB, exploring server-side rendering, API routes, authentication, and foray into non-relational `NoSQL` database coming from PostgreSQL.
```
