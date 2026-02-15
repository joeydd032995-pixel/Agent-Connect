const express = require('express');
const cors = require('cors');
const AgentManager = require('./AgentManager');

const app = express();
const PORT = 3001;
const agentManager = new AgentManager();

app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    agentSummary: agentManager.getAgentSummary()
  });
});

// Get all agents
app.get('/api/agents', (req, res) => {
  res.json({
    agents: Array.from(agentManager.agents.values()),
    summary: agentManager.getAgentSummary()
  });
});

// Register new agent
app.post('/api/agents', (req, res) => {
  const agentData = req.body;
  try {
    const agent = agentManager.registerAgent(agentData);
    res.json({
      success: true,
      agent,
      message: `Agent ${agent.name} registered successfully`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Send command to agent
app.post('/api/agents/:id/command', (req, res) => {
  const agentId = req.params.id;
  const { command } = req.body;

  if (!agentManager.agents.has(agentId)) {
    return res.status(404).json({
      success: false,
      error: 'Agent not found'
    });
  }

  const task = agentManager.createTask(agentId, command);
  res.json({
    success: true,
    task,
    message: 'Command sent to agent'
  });
});

// Get recent tasks
app.get('/api/tasks', (req, res) => {
  res.json({
    tasks: agentManager.tasks.slice(-10).reverse(),
    total: agentManager.tasks.length
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Multi-Agent Control Hub Backend running on port ${PORT}`);
  console.log('📊 API endpoints available:');
  console.log('  GET  /health - Server health check');
  console.log('  GET  /api/agents - List all agents');
  console.log('  POST /api/agents - Register new agent');
  console.log('  POST /api/agents/:id/command - Send command');
  console.log('  GET  /api/tasks - Get recent tasks');
});
