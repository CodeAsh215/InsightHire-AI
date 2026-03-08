'use server';
/**
 * @fileOverview An AI agent that analyzes interview performance and provides actionable improvement suggestions.
 *
 * - generateInterviewImprovementSuggestions - A function that generates improvement suggestions based on interview performance data.
 * - GenerateInterviewImprovementSuggestionsInput - The input type for the generateInterviewImprovementSuggestions function.
 * - GenerateInterviewImprovementSuggestionsOutput - The return type for the generateInterviewImprovementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewImprovementSuggestionsInputSchema = z.object({
  interviewTranscript: z
    .string()
    .describe('The full text transcript of the user\u0027s interview.'),
  sentimentAnalysis: z
    .string()
    .describe('A summary of the user\u0027s sentiment during the interview.'),
  communicationClarityScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A score (0-100) indicating the clarity of communication.'),
  confidenceLevel: z
    .number()
    .min(0)
    .max(100)
    .describe('A score (0-100) indicating the user\u0027s confidence level.'),
  fillerWordsCount: z
    .number()
    .min(0)
    .describe('The total count of filler words used.'),
  technicalAccuracySummary: z
    .string()
    .describe('A summary of the user\u0027s technical accuracy in answers.'),
  weakTopics: z.array(z.string()).describe('A list of identified weak technical topics.'),
  strongTopics: z.array(z.string()).describe('A list of identified strong technical topics.'),
});
export type GenerateInterviewImprovementSuggestionsInput = z.infer<
  typeof GenerateInterviewImprovementSuggestionsInputSchema
>;

const GenerateInterviewImprovementSuggestionsOutputSchema = z.object({
  overallFeedback: z
    .string()
    .describe('A concise overall summary of the interview performance.'),
  actionableSuggestions: z
    .array(z.string())
    .describe('A list of specific, actionable steps for overall improvement.'),
  communicationTips: z
    .array(z.string())
    .describe('Specific tips to improve communication clarity and confidence.'),
  technicalImprovementAreas: z
    .array(z.string())
    .describe('Recommendations for improving technical knowledge in weak areas.'),
});
export type GenerateInterviewImprovementSuggestionsOutput = z.infer<
  typeof GenerateInterviewImprovementSuggestionsOutputSchema
>;

export async function generateInterviewImprovementSuggestions(
  input: GenerateInterviewImprovementSuggestionsInput
): Promise<GenerateInterviewImprovementSuggestionsOutput> {
  return generateInterviewImprovementSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewImprovementSuggestionsPrompt',
  input: {schema: GenerateInterviewImprovementSuggestionsInputSchema},
  output: {schema: GenerateInterviewImprovementSuggestionsOutputSchema},
  prompt: `You are an expert career coach specializing in technical interviews.
Your goal is to analyze interview performance data and provide concrete, actionable improvement suggestions.

Here is the interview performance data:

Interview Transcript:
{{{interviewTranscript}}}

Sentiment Analysis:
{{{sentimentAnalysis}}}

Communication Clarity Score: {{{communicationClarityScore}}}/100
Confidence Level: {{{confidenceLevel}}}/100
Filler Words Count: {{{fillerWordsCount}}}
Technical Accuracy Summary:
{{{technicalAccuracySummary}}}

Weak Topics:
{{#each weakTopics}}- {{{this}}}
{{/each}}
Strong Topics:
{{#each strongTopics}}- {{{this}}}
{{/each}}

Based on this data, provide constructive feedback and highly actionable suggestions to help the user understand their weaknesses and prepare better for future interviews.
Focus on providing specific steps and resources where appropriate. Ensure the suggestions are practical and easy to implement.

Structure your response according to the provided output schema.
`,
});

const generateInterviewImprovementSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewImprovementSuggestionsFlow',
    inputSchema: GenerateInterviewImprovementSuggestionsInputSchema,
    outputSchema: GenerateInterviewImprovementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate improvement suggestions.');
    }
    return output;
  }
);
