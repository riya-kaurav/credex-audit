import { AITool, UseCase } from '@/types';

export const AI_TOOLS: AITool[] = [
  'ChatGPT',
  'Claude',
  'Cursor',
  'Gemini',
  'GitHub Copilot',
  'Windsurf',
  'OpenAI API',
  'Anthropic API',
];

export const TOOL_PLANS: Record<AITool, string[]> = {
  ChatGPT: ['Free', 'Go', 'Plus', 'Pro', 'Team', 'Enterprise'],
  Claude: ['Free', 'Pro', 'Max', 'Team Standard', 'Team Premium', 'Enterprise', 'API Direct'],
  Cursor: ['Hobby', 'Pro', 'Pro+', 'Ultra'],
  Gemini: ['Free', 'Pro', 'Business', 'Enterprise'],
  'GitHub Copilot': ['Free', 'Pro', 'Business', 'Enterprise'],
  Windsurf: ['Free', 'Pro', 'Max'],
  'OpenAI API': ['Usage Based'],
  'Anthropic API': ['Usage Based'],
  Credex: [],
};

export const USE_CASES: { value: UseCase; label: string }[] = [
  { value: 'coding', label: 'Coding & Development' },
  { value: 'writing', label: 'Writing & Content' },
  { value: 'research', label: 'Research & Analysis' },
  { value: 'data', label: 'Data & Analytics' },
  { value: 'mixed', label: 'Mixed / General' },
];