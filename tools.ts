import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";

const diffToolSchema = z.object({
  directory: z.string().describe("The directory to check for changes."),
  excludeFiles: z
    .array(z.string())
    .optional()
    .describe(
      "An array of file names or glob patterns to exclude from the diff.",
    ),
});

type DiffChange = z.infer<typeof diffToolSchema>;

async function getDiffInDirectory({
  directory,
  excludeFiles = ["dist", "bun.lock"],
}: DiffChange) {
  try {
    const diffArgs = ["HEAD", "--", directory];

    if (excludeFiles.length > 0) {
      const excludePatterns = excludeFiles.map(
        (pattern) => `:(exclude)${pattern}`,
      );
      diffArgs.push(...excludePatterns);
    }

    const diff = await simpleGit().diff(diffArgs);

    if (!diff) {
      return `No uncommitted changes found in '${directory}' `;
    }
    return diff;
  } catch (error: any) {
    return `Error getting git diff: ${error.message}`;
  }
}

export const getFileChangesInDirectoryTool = tool({
  description:
    "Get the file changes in a directory, with an option to exclude files.",
  inputSchema: diffToolSchema,
  execute: getDiffInDirectory,
});
