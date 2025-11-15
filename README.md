# Realtime Chat Frontend

A modern real-time chat web application built with React 18 and Vite, featuring instant messaging capabilities through WebSocket communication.

## Overview

This frontend application provides:
- User authentication and identity management
- Real-time bidirectional message transmission
- Live message feed with automatic updates
- Responsive user interface with message composition

## Tech Stack

- **React 18** - Component-based UI library
- **Vite** - Next-generation frontend build tool
- **Socket.IO Client** - WebSocket client library
- **CSS3** - Custom styling and responsive design

## Installation

```bash
# Clone the repository
git clone https://github.com/wendel211/realtime-chat-frontend.git

cd realtime-chat-frontend

# Install dependencies
npm install
```

## Running the Application

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
realtime-chat-frontend/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx      # Main chat interface
│   │   ├── MessageInput.jsx    # Message composition component
│   │   └── UserForm.jsx        # Username authentication form
│   ├── App.jsx                 # Root application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
└── package.json
```

## Configuration

### Backend Connection

The application connects to the backend server via Socket.IO:

```javascript
const socket = io("http://localhost:3001");
```

**Important**: Update the connection URL in `ChatWindow.jsx` if deploying to a different environment.

## Application Flow

### Connection Lifecycle

1. **Authentication**: User provides username through initial form
2. **Connection**: Application establishes WebSocket connection and emits `user_joined` event
3. **Message Transmission**: User messages trigger `send_message` event to server
4. **Message Reception**: Server broadcasts messages via `receive_message` to all connected clients
5. **Real-time Updates**: UI updates automatically upon receiving new messages

## User Interface Features

- **Username Input**: Initial authentication screen
- **Message Display**: Scrollable message history with automatic scroll-to-bottom
- **Message Composition**: Input field with send functionality
- **Message Attribution**: Visual distinction between user's own messages and others

## Roadmap

### Planned Features

- **User Presence**: Real-time online user list
- **Message Persistence**: Server-side message history storage
- **Enhanced UI**: Modern design system implementation
- **Production Deployment**: Cloud hosting setup (Vercel/Render)
- **Typing Indicators**: Real-time typing status
- **Read Receipts**: Message delivery confirmation

## Related Repositories

- **Backend Service**: [realtime-chat-backend](https://github.com/wendel211/realtime-chat-backend)

## License

This project is licensed under the MIT License.
