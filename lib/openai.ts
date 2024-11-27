import OpenAI from 'openai';
import { getEnvVariable } from './env';

export const openai = new OpenAI({
  apiKey: getEnvVariable('OPENAI_API_KEY'),
});

export async function generateScript(prompt: string, duration: string) {
  const systemPrompt = `Please ignore all previous instructions. Please respond only in the English language. You are a short video script creator. Do not self reference. Do not explain what you are doing. Please just write me a TikTok video script about ${prompt}. No advanced words, 5th grade reading level. The length of the video should be ${duration} seconds. The script needs to have a catchy hook, follow the best practice of TikTok videos, and get as much traction from the target audience as possible following this style of creation:

The first 5 seconds can make or break it. So start each video with a hook that grabs attention. Make sure your opening line is one of these:
-A strong, direct statement
-A question that makes them think
-A bold or controversial opinion
-A snapshot of a key moment
-A relatable truth
-A unique or "weird" insight

Keep them curious and hanging on for more:
-Start by teasing the outcome but don't give it all away.
-Build the story or message up.
-Wrap it up by resolving the suspense.
Make sure each line flows to the next; this keeps viewers hooked to the very end.

Format the response as a JSON object with the following structure:
{
  "title": "Video title",
  "scenes": [
    {
      "duration": "duration in seconds",
      "narration": "text to be spoken",
      "description": "visual description for image generation"
    }
  ]
}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}