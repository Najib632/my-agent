import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { Command } from "commander";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "./tools";

const program = new Command();
program
  .name("code-review-agent")
  .description("An AI-powered code review agent.")
  .version("0.1.0")
  .requiredOption(
    "-d, --directory <path>",
    "The directory to run the code review on",
  );

program.parse(process.argv);

const options = program.opts();
const targetDirectory = options.directory;

const codeReviewAgent = async (prompt: string) => {
  const result = streamText({
    model: google("models/gemini-2.5-flash"),
    prompt,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool: getFileChangesInDirectoryTool,
    },
    stopWhen: stepCountIs(10),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};

if (!targetDirectory) {
  console.error("Please provide a directory path as an argument.");
  program.help();
  process.exit(1);
}

await codeReviewAgent(
  `Review the code changes in '${targetDirectory}' directory, make your reviews and suggestions file by file`,
);
