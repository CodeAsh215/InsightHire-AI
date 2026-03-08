'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate personalized interview questions
 * based on a user's resume and an optional job description.
 *
 * - generateResumeBasedQuestions - The main function to call the AI flow.
 * - GenerateResumeBasedQuestionsInput - The input type for the flow.
 * - GenerateResumeBasedQuestionsOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeBasedQuestionsInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The user's resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescription: z
    .string()
    .optional()
    .describe('An optional job description to tailor questions more specifically.'),
});
export type GenerateResumeBasedQuestionsInput = z.infer<
  typeof GenerateResumeBasedQuestionsInputSchema
>;

const GenerateResumeBasedQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of personalized interview questions.'),
});
export type GenerateResumeBasedQuestionsOutput = z.infer<
  typeof GenerateResumeBasedQuestionsOutputSchema
>;

const generateResumeBasedQuestionsPrompt = ai.definePrompt({
  name: 'generateResumeBasedQuestionsPrompt',
  input: {schema: GenerateResumeBasedQuestionsInputSchema},
  output: {schema: GenerateResumeBasedQuestionsOutputSchema},
  prompt: `You are an AI interviewer specializing in technical interviews. Your task is to generate personalized interview questions based on the provided resume and an optional job description.

Analyze the resume thoroughly to understand the candidate's skills, experience, and projects. If a job description is provided, tailor the questions to align with the requirements and technologies mentioned in the job description, while still leveraging the candidate's background.

Generate a list of 5-7 insightful questions that would effectively assess the candidate's technical capabilities, problem-solving skills, and relevant experience for roles typically sought by B.Tech students, freshers, and software engineers.

Resume: {{media url=resumeDataUri}}

{{#if jobDescription}}
Job Description: {{{jobDescription}}}
{{/if}}

Focus on questions that encourage detailed answers and demonstrate a deep understanding of their stated abilities and experiences.
`,
});

const generateResumeBasedQuestionsFlow = ai.defineFlow(
  {
    name: 'generateResumeBasedQuestionsFlow',
    inputSchema: GenerateResumeBasedQuestionsInputSchema,
    outputSchema: GenerateResumeBasedQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateResumeBasedQuestionsPrompt(input);
    return output!;
  }
);

export async function generateResumeBasedQuestions(
  input: GenerateResumeBasedQuestionsInput
): Promise<GenerateResumeBasedQuestionsOutput> {
  return generateResumeBasedQuestionsFlow(input);
}
