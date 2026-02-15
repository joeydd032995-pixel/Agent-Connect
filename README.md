# Multi-Agent Control Hub

A centralized mobile control hub for managing Manus.im, Goose, and OpenClaw.ai AI agents.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/joeydd032995-pixel/Agent-Connect.git
cd Agent-Connect

# Install dependencies
npm install

# Start the backend server
node example-server.js

# Open frontend/index.html in your web browser
```

## 📋 Features

- **Multi-agent instance management** - Launch/manage multiple AI agents
- **Real-time communication** - Bidirectional command execution
- **Mobile-responsive interface** - Works on iOS/Android/web
- **REST API** - Programmatic agent control
- **Task tracking** - Monitor command execution

## 🔧 Technology Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Communication**: REST API
- **Mobile**: Responsive design

## 📊 API Endpoints

- `GET /health` - System health check
- `GET /api/agents` - List registered agents
- `POST /api/agents` - Register new agent
- `POST /api/agents/:id/command` - Send command to agent
- `GET /api/tasks` - Get task history

## 🤖 Supported Agents

- **Manus.im** - Reasoning and decision-making
- **Goose** - Conversation and tool execution
- **OpenClaw.ai** - Automation and workflows

## 📱 Mobile Deployment

The interface is optimized for:
- iOS Safari
- Android Chrome
- Progressive Web App (PWA) support

## 🚀 Deployment

### DigitalOcean/Vercel Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Manual Deployment
1. Upload files to your server
2. Install Node.js dependencies
3. Start backend server
4. Serve frontend files

## 🔧 Development

### Local Development
```bash
# Start development server
npm run dev

# Test the API
node test-api.js
```

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Contact: joeydd032995@gmail.com

## 📄 License

MIT License - See LICENSE file for details.

---

**Built with ❤️ by Goose AI Development Team**
