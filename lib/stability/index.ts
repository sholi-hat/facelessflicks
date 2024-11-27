import { stabilityConfig } from './config';
import { GenerateImageRequest, GenerateImageResponse, TextPrompt } from './types';

const DEFAULT_NEGATIVE_PROMPT = 'blurry, bad quality, distorted, disfigured, ugly face, bad anatomy, extra limbs';

export async function generateImage({
  prompt,
  negativePrompt = DEFAULT_NEGATIVE_PROMPT,
  width = 1024,
  height = 768,
  steps = 40,
  cfgScale = 7,
}: GenerateImageRequest): Promise<GenerateImageResponse> {
  const textPrompts: TextPrompt[] = [
    { text: prompt, weight: 1 },
    { text: negativePrompt, weight: -1 },
  ];

  const response = await fetch(
    `${stabilityConfig.apiHost}/v2beta/stable-image/generate/core`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${stabilityConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: stabilityConfig.model,
        width,
        height,
        steps,
        cfg_scale: cfgScale,
        samples: 1,
        text_prompts: textPrompts,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Stability AI API error: ${response.statusText}\n${JSON.stringify(error, null, 2)}`);
  }

  const responseJSON = await response.json();
  const base64Image = responseJSON.images[0].image;
  const imageUrl = `data:image/png;base64,${base64Image}`;

  return { imageUrl };
}