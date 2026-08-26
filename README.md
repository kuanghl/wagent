<h1 align=center>kuanghl / agent-docker</h1>

<p align=center>
   🎁 Dockerized stack for vibing. Claude Code, Codex, Gemini CLI and 12+ other AI coding agents, on top of Node.js, Bun, Deno, GitHub/GitLab CLI and development tools.
</p>

<p align=center>
  <a href="https://github.com/kuanghl/wagent/actions"><img src="https://github.com/kuanghl/agent-docker/actions/workflows/docker.yml/badge.svg"></a>
  <a href="https://hub.docker.com/r/kaunghl98/wagent/"><img src="https://badgen.net/docker/pulls/kaunghl98/wagent"></a>
</p>

------

## Prologue

Docker image with multiple AI coding CLI tools, Node.js 24, Bun, Deno, GitHub & GitLab CLI, and essential development tools.

**Features**

- Ubuntu 24.04 LTS
- Always fresh - nothing is pinned, every build pulls the latest release from upstream
- Node.js 24 (NodeSource)
- Bun (`bun`, `bunx`) - fast JS/TS runtime and package manager
- Deno (`deno`) - JS/TS runtime with built-in TypeScript

**AI coding agents**

- Claude Code CLI (`claude`) - Anthropic
- Cursor CLI (`cursor-agent`) - Cursor
- Codex CLI (`codex`) - OpenAI
- Gemini CLI (`gemini`) - Google
- OpenCode CLI (`opencode`) - open source AI coding agent
- Copilot CLI (`copilot`) - GitHub
- Cline CLI (`cline`) - Cline
- CodeBuddy CLI (`codebuddy`, `cbc`) - Tencent
- Kimi Code CLI (`kimi`) - Moonshot AI
- DeepSeek Harness CLI (`dsh`) - DeepSeek
- Pi coding agent CLI (`pi`) - pi-mono
- Grok Build CLI (`grok`) - xAI
- Qoder CLI (`qodercli`, `qoder`) - Qoder
- OpenClaw (`openclaw`) - personal AI assistant gateway
- Antigravity CLI (`agy`) - Google

**Development tools**

- GitHub CLI (`gh`)
- GitLab CLI (`glab`)
- Essential development tools (git, ssh, curl, wget, nano)
- Search & data tools (`rg` ripgrep, `fd` fd-find, `jq`, `tree`, `less`, `ps`, `bwrap` bubblewrap, `unzip`, `zip`)

## Usage

```sh
docker run \
    --rm \
    -it \
    kaunghl98/wagent:latest
```

## ENV(s)

- `PATH` - Includes `/root/bin`, `/root/.bun/bin`, `/root/.deno/bin` and `/root/.local/bin`

## Workdir

Default working directory is `/workspace`.

## Agent docs

`/root/AGENT.md` documents the installed tools and is meant to be read by the
AI agents running inside the container.

## User

Default user is `root`.

## Maintenance

Issues and pull requests are welcome at
[github.com/kuanghl/agent-docker](https://github.com/kuanghl/agent-docker).
Images are published to [hub.docker.com/r/kaunghl98/wagent](https://hub.docker.com/r/kaunghl98/wagent)
on every push to `master` and on the 1st day of each month.
