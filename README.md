# AnonChat - Real-time Chat Application

A real-time chat application built with Socket.IO, Express, and Tailwind CSS.

## Features

- Real-time messaging
- Color-coded user messages
- Responsive design with Tailwind CSS
- Automatic reconnection

## Setup

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
4. Run the development server:
   ```
   npm start
   ```

### Environment Variables

- `PORT`: The port on which the server will run (default: 3000)
- `NODE_ENV`: The environment (development, production)

### Vercel Deployment

When deploying to Vercel, add the following environment variable:

- `PORT`: The port on which the server will run (usually set by Vercel automatically)

## License

MIT