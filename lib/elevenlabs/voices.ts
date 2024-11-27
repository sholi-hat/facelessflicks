import { elevenLabsConfig } from './config';
import { Voice } from './types';

export async function getVoices(): Promise<Voice[]> {
  const response = await fetch(
    `${elevenLabsConfig.apiBaseUrl}/voices`,
    {
      headers: {
        'xi-api-key': elevenLabsConfig.apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch voices');
  }

  const data = await response.json();
  return data.voices;
}