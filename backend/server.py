from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import requests

app = FastAPI()

# Adding CORS middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to the URL of your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route to fetch quotes from ZenQuotes API
@app.get("/api/quote")
async def get_quote():
    api_url = "https://zenquotes.io/api/quotes"
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        quotes = response.json()
        return {"quotes": quotes}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)