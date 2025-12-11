# Daily News Scraper Backend

This is the backend API server for the RBI Grade B Daily News Scraper project.

## Features
- Runs the news extraction engine (`news_scraper.py`)
- Serves latest batch outputs (accepted, rejected, summary) as JSON for the UI
- Can be triggered via API to run a new extraction

## How to Run

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Place `news_scraper.py` in this folder.
3. Start the API server:
   ```bash
   python app.py
   ```
4. The API will be available at `http://localhost:5000`.

## API Endpoints
- `/api/accepted` — Get latest accepted news as JSON
- `/api/rejected` — Get latest rejected news as JSON
- `/api/summary` — Get latest batch summary as JSON
- `/api/run-extraction` — Trigger a new extraction run (POST)

## Notes
- The UI fetches data from these endpoints.
- Do not expose this server to the public internet without authentication.
