# Daily-news-scraper


This project is an autonomous, exam-focused news extraction engine for RBI Grade B (General) – GA + ESI + Finance. It leverages [newspaper3k](https://newspaper.readthedocs.io/en/latest/user_guide/quickstart.html#) and other tools to scan, ingest, and synthesize news only from a curated set of authoritative government, regulatory, and financial sources, including:

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



## License
See LICENSE file for details.

## Contact
For issues or feature requests, please open an issue in this repository.

## Prerequisites

## Step 1

