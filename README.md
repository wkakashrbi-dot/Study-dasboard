# Daily-news-scraper

This project is an autonomous news acquisition and processing engine designed to scan, ingest, and structure information from a curated set of authoritative public sources. It leverages the capabilities of tools such as `newspaper3k` to retrieve and parse articles while enforcing strict source and date controls.

The system executes daily ingestion cycles, applies topic- and keyword-based filtering, and exports structured outputs for downstream analytical workflows. All optional communication or auxiliary modules have been removed to keep the system lean, compliant, and narrowly focused on content extraction and classification.

## Key Features

* **Curated Source Extraction:**

  * Fetches and processes articles exclusively from a predefined list of verified and trusted sources.
* **Date-Based Filtering:**

  * Retrieves content strictly from the previous day to maintain freshness and consistency.
* **Batch Identification:**

  * Every run is tagged with a unique batch ID for tracking and reproducibility.
* **Keyword/Topic Classification:**

  * Filters ingested content based on a configurable keyword and domain taxonomy.
* **Relevance Scoring:**

  * Assigns an internal relevance score to each article for prioritization and analytical ranking.
* **Excel Output Generation:**

  * Produces two structured Excel files: accepted items and filtered-out items, each with detailed metadata.
* **Summary Reporting:**

  * Generates a summary describing ingestion metrics, source coverage, and processing outcomes.
* **Error Handling Framework:**

  * Manages parsing failures, malformed pages, and connectivity issues in a controlled manner.
* **Modular Architecture:**

  * Designed for repeatable, daily operation with minimal manual oversight.

## How It Was Developed

1. **Environment Configuration:**

   * Implemented an isolated Python environment.
   * Installed required libraries such as `newspaper3k`, `pandas`, `openpyxl`, and `lxml_html_clean`.
2. **Codebase Refactoring:**

   * Removed non-core features to streamline the system.
   * Added date logic, batch identifiers, and controlled source/keyword filters.
   * Integrated a scoring mechanism and modular output routines.
3. **Keyword Library Construction:**

   * A structured keyword list was built by analyzing past data patterns and topic categories relevant to the intended use-case.
   * This taxonomy covers recurring themes, entities, domain-specific terms, and emerging trends.
   * The list is periodically updated to reflect changes in the information landscape.
4. **Output & Reporting Layer:**

   * Added automated generation of Excel outputs for accepted and excluded items.
   * Implemented batch-level summary reporting.
5. **Testing Cycle:**

   * Conducted iterative testing for dependency issues, parser robustness, and output consistency.

## Usage Instructions

1. **Install Dependencies:**

   ```bash
   pip install newspaper3k pandas openpyxl lxml_html_clean
   ```
2. **Execute the Script:**

   ```bash
   python news_scraper.py
   ```

## License

See LICENSE file for details.

## Contact

Submit issues or enhancement requests in the repository.

