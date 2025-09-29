# AnonChat - Real-time Chat Application

A real-time anonymous chat application built with Socket.IO, Express, and Tailwind CSS.

## Features

- Real-time messaging with Socket.IO
- Color-coded user messages for easy identification
- User count tracking with live updates
- Typing indicators
- Connection status notifications
- Mobile-responsive design
- Automatic reconnection with fallback options
- Persistent user colors

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