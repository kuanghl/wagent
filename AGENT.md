# Vibestack

Container image for AI coding agents, based on Ubuntu 24.04 LTS.
Default working directory is `/workspace`; the repository you work on is
usually mounted there.

Nothing is pinned: every build pulls the newest release from upstream.
npm and bun packages are installed unversioned, runtime CLIs (Bun, Deno)
and installer-script tools (Cursor, Kimi Code, Grok Build, Hermes Agent,
Antigravity) use their official installers, and `gh` / `glab` come from
their official apt
repository and latest-release feed. Run `<command> --version` to check the
exact version of any tool in the running container.

## AI coding agents

| Command               | Tool                                    |
| --------------------- | --------------------------------------- |
| `claude`              | Claude Code CLI (Anthropic)             |
| `cursor-agent`        | Cursor CLI                              |
| `codex`               | Codex CLI (OpenAI)                      |
| `gemini`              | Gemini CLI (Google)                     |
| `opencode`            | OpenCode CLI                            |
| `copilot`             | Copilot CLI (GitHub)                    |
| `cline`               | Cline CLI                               |
| `codebuddy`, `cbc`    | CodeBuddy CLI (Tencent)                 |
| `kimi`                | Kimi Code CLI (Moonshot AI)             |
| `dsh`                 | DeepSeek Harness CLI (`@deepseek-ai/dsh`) |
| `pi`                  | Pi coding agent CLI (`pi-mono`)         |
| `grok`                | Grok Build CLI (xAI)                    |
| `qodercli`, `qoder`   | Qoder CLI                               |
| `qoderclicn`          | Qoder CN CLI                            |
| `kilocode`, `kilo`    | Kilo Code CLI (kilo-org)                |
| `omp`                 | oh-my-pi coding agent CLI               |
| `hermes`              | Hermes Agent CLI (Nous Research)        |
| `openclaw`            | OpenClaw personal AI assistant gateway  |
| `agy`                 | Antigravity CLI (Google)                |

## Runtimes

| Command        | Tool                    | Notes                                       |
| -------------- | ----------------------- | ------------------------------------------- |
| `node`, `npm`  | Node.js 24 (NodeSource) | Default runtime for the installed CLI tools |
| `bun`, `bunx`  | Bun                     | JS/TS runtime, bundler and package manager  |
| `deno`         | Deno 2                  | JS/TS runtime with built-in TypeScript      |

## Version control & forges

| Command | Tool       |
| ------- | ---------- |
| `git`   | Git        |
| `gh`    | GitHub CLI |
| `glab`  | GitLab CLI |
| `ssh`   | OpenSSH client (git over SSH) |

## Search, data & shell tools

| Command  | Tool     | Notes                                              |
| -------- | -------- | -------------------------------------------------- |
| `rg`     | ripgrep  | Fast recursive search; respects `.gitignore`       |
| `fd`     | fd-find  | Fast file finding; Debian's `fdfind` is symlinked to `fd` |
| `jq`     | jq       | JSON querying and transformation                   |
| `tree`   | tree     | Directory listing as a tree                        |
| `less`   | less     | Pager used by `git` and `gh`                       |
| `ps`     | procps   | Process listing                                    |
| `bwrap`  | bubblewrap | Sandbox helper used by `dsh`                     |
| `unzip`, `zip` | Info-ZIP | Archive extraction and creation               |
| `curl`, `wget` | -   | HTTP clients                                       |
| `nano`   | nano     | Terminal editor                                    |

## Tips for agents

- Prefer `rg` over `grep -r` and `fd` over `find` — both are much faster
  and skip ignored files by default.
- Pipe API and CLI output through `jq` instead of parsing JSON by hand;
  `gh` and `glab` both support `--json` output.
- Node.js, Bun and Deno are all available — use whichever a project expects
  (`package.json` scripts, `bun.lock`, `deno.json`) instead of assuming `npm`.
- Each agent must be authenticated on first use (OAuth flow or API key via
  its own login command, e.g. `/login` inside the TUI or `<command> auth login`).
- `PATH` includes `/root/bin` and `/root/.local/bin`, so tools you install
  yourself into those directories are picked up without extra setup.
- Run `<command> --version` to check the exact version of any tool; versions
  are not pinned — each image build fetches whatever is latest upstream.
