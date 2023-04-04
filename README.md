# Global Chat App

A simple chat app that anyone can use. Built on a Next.js + tRPC template.

## Setup

### `pnpm install`

Install all dependencies by running this command from the root directory.

### `pnpm run env-var`

Fetch the environment variables from Vercel and store locally. Need the Vercel CLI installed first.

This provides access to the following:

- `MONGODB_URI` which is needed to connect to the database.
- `AWS_SECRET` which is required to access the AWS S3 bucket. Used for both read and write permissions.

### `pnpm run dev`

Run the app in development mode on port `3000`.
