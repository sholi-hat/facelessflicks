import { ElevenLabsConfig } from './types';
import { getEnvVariable } from '../env';

export const elevenLabsConfig: ElevenLabsConfig = {
  apiKey: getEnvVariable('ELEVENLABS_API_KEY'),
  apiBaseUrl: 'https://api.elevenlabs.io/v1',
  // Using "Rachel" voice as default - a clear, professional female voice
  defaultVoiceId: '21m00Tcm4TlvDq8ikWAM',
};

export const defaultVoiceSettings = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.5,
  use_speaker_boost: true,
};