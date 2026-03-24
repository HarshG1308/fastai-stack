from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class DatabaseChoice(str, Enum):
    postgres = "postgres"
    mongodb = "mongodb"
    sqlite = "sqlite"


class AuthChoice(str, Enum):
    none = "none"
    jwt = "jwt"
    oauth2 = "oauth2"


class TaskChoice(str, Enum):
    none = "none"
    celery_redis = "celery+redis"


class AIChoice(str, Enum):
    none = "none"
    openai = "openai"
    langchain = "langchain"
    huggingface = "huggingface"


class VectorDBChoice(str, Enum):
    none = "none"
    pgvector = "pgvector"
    weaviate = "weaviate"


class DockerChoice(str, Enum):
    cpu = "cpu"
    gpu = "gpu"


class MonitoringChoice(str, Enum):
    none = "none"
    sentry = "sentry"
    prometheus = "prometheus"


class FrontendChoice(str, Enum):
    none = "none"
    htmx_vite = "htmx+vite"


@dataclass
class ProjectConfig:
    project_name: str
    project_slug: str
    db: DatabaseChoice
    auth: AuthChoice
    tasks: TaskChoice
    ai: AIChoice
    vector_db: VectorDBChoice
    docker: DockerChoice
    monitoring: MonitoringChoice
    frontend: FrontendChoice

    @property
    def use_ai(self) -> bool:
        return self.ai != AIChoice.none

    @property
    def use_postgres(self) -> bool:
        return self.db == DatabaseChoice.postgres

    @property
    def use_mongodb(self) -> bool:
        return self.db == DatabaseChoice.mongodb

    @property
    def use_sqlite(self) -> bool:
        return self.db == DatabaseChoice.sqlite

    @property
    def use_jwt(self) -> bool:
        return self.auth == AuthChoice.jwt

    @property
    def use_oauth2(self) -> bool:
        return self.auth == AuthChoice.oauth2

    @property
    def use_celery(self) -> bool:
        return self.tasks == TaskChoice.celery_redis

    @property
    def use_pgvector(self) -> bool:
        return self.vector_db == VectorDBChoice.pgvector

    @property
    def use_weaviate(self) -> bool:
        return self.vector_db == VectorDBChoice.weaviate

    @property
    def use_gpu(self) -> bool:
        return self.docker == DockerChoice.gpu

    @property
    def use_sentry(self) -> bool:
        return self.monitoring == MonitoringChoice.sentry

    @property
    def use_prometheus(self) -> bool:
        return self.monitoring == MonitoringChoice.prometheus

    @property
    def use_frontend(self) -> bool:
        return self.frontend == FrontendChoice.htmx_vite
