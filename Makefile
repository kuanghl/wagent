DOCKER_IMAGE=kaunghl98/wagent
DOCKER_TAG?=latest
DOCKER_PLATFORMS?=linux/amd64

MINI_IMAGE=kaunghl98/wagent
MINI_TAG?=mini

TEST_RUN=docker run --rm --platform ${DOCKER_PLATFORMS} ${DOCKER_IMAGE}:${DOCKER_TAG}
TEST_RUN_MINI=docker run --rm --platform ${DOCKER_PLATFORMS} ${MINI_IMAGE}:${MINI_TAG}

.PHONY: build
build:
	docker buildx build --platform ${DOCKER_PLATFORMS} -t ${DOCKER_IMAGE}:${DOCKER_TAG} .

.PHONY: push
push:
	docker push ${DOCKER_IMAGE}:${DOCKER_TAG}

.PHONY: run
run:
	docker run --rm -it --platform ${DOCKER_PLATFORMS} -v ${PWD}:/workspace -w /workspace ${DOCKER_IMAGE}:${DOCKER_TAG} /bin/bash

.PHONY: test
test: _testcase-node _testcase-bun _testcase-deno _testcase-agents _testcase-common

.PHONY: _testcase-node
_testcase-node:
	$(TEST_RUN) node --version
	$(TEST_RUN) npm --version

.PHONY: _testcase-bun
_testcase-bun:
	$(TEST_RUN) bun --version
	$(TEST_RUN) bunx --version

.PHONY: _testcase-deno
_testcase-deno:
	$(TEST_RUN) deno --version

.PHONY: _testcase-agents
_testcase-agents:
	$(TEST_RUN) claude --version
	$(TEST_RUN) cursor-agent --version
	$(TEST_RUN) codex --version
	$(TEST_RUN) gemini --version
	$(TEST_RUN) opencode --version
	$(TEST_RUN) copilot --version
	$(TEST_RUN) cline --version
	$(TEST_RUN) codebuddy --version
	$(TEST_RUN) kimi --version
	$(TEST_RUN) dsh --version
	$(TEST_RUN) pi --version
	$(TEST_RUN) grok --version
	$(TEST_RUN) qodercli --version
	$(TEST_RUN) qoderclicn --version
	$(TEST_RUN) kilocode --version
	$(TEST_RUN) omp --version
#	$(TEST_RUN) hermes --version
#	$(TEST_RUN) openclaw --version
	$(TEST_RUN) jcode --version
	$(TEST_RUN) qwen --version
	$(TEST_RUN) agy --version

.PHONY: _testcase-common
_testcase-common:
	$(TEST_RUN) gh --version
	$(TEST_RUN) glab --version
	$(TEST_RUN) git --version
	$(TEST_RUN) ssh -V
	$(TEST_RUN) jq --version
	$(TEST_RUN) rg --version
	$(TEST_RUN) fd --version
	$(TEST_RUN) tree --version
	$(TEST_RUN) less --version
	$(TEST_RUN) ps --version
	$(TEST_RUN) bwrap --version
	$(TEST_RUN) unzip -v
	$(TEST_RUN) zip -v
	$(TEST_RUN) nano --version
	$(TEST_RUN) test -s /root/AGENT.md

# --- Mini variant (Dockerfile.mini) -------------------------------------------

.PHONY: build-mini
build-mini:
	docker buildx build --platform ${DOCKER_PLATFORMS} -f Dockerfile.mini -t ${MINI_IMAGE}:${MINI_TAG} .

.PHONY: push-mini
push-mini:
	docker push ${MINI_IMAGE}:${MINI_TAG}

.PHONY: run-mini
run-mini:
	docker run --rm -it --platform ${DOCKER_PLATFORMS} -v ${PWD}:/workspace -w /workspace ${MINI_IMAGE}:${MINI_TAG} /bin/bash

.PHONY: test-mini
test-mini: _testcase-mini-node _testcase-mini-bun _testcase-mini-deno _testcase-mini-agents _testcase-mini-common

.PHONY: _testcase-mini-node
_testcase-mini-node:
	$(TEST_RUN_MINI) node --version
	$(TEST_RUN_MINI) npm --version

.PHONY: _testcase-mini-bun
_testcase-mini-bun:
	$(TEST_RUN_MINI) bun --version
	$(TEST_RUN_MINI) bunx --version

.PHONY: _testcase-mini-deno
_testcase-mini-deno:
	$(TEST_RUN_MINI) deno --version

.PHONY: _testcase-mini-agents
_testcase-mini-agents:
	$(TEST_RUN_MINI) claude --version
	$(TEST_RUN_MINI) cursor-agent --version
	$(TEST_RUN_MINI) codex --version
	$(TEST_RUN_MINI) gemini --version
	$(TEST_RUN_MINI) opencode --version
	$(TEST_RUN_MINI) copilot --version
	$(TEST_RUN_MINI) cline --version
	$(TEST_RUN_MINI) codebuddy --version
	$(TEST_RUN_MINI) kimi --version
	$(TEST_RUN_MINI) dsh --version
	$(TEST_RUN_MINI) pi --version
	$(TEST_RUN_MINI) grok --version
	$(TEST_RUN_MINI) qodercli --version
	$(TEST_RUN_MINI) qoderclicn --version
	$(TEST_RUN_MINI) kilocode --version
	$(TEST_RUN_MINI) omp --version
#	$(TEST_RUN) hermes --version
#	$(TEST_RUN) openclaw --version
	$(TEST_RUN_MINI) jcode --version
	$(TEST_RUN_MINI) qwen --version
	$(TEST_RUN_MINI) agy --version

.PHONY: _testcase-mini-common
_testcase-mini-common:
	$(TEST_RUN_MINI) gh --version
	$(TEST_RUN_MINI) glab --version
	$(TEST_RUN_MINI) git --version
	$(TEST_RUN_MINI) ssh -V
	$(TEST_RUN_MINI) jq --version
	$(TEST_RUN_MINI) rg --version
	$(TEST_RUN_MINI) fd --version
	$(TEST_RUN_MINI) tree --version
	$(TEST_RUN_MINI) less --version
	$(TEST_RUN_MINI) ps --version
	$(TEST_RUN_MINI) bwrap --version
	$(TEST_RUN_MINI) unzip -v
	$(TEST_RUN_MINI) zip -v
	$(TEST_RUN_MINI) nano --version
	$(TEST_RUN_MINI) test -s /root/AGENT.md
