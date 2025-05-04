# ✨ Orkut Social App (Next.js) ✨

This is a web application built with Next.js, inspired by social platforms like Orkut. It allows users to sign up, log in, post messages, view a feed, like messages, and manage their profile. 🚀

## ⚙️ How It Works

The application uses the Next.js App Router structure.

* **🖥️ Frontend:** Built with React and styled using Tailwind CSS. Components handle UI elements like the tweet feed, individual tweet cards, login/signup forms, profile pages, etc. Client-side logic interacts with the backend API to fetch data and perform actions.
* **🔩 Backend (API):** Implemented using Next.js Route Handlers within the `src/app/api/` directory. These handlers define endpoints for various actions.
* **🔒 Authentication:** Handled by NextAuth.js using a Credentials provider (email/password). Session management uses JWTs, secured by the `NEXTAUTH_SECRET`.
* **💾 Database:** Prisma acts as the ORM (Object-Relational Mapper) to interact with the database. It defines the schema (User, Tweet, Like, Comment, Follow) and provides tools for database migrations and queries. The database itself is likely PostgreSQL.

## ➡️ Data Flow / User Experience

This section describes the typical journey a user takes through the application:

1.  **🔑 Authentication:**
    * A new visitor typically lands on the login page.
    * If they don't have an account, they can navigate to the Sign Up page to register (`Create` User operation ✨).
    * After signing up, or if they already have an account, they Log In using their credentials (`Read` User operation for verification ✔️). NextAuth.js handles session creation.
2.  **📰 Core Interaction (Logged In):**
    * Upon successful login, the user is usually directed to the main feed.
    * **Feed:** The user can view a list of recent tweets from various users (`Read` Tweet operation 👀).
    * **Tweeting:** The user can create their own tweets using a text input/form (`Create` Tweet operation ✍️). The new tweet appears in the feed.
    * **Tweet Management:** Users can delete their own tweets (`Delete` Tweet operation 🗑️).
    * **Liking:** Users can like or unlike any tweet in the feed (`Create`/`Delete` Like operation ❤️).
3.  **👤 Profile Management:**
    * Users can navigate to their profile page (`Read` User operation).
    * They can edit their profile information, such as adding or updating their bio, name, or profile picture (`Update` User operation ✏️).
4.  **🔔 Notifications:**
    * The notification section allows users to see who has liked their tweets (`Read` Like operation 👍).
    * It also shows mentions where other users have tagged them in tweets (`Read` Tweet operation 🗣️).
5.  **⚙️ Settings:**
    * In the settings area, users can change their account password (`Update` User operation 🔐).
    * Users also have the option to permanently delete their account and all associated data (`Delete` User operation ❌).
6.  **👋 Logout:**
    * Users can log out of their account, which clears their session via NextAuth.js.

The application demonstrates **CRUD (Create ➕, Read 👀, Update 🔄, Delete ❌)** operations for key entities like Users and Tweets through these user interactions, managed via API requests to the Next.js backend and interactions with the Prisma ORM and the database.

## ✅ Features

* **🔑 User Authentication:**
    * Sign Up (`/api/auth/signup`)
    * Log In (`/api/auth/login` & NextAuth Credentials)
    * Session Management
* **🐦 Tweets:**
    * Create Tweets (`POST /api/tweets`)
    * View Tweet Feed (`GET /api/tweets`)
    * Delete Own Tweets (`DELETE /api/tweets/[id]`)
    * View Tweets tagging a user (`GET /api/tweets/tagged?username=...`)
* **❤️ Interactions:**
    * Like / Unlike Tweets (`POST /api/tweets/[id]/like`)
    * View Like Notifications (`GET /api/tweets/liked`)
    * *💬 Comment functionality modeled*
    * *➕ Follow functionality modeled*
* **👤 User Profiles:**
    * View Profile (`GET /api/profile`)
    * Update Profile (`PUT /api/profile`)
    * Change Password (`POST /api/change-password`)
    * Delete Account (`DELETE /api/user/[id]`)
* **🔧 Debugging:**
    * Database Connection Check (`GET /api/debug`)
    * Environment Variable Check (`GET /api/debug/env`)

## 💻 Technologies Used

* **Framework:** [Next.js](https://nextjs.org/) (v15.3.1, App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/) (v4.24.11) - Credentials Provider
* **Database ORM:** [Prisma](https://www.prisma.io/) (v6.6.0)
* **Database:** [PostgreSQL](https://www.postgresql.org/) 🐘
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) 🎨
* **Password Hashing:** [bcryptjs](https://github.com/dcodeIO/bcrypt.js) 🔒
* **UI:** [React](https://reactjs.org/) (v19), [React DOM](https://reactjs.org/docs/react-dom.html) (v19)
* **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) ✨
* **Date Formatting:** [date-fns](https://date-fns.org/) 📅
* **Linting/Formatting:** ESLint, Prettier
* **Deployment:** Vercel ▲

## 🚀 Getting Started

### Prerequisites 🔧

* Node.js (>= 18.18 recommended for Next.js 15)
* npm, yarn, pnpm, or bun
* Access to a PostgreSQL database instance.

### Installation & Setup 📦

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install, pnpm install, bun install
    ```

3.  **Set up environment variables:** ⚙️
    * Create a file named `.env` in the root of the project.
    * Add the following variables, replacing the placeholder values:
        ```env
        # Example .env file
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public" # Your PostgreSQL connection string
        NEXTAUTH_SECRET="YOUR_VERY_STRONG_RANDOM_SECRET_HERE" # Generate with: openssl rand -base64 32
        NEXTAUTH_URL="http://localhost:3000" # For development
        ```

4.  **Apply database migrations:** 🛠️
    * Ensure your database server is running and accessible.
    * Run Prisma migrations:
        ```bash
        npx prisma migrate dev
        ```
    * (Optional) Seed the database: `npx prisma db seed` (if you create a seed script).

### Running the Development Server ▶️

1.  **Start the server:**
    ```bash
    npm run dev
    # or yarn dev, pnpm dev, bun dev
    ```

2.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deployment

This application is configured for deployment on [Vercel](https://vercel.com).

1.  Connect your Git repository to Vercel.
2.  Configure the Environment Variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` - set to your production URL) in the Vercel project settings. 🔑
3.  Ensure the build command (`npm run build`) runs successfully.
4.  Vercel will handle the deployment! 🎉 Make sure your database is accessible from Vercel.