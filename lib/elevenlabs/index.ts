import { elevenLabsConfig, defaultVoiceSettings } from './config';
import { TextToSpeechRequest, TextToSpeechResponse } from './types';

export async function textToSpeech({
  text,
  voiceId = elevenLabsConfig.defaultVoiceId,
  settings = {},
}: TextToSpeechRequest): Promise<TextToSpeechResponse> {
  const response = await fetch(
    `${elevenLabsConfig.apiBaseUrl}/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsConfig.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          ...defaultVoiceSettings,
          ...settings,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`ElevenLabs API error: ${response.statusText}\n${JSON.stringify(error, null, 2)}`);
  }

  // ElevenLabs returns audio data directly
  const audioBuffer = await response.arrayBuffer();
  const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
  const audioUrl = URL.createObjectURL(audioBlob);

  return { audioUrl };
}