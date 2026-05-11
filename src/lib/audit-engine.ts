
import {
  AuditResult,
  FormData,
  SavingsCategory,
  ToolInput,
  ToolRecommendation,
  UseCase
} from '../types';

import {
  PRICING_DATA,
  ToolConfig,
  ToolPlanConfig
} from './pricing-data';

// Get current selected plan config
function getCurrentPlan(
  tool: ToolInput['tool'],
  planName: string
): ToolPlanConfig | undefined {
  return PRICING_DATA[tool].plans.find(
    (plan) => plan.name === planName
  );
}

// Calculate monthly cost
function calculateMonthlyCost(
  pricePerSeat: number,
  seats: number
): number {
  return pricePerSeat * seats;
}

// Find cheapest valid plan for team size + use case
function findCheapestValidPlan(
  toolConfig: ToolConfig,
  teamSize: number,
  useCase: UseCase
): ToolPlanConfig | undefined {
  const validPlans = toolConfig.plans.filter((plan) => {
    const satisfiesMinSeats =
      teamSize >= plan.minSeats;

    const satisfiesMaxSeats =
      !plan.maxSeats ||
      teamSize <= plan.maxSeats;

    const supportsUseCase =
      plan.bestFor.includes(useCase);

      const isPaid = plan.pricePerSeat > 0;

    return (
      satisfiesMinSeats &&
      satisfiesMaxSeats &&
      supportsUseCase &&
      isPaid
    );
  });

  return validPlans.sort(
    (a, b) =>
      a.pricePerSeat - b.pricePerSeat
  )[0];
}

// Savings category helper
export function getSavingsCategory(
  totalMonthlySavings: number
): SavingsCategory {
  if (totalMonthlySavings === 0) {
    return 'optimal';
  }

  if (totalMonthlySavings > 500) {
    return 'high';
  }

  return 'low';
}

// Single tool recommendation engine
export function getRecommendationForTool(
  input: ToolInput,
  teamSize: number,
  useCase: UseCase
): ToolRecommendation {
  const toolConfig = PRICING_DATA[input.tool];

  const currentPlan = getCurrentPlan(
    input.tool,
    input.plan
  );

  if (!currentPlan) {
    return {
      tool: input.tool,
      currentSpend: input.monthlySpend,
      recommendedAction:
        'No changes needed',
      savingsAmount: 0,
      reason:
        'Unable to validate current plan pricing.'
    };
  }

  // User-entered spend is source of truth
  const currentSpend =
    input.monthlySpend;


  // Check 1 — Invalid team sizing
  const isTeamPlan =
    currentPlan.minSeats > 1;

  if (
    isTeamPlan &&
    input.seats < currentPlan.minSeats
  ) {
    const individualPlan =
      toolConfig.plans.find(
        (plan) =>
          plan.minSeats === 1 &&
          plan.pricePerSeat > 0
      );

    if (individualPlan) {
      const recommendedSpend =
        calculateMonthlyCost(
          individualPlan.pricePerSeat,
          input.seats
        );

      const savings = Math.max(
        0,
        currentSpend - recommendedSpend
      );

      return {
        tool: input.tool,
        currentSpend,
        recommendedAction: `Switch from ${currentPlan.name} to ${individualPlan.name}`,
        savingsAmount: savings,
        reason: `At ${input.seats} seat${
          input.seats > 1 ? 's' : ''
        }, ${input.tool} ${
          currentPlan.name
        } requires a minimum of ${
          currentPlan.minSeats
        } seats. ${
          individualPlan.name
        } costs $${
          individualPlan.pricePerSeat
        }/seat, reducing estimated spend from $${currentSpend} to $${recommendedSpend} per month.`
      };
    }
  }

  // Check 2 — Cheaper valid plan
  const cheaperPlan =
    findCheapestValidPlan(
      toolConfig,
      teamSize,
      useCase
    );

  if (
    cheaperPlan &&
    cheaperPlan.name !==
      currentPlan.name &&
    cheaperPlan.pricePerSeat <
      currentPlan.pricePerSeat
  ) {
    const cheaperSpend =
      calculateMonthlyCost(
        cheaperPlan.pricePerSeat,
        input.seats
      );

    const savings = Math.max(
      0,
      currentSpend - cheaperSpend
    );

    if (savings > 0) {
      return {
        tool: input.tool,
        currentSpend,
        recommendedAction: `Downgrade from ${currentPlan.name} to ${cheaperPlan.name}`,
        savingsAmount: savings,
        reason: `${input.tool} ${
          currentPlan.name
        } costs $${
          currentPlan.pricePerSeat
        }/seat while ${
          cheaperPlan.name
        } costs $${
          cheaperPlan.pricePerSeat
        }/seat for a ${useCase} workflow. At ${
          input.seats
        } seats, this reduces estimated spend from $${currentSpend}/month to $${cheaperSpend}/month while still supporting the team's use case.`
      };
    }
  }

  // Check 3 — Wrong tool for use case
  const codingAssistants = [
    'Cursor',
    'GitHub Copilot',
    'Windsurf'
  ];

  const conversationalAI = [
    'ChatGPT',
    'Claude',
    'Gemini'
  ];

  // Writing use case with coding assistants
  if (
    useCase === 'writing' &&
    codingAssistants.includes(
      input.tool
    )
  ) {
    return {
      tool: input.tool,
      currentSpend,
      recommendedAction:
        'Review necessity of coding assistant',
      savingsAmount: 0,
      reason: `${input.tool} is primarily optimized for software development workflows. For writing-focused teams, this tool may be unnecessary unless engineering workflows are also part of the team's daily operations.`
    };
  }

  // Coding use case with expensive conversational AI tiers
  if (
    useCase === 'coding' &&
    conversationalAI.includes(
      input.tool
    ) &&
    currentPlan.pricePerSeat >= 100
  ) {
    const fallbackPlan =
      toolConfig.plans.find(
        (plan) =>
          plan.pricePerSeat > 0 &&
          plan.pricePerSeat <
            currentPlan.pricePerSeat
      );

    if (fallbackPlan) {
      const fallbackSpend =
        calculateMonthlyCost(
          fallbackPlan.pricePerSeat,
          input.seats
        );

      const savings = Math.max(
        0,
        currentSpend - fallbackSpend
      );

      return {
        tool: input.tool,
        currentSpend,
        recommendedAction: `Downgrade to ${fallbackPlan.name}`,
        savingsAmount: savings,
        reason: `${input.tool} ${
          currentPlan.name
        } is a premium-tier subscription costing $${
          currentPlan.pricePerSeat
        }/seat. For coding assistance, ${
          fallbackPlan.name
        } provides sufficient functionality at $${
          fallbackPlan.pricePerSeat
        }/seat, potentially reducing spend by $${savings}/month.`
      };
    }
  }

  // Already optimal
  return {
    tool: input.tool,
    currentSpend,
    recommendedAction:
      'No changes needed',
    savingsAmount: 0,
    reason:
      'You are on the right plan for your team size and use case.'
  };
}

// Main audit runner
export function runAudit(
  formData: FormData
): AuditResult {
  const recommendations: ToolRecommendation[] =
    [];

  // Run single-tool recommendations
  for (const tool of formData.tools) {
    const recommendation =
      getRecommendationForTool(
        tool,
        formData.teamSize,
        formData.useCase
      );

    recommendations.push(
      recommendation
    );
  }

  // Redundancy check — Cursor + Copilot
  const hasCursor =
    formData.tools.some(
      (tool) => tool.tool === 'Cursor'
    );

  const hasCopilot =
    formData.tools.some(
      (tool) =>
        tool.tool ===
        'GitHub Copilot'
    );

  if (
    formData.useCase === 'coding' &&
    hasCursor &&
    hasCopilot
  ) {
    const copilotIndex =
      recommendations.findIndex(
        (recommendation) =>
          recommendation.tool ===
          'GitHub Copilot'
      );

    const copilotTool =
      formData.tools.find(
        (tool) =>
          tool.tool ===
          'GitHub Copilot'
      );

    if (
      copilotIndex !== -1 &&
      copilotTool
    ) {
      recommendations[
        copilotIndex
      ] = {
        tool: 'GitHub Copilot',
        currentSpend:
          copilotTool.monthlySpend,
        recommendedAction:
          'Remove redundant coding assistant',
        savingsAmount:
          copilotTool.monthlySpend,
        reason:
          'Cursor and GitHub Copilot both provide AI coding assistance, inline completions, and developer workflows. Maintaining both subscriptions creates overlapping spend for similar functionality. Consolidating to a single coding assistant could reduce monthly software costs.'
      };
    }
  }

  // Redundancy check — ChatGPT + Claude
  const hasChatGPT =
    formData.tools.some(
      (tool) =>
        tool.tool === 'ChatGPT'
    );

  const hasClaude =
    formData.tools.some(
      (tool) =>
        tool.tool === 'Claude'
    );

  if (
    ['writing', 'mixed'].includes(
      formData.useCase
    ) &&
    hasChatGPT &&
    hasClaude
  ) {
    const claudeIndex =
      recommendations.findIndex(
        (recommendation) =>
          recommendation.tool ===
          'Claude'
      );

    const claudeTool =
      formData.tools.find(
        (tool) =>
          tool.tool === 'Claude'
      );

    if (
      claudeIndex !== -1 &&
      claudeTool
    ) {
      recommendations[
        claudeIndex
      ] = {
        tool: 'Claude',
        currentSpend:
          claudeTool.monthlySpend,
        recommendedAction:
          'Review overlapping AI assistant subscriptions',
        savingsAmount: 0,
        reason:
          'ChatGPT and Claude provide highly overlapping capabilities for writing, brainstorming, and general knowledge workflows. Many teams standardize on a single conversational AI platform to simplify procurement and reduce duplicated tooling.'
      };
    }
  }

  // Calculate savings
  const totalMonthlySavings =
    recommendations.reduce(
      (sum, recommendation) =>
        sum +
        recommendation.savingsAmount,
      0
    );

  const totalAnnualSavings =
    totalMonthlySavings * 12;

  // Total spend
  const totalMonthlySpend =
    formData.tools.reduce(
      (sum, tool) =>
        sum + tool.monthlySpend,
      0
    );

  // Credex recommendation
  if (totalMonthlySpend > 200) {
    recommendations.push({
      tool: 'Credex',
      currentSpend: 0,
      recommendedAction:
        'Evaluate consolidated AI billing',
      savingsAmount: 0,
      reason:
        'Your AI tooling spend exceeds $200/month. Platforms like Credex may provide discounted prepaid AI credits, centralized billing, or negotiated enterprise pricing opportunities.'
    });
  }

  return {
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings,
    savingsCategory:
      getSavingsCategory(
        totalMonthlySavings
      ),
    auditId: crypto.randomUUID(),
    createdAt:
      new Date().toISOString(),
    isPublic: false
  };
}