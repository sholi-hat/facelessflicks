export interface StabilityConfig {
  apiKey: string;
  apiHost: string;
  model: string;
}

export interface TextPrompt {
  text: string;
  weight: number;
}

export interface GenerateImageRequest {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  cfgScale?: number;
  seed?: number;
}

export interface GenerateImageResponse {
  imageUrl: string;
}