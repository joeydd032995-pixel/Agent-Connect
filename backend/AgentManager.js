class AgentManager {
  constructor() {
    this.agents = new Map();
    this.tasks = [];
    this.knowledgeBase = [];
    this.skillsRegistry = new Map();
  }

  registerAgent(agentData) {
    const agentId = 'agent_' + Date.now() + Math.random().toString(36).substr(2, 5);
    const agent = {
      id: agentId,
      type: agentData.type,
      name: agentData.name || agentData.type + ' Agent',
      status: 'connected',
      capabilities: this.getCapabilities(agentData.type),
      lastSeen: new Date(),
      config: agentData.config || {}
    };

    this.agents.set(agentId, agent);
    return agent;
  }

  getCapabilities(type) {
    const capabilities = {
      'manus.im': ['reasoning', 'decision-making', 'task-execution'],
      'goose': ['conversation', 'tool-execution', 'documentation'],
      'openclaw.ai': ['automation', 'data-processing', 'workflows']
    };
    return capabilities[type] || ['general-purpose'];
  }

  createTask(agentId, command) {
    const task = {
      id: 'task_' + Date.now(),
      agentId,
      command,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    this.tasks.push(task);
    // Simulate task execution
    setTimeout(() => {
      task.status = 'completed';
      task.result = `Executed: ${command}`;
    }, 1000);

    return task;
  }

  getAgentSummary() {
    return {
      totalAgents: this.agents.size,
      activeAgents: Array.from(this.agents.values()).filter(a => a.status === 'connected').length,
      agentTypes: Array.from(this.agents.values()).reduce((acc, agent) => {
        acc[agent.type] = (acc[agent.type] || 0) + 1;
        return acc;
      }, {})
    };
  }
}

module.exports = AgentManager;
