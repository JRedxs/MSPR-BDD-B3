from fastapi import FastAPI
from middleware import custom_middleware

app = FastAPI()

app.middleware("http")(custom_middleware)