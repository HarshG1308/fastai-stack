from __future__ import annotations

import re
from pathlib import Path
from typing import TypeVar

import typer
from rich.console import Console
from rich.panel import Panel

from . import __version__
from .generator import render_project
from .models import (AIChoice, AuthChoice, DatabaseChoice, DockerChoice,
                     FrontendChoice, MonitoringChoice, ProjectConfig,
                     TaskChoice, VectorDBChoice)

app = typer.Typer(help="fastai-stack: Generate production-ready FastAPI stacks for AI developers.")
console = Console()
EnumType = TypeVar("EnumType")


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
    return slug or "fastai-stack-app"


def _prompt_enum(label: str, enum_type: type[EnumType], default: EnumType) -> EnumType:
    choices = ", ".join(item.value for item in enum_type)
    while True:
        raw_value = typer.prompt(f"{label} [{choices}]", default=default.value)
        normalized = raw_value.strip().lower()
        for item in enum_type:
            if normalized == item.value:
                return item
        console.print(f"[bold yellow]Invalid value:[/bold yellow] '{raw_value}'. Choose one of: {choices}")


def _validate_config(config: ProjectConfig) -> None:
    if config.vector_db == VectorDBChoice.pgvector and config.db != DatabaseChoice.postgres:
        raise typer.BadParameter("--vector-db pgvector requires --db postgres")


@app.command()
def create(
    project_name: str = typer.Argument(..., help="Project name or slug."),
    interactive: bool = typer.Option(True, "--interactive/--non-interactive", help="Prompt for stack options."),
    db: DatabaseChoice = typer.Option(DatabaseChoice.postgres, help="Database backend."),
    auth: AuthChoice = typer.Option(AuthChoice.none, help="Authentication mode."),
    tasks: TaskChoice = typer.Option(TaskChoice.none, help="Background tasks setup."),
    ai: AIChoice = typer.Option(AIChoice.none, help="AI integration provider."),
    vector_db: VectorDBChoice = typer.Option(VectorDBChoice.none, "--vector-db", help="Vector database option."),
    docker: DockerChoice = typer.Option(DockerChoice.cpu, help="Docker runtime profile."),
    monitoring: MonitoringChoice = typer.Option(MonitoringChoice.none, help="Monitoring integration."),
    frontend: FrontendChoice = typer.Option(FrontendChoice.none, help="Frontend starter option."),
    output_dir: Path = typer.Option(Path("."), "--output-dir", help="Directory where the project will be generated."),
) -> None:
    """Create a new FastAPI AI stack project."""
    final_project_name = project_name
    final_project_slug = _slugify(project_name)

    if interactive:
        console.print(Panel("fastai-stack interactive setup", style="bold cyan"))
        final_project_name = typer.prompt("Project name", default=project_name)
        final_project_slug = typer.prompt("Project slug", default=_slugify(final_project_name))

        db = _prompt_enum("DB", DatabaseChoice, db)
        auth = _prompt_enum("Auth", AuthChoice, auth)
        tasks = _prompt_enum("Tasks", TaskChoice, tasks)
        ai = _prompt_enum("AI", AIChoice, ai)
        vector_db = _prompt_enum("Vector DB", VectorDBChoice, vector_db)
        docker = _prompt_enum("Docker", DockerChoice, docker)
        monitoring = _prompt_enum("Monitoring", MonitoringChoice, monitoring)
        frontend = _prompt_enum("Frontend", FrontendChoice, frontend)

    config = ProjectConfig(
        project_name=final_project_name,
        project_slug=final_project_slug,
        db=db,
        auth=auth,
        tasks=tasks,
        ai=ai,
        vector_db=vector_db,
        docker=docker,
        monitoring=monitoring,
        frontend=frontend,
    )

    _validate_config(config)

    try:
        project_dir = render_project(config=config, destination=output_dir.resolve())
    except FileExistsError as exc:
        console.print(f"[bold red]Error:[/bold red] {exc}")
        raise typer.Exit(code=1)
    except Exception as exc:  # pragma: no cover - defensive fallback
        console.print(f"[bold red]Generation failed:[/bold red] {exc}")
        raise typer.Exit(code=1)

    console.print("\n[bold green]Project created successfully![/bold green]")
    console.print(f"Location: [cyan]{project_dir}[/cyan]")
    console.print("\nNext steps:")
    console.print(f"  cd {config.project_slug}")
    console.print("  poetry install")
    console.print("  poetry run uvicorn app.main:app --reload")


@app.command()
def version() -> None:
    """Show CLI version."""
    console.print(f"fastai-stack {__version__}")


if __name__ == "__main__":
    app()
