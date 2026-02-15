// Multi-Agent Control Hub - Complete Working Example

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory data store
const agents = [];
const tasks = [];

// Agent capabilities by type
const AGENT_CAPABILITIES = {
    'manus.im': ['reasoning', 'decision-making', 'problem-solving'],
    'goose': ['conversation', 'tool-execution', 'documentation'],
    'openclaw.ai': ['automation', 'data-processing', 'workflows']
};

// Health endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        agents: agents.length,
        tasks: tasks.length
    });
});

// Register agent
app.post('/api/agents', (req, res) => {
    const { type, name } = req.body;
    
    if (!type || !AGENT_CAPABILITIES[type]) {
        return res.status(400).json({
            error: 'Invalid agent type. Valid types: manus.im, goose, openclaw.ai'
        });
    }
    
    const agent = {
        id: 'agent_' + Date.now(),
        type,
        name: name || type + ' Agent',
        status: 'connected',
        capabilities: AGENT_CAPABILITIES[type],
        registeredAt: new Date().toISOString(),
        lastSeen: new Date().toISOString()
    };
    
    agents.push(agent);
    
    res.json({
        success: true,
        agent,
        message: `Agent ${agent.name} registered successfully`
    });
});

// Get all agents
app.get('/api/agents', (req, res) => {
    res.json({
        agents,
        total: agents.length,
        summary: {
            manus: agents.filter(a => a.type === 'manus.im').length,
            goose: agents.filter(a => a.type === 'goose').length,
            openclaw: agents.filter(a => a.type === 'openclaw.ai').length
        }
    });
});

// Send command to agent
app.post('/api/agents/:id/command', (req, res) => {
    const agentId = req.params.id;
    const { command } = req.body;
    
    const agent = agents.find(a => a.id === agentId);
    if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
    }
    
    const task = {
        id: 'task_' + Date.now(),
        agentId,
        agentName: agent.name,
        command,
        status: 'completed',
        result: `Command executed by ${agent.name}: ${command}`,
        timestamp: new Date().toISOString()
    };
    
    tasks.push(task);
    
    res.json({
        success: true,
        task,
        message: `Command sent to ${agent.name}`
    });
});

// Get recent tasks
app.get('/api/tasks', (req, res) => {
    res.json({
        tasks: tasks.slice(-10).reverse(),
        total: tasks.length
    });
});

// Agent connection test
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Multi-Agent Hub API is working!',
        endpoints: {
            'GET /health': 'Server health check',
            'GET /api/agents': 'List all agents',
            'POST /api/agents': 'Register new agent',
            'POST /api/agents/:id/command': 'Send command to agent',
            'GET /api/tasks': 'Get recent tasks'
        }
    });
});

app.listen(PORT, () => {
    console.log('🚀 Multi-Agent Control Hub API running on port ' + PORT);
    console.log('📊 Health check: http://localhost:' + PORT + '/health');
    console.log('🔌 Test endpoint: http://localhost:' + PORT + '/api/test');
    console.log('✅ Ready for agent connections');
});
