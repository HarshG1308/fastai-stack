# fastai-stack

fastai-stack is an interactive CLI for generating production-ready FastAPI backends tailored to AI/ML workflows.

## Vision

Build the best FastAPI scaffolding experience for AI developers by 2026: async-first, type-safe, and deployment-ready.

## Install

```bash
pip install fastai-stack
```

## Quickstart

```bash
fastai-stack create myapp --interactive
```

Generate without prompts:

```bash
fastai-stack create myapp --non-interactive --db sqlite --auth none --ai openai --vector-db pgvector
```

## What Gets Generated

- FastAPI app skeleton with modular package layout
- Pydantic v2 settings + async-ready API router
- Optional auth, tasks, AI, vector DB, and monitoring integrations
- Dockerfile + docker-compose (CPU/GPU-aware)
- Poetry-managed app dependencies
- Tests and CI workflow scaffolding

## Development

```bash
poetry install
poetry run pytest
poetry run fastai-stack --help
```

## Publish

```bash
poetry build
poetry publish
```

## License

MIT
