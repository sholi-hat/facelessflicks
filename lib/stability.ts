import { getEnvVariable } from './env';

interface GenerateImageResponse {
  imageUrl: string;
}

export async function generateImage(prompt: string): Promise<GenerateImageResponse> {
  const engineId = 'stable-diffusion-xl-1024-v1-0';
  const apiHost = 'https://api.stability.ai';
  const apiKey = getEnvVariable('STABILITY_API_KEY');

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1,
          },
          {
            text: 'blurry, bad quality, distorted, disfigured, low resolution',
            weight: -1,
          }
        ],
        cfg_scale: 8,
        height: 768,
        width: 1024,
        steps: 40,
        samples: 1,
        style_preset: "cinematic",
        sampler: "DPM++ 2M Karras",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Stability AI API error: ${response.statusText}`);
  }

  const responseJSON = await response.json();
  const base64Image = responseJSON.artifacts[0].base64;
  const imageUrl = `data:image/png;base64,${base64Image}`;

  return { imageUrl };
}