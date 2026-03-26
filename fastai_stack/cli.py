from __future__ import annotations

import re
from pathlib import Path

import typer
from rich.console import Console
from rich.panel import Panel

from .generator import render_project
from .models import (AIChoice, AuthChoice, DatabaseChoice, DockerChoice,
                     FrontendChoice, MonitoringChoice, ProjectConfig,
                     TaskChoice, VectorDBChoice)

app = typer.Typer(help="fastai-stack: Generate production-ready FastAPI stacks for AI developers.")
console = Console()


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
    return slug or "fastai-stack-app"


def _prompt_enum(label: str, enum_type: type, default: str) -> str:
    choices = ", ".join(item.value for item in enum_type)
    return typer.prompt(f"{label} [{choices}]", default=default)


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

        db = DatabaseChoice(_prompt_enum("DB", DatabaseChoice, db.value))
        auth = AuthChoice(_prompt_enum("Auth", AuthChoice, auth.value))
        tasks = TaskChoice(_prompt_enum("Tasks", TaskChoice, tasks.value))
        ai = AIChoice(_prompt_enum("AI", AIChoice, ai.value))
        vector_db = VectorDBChoice(_prompt_enum("Vector DB", VectorDBChoice, vector_db.value))
        docker = DockerChoice(_prompt_enum("Docker", DockerChoice, docker.value))
        monitoring = MonitoringChoice(_prompt_enum("Monitoring", MonitoringChoice, monitoring.value))
        frontend = FrontendChoice(_prompt_enum("Frontend", FrontendChoice, frontend.value))

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

    try:
        project_dir = render_project(config=config, destination=output_dir.resolve())
    except FileExistsError as exc:
        console.print(f"[bold red]Error:[/bold red] {exc}")
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
    console.print("fastai-stack 0.1.0")


if __name__ == "__main__":
    app()
