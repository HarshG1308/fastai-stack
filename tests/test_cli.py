from pathlib import Path

from typer.testing import CliRunner

from fastai_stack.cli import app

runner = CliRunner()


def test_create_non_interactive_sqlite(tmp_path: Path) -> None:
    result = runner.invoke(
        app,
        [
            "create",
            "testapp",
            "--non-interactive",
            "--db",
            "sqlite",
            "--auth",
            "none",
            "--tasks",
            "none",
            "--ai",
            "none",
            "--vector-db",
            "none",
            "--docker",
            "cpu",
            "--monitoring",
            "none",
            "--frontend",
            "none",
            "--output-dir",
            str(tmp_path),
        ],
    )

    assert result.exit_code == 0
    project_dir = tmp_path / "testapp"
    assert project_dir.exists()
    assert (project_dir / "app" / "main.py").exists()
    assert (project_dir / "docker-compose.yml").exists()
    assert (project_dir / "pyproject.toml").exists()
