# my-agent

An AI-powered code review agent that analyzes git diffs and provides suggestions.

## Install Dependencies

To install the necessary dependencies, run:

```bash
bun install
```

## Usage

To run the AI code review agent, you need to provide the path to the directory you want to review using the `--directory` or `-d` flag.

### Run a Review

Provide the path to your project directory to get a code review of the uncommitted changes.

```bash
bun run index.ts --directory /path/to/your/project
```

Or using the shorthand flag:

```bash
bun run index.ts -d /path/to/your/project
```

### View Help

For a full list of available commands and options, use the `--help` flag.

```bash
bun run index.ts --help
```

---

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.