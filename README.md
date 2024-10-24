# 🌼 It's Giving... 

## 🌭 Daily Food-For-Thought 

Welcome to **It's Giving...**, your go-to app for daily inspirations and thought-provoking quotes! You can select the mood that you have woken up to day and select what quote you would want to start off your day. ☀️

## 🛠️ Getting Started

Follow these steps to set up and run the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jk021227/It-s_giving.git
   ```
   
2. **Navigate to the project directory**:
Open 2 terminals, then navigate to `Its-giving/frontend` in one of them and `Its-giving/backend` on the other one.
   ```bash
   cd Its-giving/backend
   cd Its-giving/frontend
   ```

3. **Create your .env file in the backend directory**:
    Inside the `.env` file put:
    `API_KEY="YOUR-API-KEY"`

4. **Install dependencies**:
   for the frontend do:
   ```bash
   npm install
   ```
   and for the backend do:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**:
   for the frontend do:
   ```bash
   npm run build
   npm start
   ```
   and for the backend do:
    ```bash
   python server.py
   ```

Now open your browser and go to `http://localhost:3000` & have fun! 🎉 Please click on any part of the screen except the buttons to initiate user interaction. Since the music/audios play on hover, if you don't interact with the website beforehand and try to hover the buttons it will throw `ERROR play() failed because the user didn't interact with the document first.`. It's because of a default browser policy — but the app still works! 🥺 👉 👈 

## 📡 API Integration

The app fetches daily thoughts and manifestations from our FastAPI backend. The API provides a curated list of quotes and manifestations. I used two separate APIs, ninja and ZenAPI for different categories. Here’s how it works:

- **GET /api/quote**: Fetches a daily thought/manifestation based on the specified category (e.g., motivation, love, etc.).

The cateogry is specified by the user, sent to the backend via the React frontend.

## 🧑‍💻 Resources I used

A special thanks to copilot, my previous projects, and these resources for helping me on this project:
- [typewriter effect](https://css-tricks.com/snippets/css/typewriter-effect/)
- [audio play](https://www.w3schools.com/jsref/met_audio_play.asp)