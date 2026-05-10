/**
 * PRICING_DATA.md source
 * All prices in USD, per seat per month
 * Last verified: 2026-05-08
 * See SOURCE_URLS for individual verification links
 */



import { AITool, UseCase } from '@/types';

export interface ToolPlanConfig {
  name: string;
  pricePerSeat: number;
  currency: 'USD';
  minSeats: number;
  maxSeats?: number;
  features: string[];
  bestFor: UseCase[];
}

export interface ToolConfig {
  name: AITool;
  plans: ToolPlanConfig[];
}

export const PRICING_DATA: Record<AITool, ToolConfig> = {
  ChatGPT: {
    name: 'ChatGPT',
    plans: [
      {
        name: 'Free',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Limited GPT access',
          'Basic image generation',
          'Limited uploads and research'
        ],
        bestFor: ['writing', 'research']
      },
      {
        name: 'Go',
        pricePerSeat: 5,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Expanded GPT access',
          'Longer memory',
          'More uploads and image creation'
        ],
        bestFor: ['writing', 'research', 'mixed']
      },
      {
        name: 'Plus',
        pricePerSeat: 24,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Advanced reasoning models',
          'Custom GPTs and projects',
          'Expanded deep research'
        ],
        bestFor: ['coding', 'research', 'writing', 'mixed']
      },
      {
        name: 'Pro',
        pricePerSeat: 128,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Maximum usage limits',
          'Priority access to new features',
          'Expanded Codex usage'
        ],
        bestFor: ['coding', 'research', 'data']
      },
      {
        name: 'Team',
        pricePerSeat: 30, // monthly biling
        currency: 'USD',
        minSeats: 2,
        features: [
          'Shared workspace',
          'Team collaboration',
          'Admin controls'
        ],
        bestFor: ['coding', 'writing', 'mixed']
      },
      {
        name: 'Enterprise',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 150,
        features: [
          'Custom enterprise pricing',
          'Advanced security and compliance',
          'Unlimited enterprise usage'
        ],
        bestFor: ['coding', 'research', 'data', 'mixed']
      },
          {
  name: 'API Direct',
  pricePerSeat: 0,
  currency: 'USD',    
  minSeats: 1,
  features: [
    'Usage-based API pricing',
    'Direct OpenAI API access',
    'No fixed monthly subscription'
  ],
  bestFor: ['coding', 'data', 'research']
}
    ]
  },

  Claude: {
    name: 'Claude',
    plans: [
      {
        name: 'Free',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Web and mobile chat',
          'Built-in web search',
          'Basic coding and analysis'
        ],
        bestFor: ['writing', 'research']
      },
      {
        name: 'Pro',
        pricePerSeat: 20,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Claude Code access',
          'Higher usage limits',
          'Memory across conversations'
        ],
        bestFor: ['coding', 'writing', 'research']
      },
      {
        name: 'Max',
        pricePerSeat: 100,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Priority access',
          'Higher usage limits',
          'Advanced reasoning capacity'
        ],
        bestFor: ['coding', 'research', 'data']
      },
      {
        name: 'Team Standard',
        pricePerSeat: 20,
        currency: 'USD',
        minSeats: 2,
        maxSeats: 150,
        features: [
          'Central billing',
          'SSO and admin controls',
          '200K context window'
        ],
        bestFor: ['coding', 'writing', 'mixed']
      },
      {
        name: 'Team Premium',
        pricePerSeat: 100,
        currency: 'USD',
        minSeats: 5,
        maxSeats: 150,
        features: [
          '5x more usage',
          'Enterprise search',
          'Slack and Microsoft 365 integrations'
        ],
        bestFor: ['research', 'data', 'mixed']
      },
      {
        name: 'Enterprise',
        pricePerSeat: 20,
        currency: 'USD',
        minSeats: 20,
        features: [
          'Pooled usage pricing',
          'Advanced compliance controls',
          '500K context window'
        ],
        bestFor: ['coding', 'research', 'data', 'mixed']
      },
       {
  name: 'API Direct',
  pricePerSeat: 0,
  currency: 'USD',
  minSeats: 1,
  features: [
    'Usage-based API pricing',
    'Direct Claude API access',
    'No fixed monthly subscription'
  ],
  bestFor: ['coding', 'research', 'data']
}
    ]
  },

  Cursor: {
    name: 'Cursor',
    plans: [
      {
        name: 'Hobby',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Limited agent requests',
          'Limited tab completions',
          'No credit card required'
        ],
        bestFor: ['coding']
      },
      {
        name: 'Pro',
        pricePerSeat: 20,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Frontier model access',
          'Cloud agents',
          'MCPs and skills'
        ],
        bestFor: ['coding']
      },
      {
        name: 'Pro+',
        pricePerSeat: 60,
        currency: 'USD',
        minSeats: 1,
        features: [
          '3x model usage',
          'Extended agent limits',
          'Higher Claude and GPT usage'
        ],
        bestFor: ['coding', 'research']
      },
      {
        name: 'Ultra',
        pricePerSeat: 200,
        currency: 'USD',
        minSeats: 1,
        features: [
          '20x model usage',
          'Priority feature access',
          'Maximum usage limits'
        ],
        bestFor: ['coding', 'data']
      }
    ]
  },

  'GitHub Copilot': {
    name: 'GitHub Copilot',
    plans: [
      {
        name: 'Free',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Basic completions',
          'Limited chat requests',
          'CLI access'
        ],
        bestFor: ['coding']
      },
      {
        name: 'Pro',
        pricePerSeat: 10,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Unlimited inline suggestions',
          'Code review support',
          'Access to multiple AI models'
        ],
        bestFor: ['coding']
      },
      {
        name: 'Business',
        pricePerSeat: 19,
        currency: 'USD',
        minSeats: 2,
        features: [
          'Organization policy controls',
          'Enterprise proxy support',
          'Admin management'
        ],
        bestFor: ['coding', 'mixed']
      },
      {
        name: 'Enterprise',
        pricePerSeat: 39,
        currency: 'USD',
        minSeats: 5,
        features: [
          'Advanced security',
          'Enterprise governance',
          'Organization-wide deployment'
        ],
        bestFor: ['coding', 'data']
      }
    ]
  },

  Gemini: {
    name: 'Gemini',
    plans: [
      {
        name: 'Free',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Limited model access',
          'Google AI Studio access',
          'Free input and output tokens'
        ],
        bestFor: ['research', 'writing']
      },
      {
        name: 'Pro',
        pricePerSeat: 20,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Higher model limits',
          'Advanced Gemini models',
          'Improved reasoning performance'
        ],
        bestFor: ['research', 'writing', 'mixed']
      },
      {
        name: 'Business',
        pricePerSeat: 30,
        currency: 'USD',
        minSeats: 2,
        features: [
          'Higher production rate limits',
          'Context caching',
          'Batch API access'
        ],
        bestFor: ['coding', 'data', 'research']
      },
      {
        name: 'Enterprise',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 20,
        features: [
          'Dedicated support',
          'Advanced compliance',
          'Provisioned throughput'
        ],
        bestFor: ['data', 'research', 'mixed']
      }
    ]
  },

  Windsurf: {
    name: 'Windsurf',
    plans: [
      {
        name: 'Free',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Light coding quotas',
          'Unlimited inline edits',
          'Unlimited tab completions'
        ],
        bestFor: ['coding']
      },
      {
        name: 'Pro',
        pricePerSeat: 20,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Frontier model access',
          'Devin Cloud sessions',
          'Full model availability'
        ],
        bestFor: ['coding', 'research']
      },
      {
        name: 'Max',
        pricePerSeat: 200,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Significantly higher quotas',
          'Advanced cloud development',
          'Premium model access'
        ],
        bestFor: ['coding', 'data']
      }
    ]
  },

  'OpenAI API': {
    name: 'OpenAI API',
    plans: [
      {
        name: 'Usage Based',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Pay per token usage',
          'API integration for applications',
          'No fixed monthly seat pricing'
        ],
        bestFor: ['coding', 'data', 'research']
      }
    ]
  },

  'Anthropic API': {
    name: 'Anthropic API',
    plans: [
      {
        name: 'Usage Based',
        pricePerSeat: 0,
        currency: 'USD',
        minSeats: 1,
        features: [
          'Pay per token usage',
          'Claude API integration',
          'No fixed monthly seat pricing'
        ],
        bestFor: ['coding', 'research', 'data']
      }
    ]
  },
         Credex: {
  name: 'Credex',
  plans: [
    {
      name: 'Advisory',
      pricePerSeat: 0,
      currency: 'USD',
      minSeats: 1,
      features: [
        'AI procurement optimization',
        'Centralized AI billing',
        'Discounted prepaid credits'
      ],
      bestFor: [
        'coding',
        'writing',
        'research',
        'data',
        'mixed'
      ]
    }
  ]
}
};

export const SOURCE_URLS = {
  ChatGPT: {
    url: 'https://openai.com/chatgpt/pricing',
    verifiedDate: '2026-05-08'
  },

  Claude: {
    url: 'https://claude.ai/pricing',
    verifiedDate: '2026-05-08'
  },

  Cursor: {
    url: 'https://cursor.com/pricing',
    verifiedDate: '2026-05-08'
  },

  'GitHub Copilot': {
    url: 'https://github.com/features/copilot',
    verifiedDate: '2026-05-08'
  },

  Gemini: {
    url: 'https://ai.google.dev/gemini-api/docs/pricing',
    verifiedDate: '2026-05-08'
  },

  Windsurf: {
    url: 'https://windsurf.com/pricing',
    verifiedDate: '2026-05-08'
  },

  'OpenAI API': {
    url: 'https://platform.openai.com/docs/pricing',
    verifiedDate: '2026-05-08'
  },

  'Anthropic API': {
    url: 'https://www.anthropic.com/pricing#api',
    verifiedDate: '2026-05-08'
  }
} as const;
