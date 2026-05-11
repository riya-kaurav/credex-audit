import { describe, it, expect } from 'vitest';

import { runAudit, getSavingsCategory, getRecommendationForTool } from '../src/lib/audit-engine';
import { FormData } from '../src/types';

describe('Audit Engine', () => {
  it('Team plan with single user gets downgraded', () => {
    // arrange
    const input = {
      tool: 'ChatGPT',
      plan: 'Team',
      monthlySpend: 30,
      seats: 1
    } as const;

    // act
    const result = getRecommendationForTool(
      input,
      1,
      'writing'
    );

    // assert
    expect(result.savingsAmount).toBeGreaterThan(0);

    expect(
      result.recommendedAction
    ).toContain('Switch');
  });

  it('Already on optimal plan returns zero savings', () => {
    // arrange
    const input = {
      tool: 'Cursor',
      plan: 'Pro',
      monthlySpend: 20,
      seats: 1
    } as const;

    // act
    const result = getRecommendationForTool(
      input,
      1,
      'coding'
    );

    // assert
    expect(result.savingsAmount).toBe(0);

    expect(
      result.recommendedAction
    ).toBe('No changes needed');
  });

  it('Expensive plan for use case gets downgraded', () => {
    // arrange
    const input = {
      tool: 'Claude',
      plan: 'Max',
      monthlySpend: 100,
      seats: 1
    } as const;

    // act
    const result = getRecommendationForTool(
      input,
      1,
      'writing'
    );

    // assert
    expect(result.savingsAmount).toBeGreaterThan(0);
  });

  it('Cursor + Copilot redundancy is flagged', () => {
    // arrange
    const formData: FormData = {
      teamSize: 1,
      useCase: 'coding',
      tools: [
        {
          tool: 'Cursor',
          plan: 'Pro',
          monthlySpend: 20,
          seats: 1
        },
        {
          tool: 'GitHub Copilot',
          plan: 'Pro',
          monthlySpend: 10,
          seats: 1
        }
      ]
    };

    // act
    const result = runAudit(formData);

    // assert
    const redundantRecommendation =
      result.recommendations.find(
        (recommendation) =>
          recommendation.recommendedAction
            .toLowerCase()
            .includes('redundant')
      );

    expect(
      redundantRecommendation
    ).toBeDefined();
  });

  it('Annual savings is exactly 12x monthly', () => {
    // arrange
    const formData: FormData = {
      teamSize: 1,
      useCase: 'writing',
      tools: [
        {
          tool: 'ChatGPT',
          plan: 'Team',
          monthlySpend: 30,
          seats: 1
        }
      ]
    };

    // act
    const result = runAudit(formData);

    // assert
    expect(
      result.totalAnnualSavings
    ).toBe(
      result.totalMonthlySavings * 12
    );
  });

 

  it('savingsCategory is "high" when savings exceed $500', () => {
    // act
    const result =
      getSavingsCategory(600);

    // assert
    expect(result).toBe('high');
  });

  it('savingsCategory is "optimal" for zero savings', () => {
    // act
    const result =
      getSavingsCategory(0);

    // assert
    expect(result).toBe('optimal');
  });
 
  it('Already on optimal plan returns zero savings', () => {
  const input = {
    tool: 'Cursor',
    plan: 'Pro',
    monthlySpend: 20,
    seats: 1
  } as const;

  const result = getRecommendationForTool(input, 1, 'coding');
  
  console.log('action:', result.recommendedAction);
  console.log('savings:', result.savingsAmount);
  console.log('reason:', result.reason);

  expect(result.savingsAmount).toBe(0);
});

});
