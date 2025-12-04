import OpenAI from 'openai';
import type { Match } from '../types';

let openaiClient: OpenAI | null = null;

const getOpenAIClient = (): OpenAI | null => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Note: In production, this should be done via backend
    });
  }
  return openaiClient;
};

export const generateMatchStory = async (match: Match): Promise<string> => {
  const client = getOpenAIClient();
  
  // If no API key is configured, use template story
  if (!client) {
    console.log('OpenAI API key not configured, using template story');
    return generateTemplateStory(match);
  }

  try {
    const prompt = `Write a compelling match diary entry for a tennis match. Incorporate all the details provided below into a narrative story format. The story should be engaging, personal, and capture the essence of the match experience.

Match Details:
- Opponent: ${match.opponentName}
- Opponent Level: ${match.opponentLevel}
- Date: ${new Date(match.date).toLocaleDateString()}
- Result: ${match.result}
- Court Surface: ${match.courtSurface}
- Energy Level: ${match.energyRating}
- Confidence Level: ${match.confidenceRating}
- Strengths Today: ${match.strengths.join(', ') || 'None specified'}
- Weaknesses Today: ${match.weaknesses.join(', ') || 'None specified'}
- Key Moment 1: ${match.keyMoment1}
- Key Moment 2: ${match.keyMoment2}

Write a match diary entry that:
1. Starts with an introduction setting the scene
2. Describes the match details and opponent
3. Analyzes performance (strengths, weaknesses, energy, confidence)
4. Highlights the key moments
5. Concludes with reflections on the match

Make it personal, engaging, and around 200-300 words.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a tennis performance analyst who writes engaging match diary entries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Unable to generate story.';
  } catch (error) {
    console.error('Error generating story:', error);
    // Fallback to template-based story if API fails
    return generateTemplateStory(match);
  }
};

const generateTemplateStory = (match: Match): string => {
  const resultText = match.result === 'win' ? 'victory' : match.result === 'loss' ? 'defeat' : 'split sets';
  const dateStr = new Date(match.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `Match Diary Entry - ${dateStr}

Today's match against ${match.opponentName} (${match.opponentLevel} level) on ${match.courtSurface} court ended in a ${resultText}.

**Match Overview:**
I came into this match feeling ${match.confidenceRating} confidence and ${match.energyRating} energy levels. The conditions were challenging, playing on ${match.courtSurface} surface against a ${match.opponentLevel} opponent.

**Performance Analysis:**
My strengths today were clearly ${match.strengths.length > 0 ? match.strengths.join(', ') : 'not clearly defined'}. However, I struggled with ${match.weaknesses.length > 0 ? match.weaknesses.join(', ') : 'various aspects of my game'}.

**Key Moments:**
${match.keyMoment1 ? `1. ${match.keyMoment1}` : ''}
${match.keyMoment2 ? `2. ${match.keyMoment2}` : ''}

**Reflection:**
This match provided valuable insights into my game. The ${resultText} reflects both my preparation and execution on the court. I'll take these lessons forward to improve in future matches.`;
};

