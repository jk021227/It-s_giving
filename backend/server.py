from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import requests
import os

app = FastAPI()
load_dotenv()
api_key = os.getenv("API_KEY")

# adding CORS middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://10.20.210.190:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# possible options for category for this app is:
# anger, motivation(from different API - Zen quotes), love, success, freedom
ninja = ["anger", "love", "success", "freedom"]
@app.get("/api/quote")
async def get_quote(category: str):
    if category in ninja:
        api_url = 'https://api.api-ninjas.com/v1/quotes?category={}'.format(category)
        response = requests.get(api_url, headers={'X-Api-Key': api_key})
    else:
        api_url = "https://zenquotes.io/api/quotes"
        response = requests.get(api_url)
    
    if response.status_code == requests.codes.ok:
        # print(response.text)
        quotes = response.json()
        return {"quotes": quotes}
    else:
        # print("Error:", response.status_code, response.text)
        return {"error": response.text}


if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)