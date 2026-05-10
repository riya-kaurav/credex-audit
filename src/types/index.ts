
export type AITool =
  | 'ChatGPT'
  | 'Claude'
  | 'Cursor'
  | 'Gemini'
  | 'GitHub Copilot'
  | 'Windsurf'
  | 'Anthropic API'
  | 'OpenAI API'
  | 'Credex';

export type ToolPlan = string;

export type UseCase =
  | 'coding'
  | 'writing'
  | 'research'
  | 'data'
  | 'mixed';

export interface ToolInput {
  tool: AITool;
  plan: ToolPlan;
  monthlySpend: number;
  seats: number;
}

export interface FormData {
  tools: ToolInput[];
  teamSize: number;
  useCase: UseCase;
}

export interface ToolRecommendation {
  tool: AITool;
  currentSpend: number;
  recommendedAction: string;
  savingsAmount: number;
  reason: string;
}

export type SavingsCategory = 'high' | 'low' | 'optimal';

export interface AuditResult {
  recommendations: ToolRecommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsCategory: SavingsCategory;
  auditId: string;
  createdAt: string;
  isPublic: boolean;
}

export interface Lead {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
}

