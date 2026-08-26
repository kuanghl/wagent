FROM ubuntu:24.04

ENV PATH=/root/bin:/root/.bun/bin:/root/.deno/bin:/root/.local/bin:$PATH

# INSTALLATION #################################################################
RUN for i in 1 2 3; do \
        rm -rf /var/lib/apt/lists/* && \
        apt-get update -o Acquire::Retries=5 && break || \
        sleep 20; \
    done && \
    apt-get dist-upgrade -y -o Dpkg::Options::="--force-confdef" && \
    rm -rf /var/lib/apt/lists/*

# DEPENDENCIES #################################################################
RUN DEBIAN_FRONTEND=noninteractive apt install -y \
        wget \
        curl \
        git \
        ca-certificates \
        gnupg \
        lsb-release \
        openssh-client \
        jq \
        ripgrep \
        fd-find \
        tree \
        less \
        procps \
        unzip \
        zip \
        nano \
        bubblewrap && \
    # Debian/Ubuntu ship fd as fdfind to avoid a name clash
    ln -s "$(command -v fdfind)" /usr/local/bin/fd && \
    # CLEAN UP #################################################################
    apt-get clean -y && \
    apt-get autoclean -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* /var/lib/log/* /tmp/* /var/tmp/*

# NODE.JS / GITHUB CLI #########################################################
# Node.js from NodeSource (LTS 24 line), gh from its official apt repository;
# both resolve to the newest release on every build.
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && \
    chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" > /etc/apt/sources.list.d/github-cli-stable.list && \
    apt update && \
    apt install -y nodejs gh

# BUN ##########################################################################
RUN curl -fsSL https://bun.sh/install | bash

# DENO #########################################################################
RUN curl -fsSL https://deno.land/install.sh | sh

# CLAUDE CODE ##################################################################
RUN npm install -g @anthropic-ai/claude-code

# CURSOR CLI ###################################################################
RUN curl https://cursor.com/install -fsS | bash

# CODEX CLI ####################################################################
RUN npm install -g @openai/codex

# GEMINI CLI ###################################################################
RUN npm install -g @google/gemini-cli

# OPENCODE CLI #################################################################
RUN npm install -g opencode-ai

# COPILOT CLI ##################################################################
RUN npm install -g @github/copilot

# CLINE CLI ####################################################################
RUN npm install -g cline

# CODEBUDDY CLI (TENCENT) ######################################################
RUN npm install -g @tencent-ai/codebuddy-code

# KIMI CODE CLI (MOONSHOT AI) ##################################################
# Installer defaults to $HOME/.kimi-code/bin, which is not on PATH in
# non-interactive shells; point it at /usr/local instead.
RUN curl -fsSL https://code.kimi.com/kimi-code/install.sh \
        | KIMI_INSTALL_DIR=/usr/local bash

# DEEPSEEK HARNESS CLI #########################################################
RUN npm install -g @deepseek-ai/dsh

# PI CODING AGENT CLI ##########################################################
RUN npm install -g @mariozechner/pi-coding-agent

# GROK BUILD CLI (XAI) #########################################################
RUN curl -fsSL https://x.ai/cli/install.sh | bash

# QODER CLI ####################################################################
RUN npm install -g @qoder-ai/qodercli

# OPENCLAW #####################################################################
# npm >= 11.16 requires --allow-scripts=openclaw for its lifecycle scripts;
# older npm versions reject the flag, so fall back to a plain install.
RUN (npm install -g openclaw@latest --allow-scripts=openclaw || \
     npm install -g openclaw)

# ANTIGRAVITY CLI (GOOGLE) #####################################################
RUN curl -fsSL https://antigravity.google/cli/install.sh | bash

# GITLAB CLI ###################################################################
# Resolve the latest published release tag at build time.
RUN ARCH=$(case $(dpkg --print-architecture) in \
        arm64) echo "linux_arm64" ;; \
        *) echo "linux_amd64" ;; \
    esac) && \
    GLAB_VERSION=$(curl -fsSL "https://gitlab.com/api/v4/projects/gitlab-org%2Fcli/releases" | jq -r ".[0].tag_name" | sed "s/^v//") && \
    curl -OL "https://gitlab.com/gitlab-org/cli/-/releases/v${GLAB_VERSION}/downloads/glab_${GLAB_VERSION}_${ARCH}.tar.gz" && \
    tar -xzf "glab_${GLAB_VERSION}_${ARCH}.tar.gz" && \
    rm "glab_${GLAB_VERSION}_${ARCH}.tar.gz" && \
    mv bin/glab /usr/local/bin

# AGENT DOCS ###################################################################
COPY AGENT.md /root/AGENT.md

# WORKDIR ######################################################################
WORKDIR /workspace

CMD ["/bin/bash"]
