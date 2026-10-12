# ASTRA source audit

Date: 2026-10-12. Original checkout: commit f0ee240e7fcceb5a392a733b01aeffedd1f45fca. Read-only inspection; selected tests executed from a private isolated source snapshot. No original Git history is imported into the showcase.

## Status definitions
VERIFIED: a named check passed in this audit, within its stated scope. IMPLEMENTED BUT UNVERIFIED: implementation inspected, corresponding runtime behavior not checked. PARTIAL: some necessary artifacts are present, end-to-end capability unresolved. PLANNED: explicitly documented future work. NOT FOUND: not established within the inspected scope, not proof of absence everywhere.

## Declared stack
package.json: TypeScript ^6.0.3, React/React DOM ^19.3.0, Vite ^8.3.1, Zod ^4.6.5, Vitest ^5.0.3, Playwright ^1.63.0. Node engine >=24 <25. These are manifest ranges, not assertions about every installed dependency. src/persistence/store.ts imports node:sqlite and creates a WAL-mode SQLite store with versioned migrations.

| Capability | Classification | Evidence and limits |
|---|---|---|
| Task lifecycle and trusted contract boundaries | VERIFIED | tests/contracts.test.ts: 7 tests passed. Includes terminal task rejection, completion requirements, raw credential/event payload rejection. |
| Action-bound approvals | VERIFIED | Same suite checks stale, consumed, different-scope and changed-state approval rejection. Does not verify a real browser action. |
| Provider policy/accounting schemas | VERIFIED | Same suite checks CLI transport consistency, free/paid distinctions, unavailable accounting. |
| Vault-path validation | VERIFIED | Same suite rejects traversal, absolute paths, alternate streams and invalid diagnostics. Does not verify live memory IO. |
| Eligibility and provider selection | IMPLEMENTED BUT UNVERIFIED | src/providers/routing.ts: filters class, billing, local/free/subscription constraints, availability, roles and overrides; deterministic bypass branch. |
| Provider execution | IMPLEMENTED BUT UNVERIFIED | src/providers/execution.ts, cli.ts, registry.ts. Configured families include Codex CLI, Claude CLI, OpenRouter, FreeLLMAPI and Ollama. No authenticated calls or paid requests executed. |
| Agent execution and orchestration | IMPLEMENTED BUT UNVERIFIED | src/agents/execution.ts: context reconstruction, provider step, computer action, skill, child task, checkpoints and review. Durable contracts in src/contracts/. No live multi-agent run performed. |
| Persistence and authenticated runtime | IMPLEMENTED BUT UNVERIFIED | src/persistence/store.ts, migrations/, src/security/auth.ts, src/server.ts. Database transactions and event ledger source present; runtime startup/auth not independently exercised here. |
| Browser and Windows tools | IMPLEMENTED BUT UNVERIFIED | src/computer/execution.ts, desktop-control.ts, general-actions.ts. Permission-bounded implementation; real executor and interactive session not tested. |
| Human-readable and machine memory | IMPLEMENTED BUT UNVERIFIED | src/memory/obsidian.ts, src/life/memory.ts, src/knowledge/, src/persistence/store.ts. No private notes or runtime DB copied publicly. |
| Voice, media, live perception, second brain | IMPLEMENTED BUT UNVERIFIED | src/voice/tts.ts, src/media/execution.ts, src/perception/, src/brain/. Manual operational acceptance not performed. |
| Capability acquisition | PARTIAL | src/capability/acquisition/: planning records exist. reports/CURRENT-CAPABILITIES.md explicitly says these plans do not install/build/deploy or self-modify. |
| Secure LAN/phone pairing and scheduler daemon | PLANNED | reports/CURRENT-CAPABILITIES.md residual roadmap boundaries. |
| Next.js, Supabase, Vercel as original stack | NOT FOUND | Not established in inspected manifest/runtime. ASTRA should be described as React/Vite + Node/SQLite. |

## Existing artifacts
tests/platform/ contains broad runtime suites; tests/ui/ has browser suites. reports/ includes provider/agent/computer execution reports and capability/security reports. reports/visual/ contains desktop/mobile screenshots. Original reports are historical project assertions, not fresh verification. No production screenshots, videos, private execution traces, notes, customer data or real provider credentials are republished.

## Reproduction and constraints
Private audit command: node node_modules/vitest/vitest.mjs run tests/contracts.test.ts --config audit.config.mjs, in private-audit/astra. The copied source/tests use the installed dependency directory through a local junction; generated files stay in the new workspace. Result: 1 file, 7 tests passed. Full suite, original builds, live provider calls and desktop acceptance were not run.

## Public demonstration
Newly authored deterministic teaching model; no original runtime implementation copied. It shows a bounded request, illustrative provider selection, synthetic context/tool result, explicit approve/decline and a labelled sample result. The demo does not prove live AI execution, browser access, persistent memory, production permissions or deployment.
