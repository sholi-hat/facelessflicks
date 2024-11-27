import { StabilityConfig } from './types';
import { getEnvVariable } from '../env';

export const stabilityConfig: StabilityConfig = {
  apiKey: getEnvVariable('STABILITY_API_KEY'),
  apiHost: 'https://api.stability.ai',
  model: 'sd3-large',
};