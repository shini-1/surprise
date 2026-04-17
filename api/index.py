import os


os.environ.setdefault("REFLEX_SKIP_COMPILE", "true")
os.environ.setdefault("REFLEX_ENV_MODE", "prod")


from surprise.surprise import app as reflex_app  # noqa: E402


app = reflex_app()
