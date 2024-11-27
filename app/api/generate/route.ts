import { NextResponse } from "next/server";
import { generateScript } from "@/lib/openai";
import { generateImage } from "@/lib/stability";
import { textToSpeech } from "@/lib/elevenlabs";

export async function POST(req: Request) {
  try {
    const { prompt, duration, voiceId } = await req.json();

    // Generate script using OpenAI
    const script = await generateScript(prompt, duration);

    // Generate images and audio for each scene
    const scenes = await Promise.all(
      script.scenes.map(async (scene) => {
        const [imageResponse, audioResponse] = await Promise.all([
          generateImage({ prompt: scene.description }),
          textToSpeech({ 
            text: scene.narration,
            voiceId: voiceId
          }),
        ]);

        return {
          ...scene,
          imageUrl: imageResponse.imageUrl,
          audioUrl: audioResponse.audioUrl,
        };
      })
    );

    return NextResponse.json({
      title: script.title,
      scenes,
    });
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}