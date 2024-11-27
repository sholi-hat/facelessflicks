export interface ElevenLabsConfig {
  apiKey: string;
  apiBaseUrl: string;
  defaultVoiceId: string;
}

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

export interface Voice {
  voice_id: string;
  name: string;
  preview_url: string;
  category: string;
}

export interface TextToSpeechRequest {
  text: string;
  voiceId?: string;
  settings?: Partial<VoiceSettings>;
}

export interface TextToSpeechResponse {
  audioUrl: string;
}