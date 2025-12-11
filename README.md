# Daily-news-scraper


This project is an autonomous, exam-focused news extraction engine for RBI Grade B (General) – GA + ESI + Finance. It leverages [newspaper3k](https://newspaper.readthedocs.io/en/latest/user_guide/quickstart.html#) and other tools to scan, ingest, and synthesize news only from a curated set of authoritative government, regulatory, and financial sources, including:

- Press Information Bureau (PIB)
- Ministry of Finance (DEA)
- Reserve Bank of India (RBI)
- MOSPI
- PRS India
- Yojana, Kurukshetra
- Economic Times, Livemint, Business Standard, The Hindu, Indian Express
- World Bank, IMF, UNDP, WEF

The engine strictly enforces T-1 date filtering, keyword/topic/domain matching, and produces Excel and summary outputs for RBI exam preparation. All SMS and unrelated features have been removed for compliance and focus.

This software is an autonomous news extraction engine designed specifically for RBI Grade B (General) – GA + ESI + Finance coverage. It scans, crawls, ingests, parses, and synthesizes ONLY VERIFIED news from authoritative sources, strictly adhering to RBI exam requirements.

## Key Features
- **Authoritative Source Extraction:**
   - Only scans and extracts news from a curated list of RBI-relevant, government, and financial news sources.
- **T-1 Date Filtering:**
   - Extracts news strictly from the previous day (T-1), ensuring up-to-date coverage for daily exam preparation.
- **Batch ID System:**
   - Each extraction run is tagged with a unique batch ID for traceability and repeatability.
- **Strict Keyword/Topic/Domain Matching:**
   - Filters news based on RBI exam-relevant keywords, topics, and domains.
- **EFI Scoring:**
   - Assigns an Exam-Focused Intelligence (EFI) score to each news item for prioritization.
- **Excel Output:**
   - Generates two Excel files: one for accepted news and one for rejected news, with all required metadata.
- **Summary Report:**
   - Produces a summary report detailing batch statistics, source coverage, and extraction outcomes.
- **Robust Error Handling:**
   - Handles missing data, parsing errors, and network issues gracefully.
- **Modular & Repeatable:**
   - Designed for daily, repeatable runs with minimal manual intervention.

## How It Was Developed
1. **Environment Setup:**
   - Python virtual environment created for isolation.
   - Dependencies installed: `newspaper3k`, `pandas`, `openpyxl`, `lxml_html_clean`.
2. **Script Refactoring:**
   - Removed non-essential features (SMS, Bitly) for compliance and simplicity.
   - Implemented batch ID, T-1 date logic, and strict source/keyword filtering.
   - Added EFI scoring and modular output logic.
3. **GA_ESI_keywords Collection:**
   - The `GA_ESI_keywords` list was curated by analyzing previous years' RBI Grade B (General) exam papers, official notifications, and authoritative government/financial news sources.
   - Keywords were selected to cover high-frequency topics, schemes, personalities, indices, government programs, economic terms, and current affairs relevant to General Awareness (GA), Economic & Social Issues (ESI), and Finance.
   - The list is periodically updated to reflect emerging trends and new topics in the RBI exam ecosystem.
4. **Output & Reporting:**
   - Integrated Excel output for accepted/rejected news.
   - Automated summary report generation for each batch.
5. **Testing & Debugging:**
   - Iteratively tested and debugged for missing dependencies, parsing errors, and output compliance.

## Usage Instructions
1. **Install Dependencies:**
    ```bash
    pip install newspaper3k pandas openpyxl lxml_html_clean
    ```
2. **Run the Script:**
    ```bash
    python news_scraper.py
    ```
3. **Review Output:**
    - Check the generated Excel files and summary report in the working directory.

## Pros
- **Highly Targeted:** Only extracts news relevant to RBI Grade B exam.
- **Automated & Repeatable:** Minimal manual effort required for daily runs.
- **Strict Compliance:** Adheres to exam protocol for date, source, and content.
- **Transparent Reporting:** Batch ID and summary report for auditability.
- **Error Resilient:** Handles common extraction and parsing errors.

## Cons
- **Source Limitation:** Only works with predefined authoritative sources; new sources require code update.
- **Dependency Heavy:** Requires several Python packages; may need manual installation.
- **No Real-Time Updates:** Extracts news only for T-1; not suitable for real-time monitoring.
- **No SMS/URL Shortening:** Removed SMS and Bitly features for compliance, so no direct notifications or short links.
- **Limited Customization:** Strict protocol may limit flexibility for other use cases.

## License
See LICENSE file for details.

## Contact
For issues or feature requests, please open an issue in this repository.

## Prerequisites

This project also uses an .env file to store the API key, username and mobile number
Both can be obtained by [signing up/logging into Africas Talking](https://www.account.africastalking.com/)
An env example is provided for reference.

## Step 1

Clone this repo to a suitable location.

`git clone https://github.com/KenMwaura1/daily-news-scraper`

OR

Download the zip and extract it.

## Step 2

Change into the directory.

`cd daily-news-scraper`

## Step 3

Create a virtual environment (venv) to hold all of the required dependecies.Here we use
the built-in venv module.
  
`python -m venv env`

Activate the virtual environment

`source env/bin/activate`

Create a virtual environment

   `python3 -m venv venv`

   For zsh users

   `source venv/bin/activate.zsh`

   For bash users

   `source venv/bin/activate.bash`

   For fish users

   `source venv/bin/activate.fish`

Alternatively if you are using [pyenv](https://github.com/pyenv/pyenv)

```shell
pyenv virtualenv daily-news-scraper
pyenv activate daily-news-scraper
   ```

## Step 4

Install the required dependencies:

`pip install -r requirements`  

## Step 5

Create `.env` file and add your credentials as specified.

`touch .env`

OR

Copy the provided  example and edit as required:

`cp .env-example env`

## Step 6

Run the script

`python news_scraper.py`
