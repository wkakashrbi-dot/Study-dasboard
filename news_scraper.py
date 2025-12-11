import os
import newspaper
from datetime import datetime, timedelta
import pandas as pd

# --- RBI-GA Extraction Suite v1.0 Scaffold ---

# Authoritative sources
priority_1_urls = [
    "https://pib.gov.in",
    "https://dea.gov.in",
    "https://pib.gov.in/PressReleaseIframePage.aspx?MinID=36",
    "https://www.rbi.org.in",
    "https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx",
    "https://www.rbi.org.in/scripts/NotificationUser.aspx",
    "http://mospi.nic.in",
    "http://www.mospi.nic.in/statistical-release",
    "https://prsindia.org",
    "https://yojana.gov.in",
    "https://kurukshetra.gov.in"
]
priority_2_urls = [
    "https://economictimes.indiatimes.com/news/economy",
    "https://economictimes.indiatimes.com/news/government",
    "https://economictimes.indiatimes.com/industry/banking",
    "https://www.livemint.com/economy",
    "https://www.livemint.com/industry",
    "https://www.business-standard.com/economy-policy",
    "https://www.business-standard.com/finance",
    "https://www.thehindu.com/business",
    "https://indianexpress.com/section/explained",
    "https://indianexpress.com/section/business"
]
priority_3_urls = [
    "https://www.worldbank.org/en/country/india",
    "https://www.imf.org/en/Publications",
    "https://hdr.undp.org",
    "https://www.weforum.org/reports"
]

# Batch ID for daily run
today = datetime.now()
t1_date = today - timedelta(days=1)
batch_id = f"{today.strftime('%Y-%m-%d')}_Report"

# Output containers
accepted_news = []
rejected_news = []

# Placeholder for strict output format

# EFI scoring logic
def compute_efi_score(article):
    # Simple scoring based on presence of keywords and source type
    relevance = 5 if keyword_match(article.title + " " + article.text) else 0
    data = 5 if any(char.isdigit() for char in article.title + article.text) else 3
    policy = 5 if any(kw in article.title for kw in ["RBI", "SEBI", "Cabinet", "Ministry", "Policy", "Guideline", "Notification", "Circular", "Budget"]) else 3
    recurrence = 5 if keyword_match(article.title + " " + article.text) else 3
    efi_score = (relevance + data + policy + recurrence) * 5
    if efi_score >= 80:
        efi_cat = "MUST STUDY"
    elif efi_score >= 60:
        efi_cat = "IMPORTANT"
    elif efi_score >= 40:
        efi_cat = "MODERATE"
    elif efi_score >= 20:
        efi_cat = "LOW"
    else:
        efi_cat = "IGNORE"
    return relevance, data, policy, recurrence, efi_score, efi_cat

def format_news_item(headline, source, date, category, keywords, url, article=None):
    relevance, data, policy, recurrence, efi_score, efi_cat = compute_efi_score(article) if article else ("", "", "", "", "", "")
    return {
        "title": headline,
        "summary": article.text[:500] if article and hasattr(article, 'text') else "",
        "category": category,
        "RelevanceWeight": relevance,
        "DataWeight": data,
        "PolicyWeight": policy,
        "RecurrenceWeight": recurrence,
        "EFI_Score": efi_score,
        "EFI_Category": efi_cat,
        "Possible_MCQs": [],
        "source": source,
        "date": date,
        "url": url,
        "keywords": keywords,
        "EFI_Summary": f"EFI Summary → {efi_score}/100: {efi_cat}"
    }

# Placeholder for Excel writing
def write_excel(filename, data, columns):
    df = pd.DataFrame(data, columns=columns)
    df.to_excel(filename, index=False)



# --- Extraction logic: T-1 date filter + keyword/topic/domain matching ---
GA_ESI_keywords = [
    "Girnar Ropeway", "BRICS", "Budget", "PMEGP", 
    "Padma Vibhushan", "Electoral Bond", "Census", 
    "Wheat-Producing", "PMFBY", "India Innovation Index", 
    "IFC", "GUARD", "UPI", "PM-WANI", "SDG", 
    "Strategic Sectors", "CLAY Countries", "SLBC", 
    "Anti-Corruption Day", "Bimal Jalan", "CIMS", 
    "SVAMITVA", "Sur Sarovar", "Atma Nirbhar Swasth Bharat Yojana", 
    "KGBV", "PLI Scheme", "LIC", "CECPA", "Cambodia", "Telecom", 
    "Janet Yellen", "ISO 9000", "Aspirational Districts", 
    "NITI Aayog", "Agriculture First Advance Estimates", 
    "MSP Announcements", 
    "State-Specific Government Announcements", 
    "RBI Policy Guidelines", 
    "RBI Circulars", 
    "Major Sports Events", 
    "Reports & Indices", "International Important Days", 
    "National Celebrations", 
    "Corporate Announcements", 
    "Defence Systems", "High-Level Appointments", "NDEAR", 
    "Digital Education Framework", "Company Announcements", 
    "Fourth Five-Year Plan", "Territorial Army", "PNB", 
    "UNEP Young Champions", "Dhubri–Phulbari Bridge", 
    "Christine Lagarde", "NSFE", "Oakridge Energy", 
    "Sea Wing Glider", "J&K–NAFED MoU", "RuPay", 
    "NAVARITHEE", "TRIFED", "Pont Dam Sanctuary", 
    "Kisan Kalyan Mission", "World Bank", 
    "CEPI Centralized Testing Labs", "BP Kanungo", "Andhra Pradesh", 
    "Madhya Pradesh", "Lamheta", "Singareni Coalfields", 
    "Delimitation Commission", "Santosh Trophy", 
    "PKL Runner-Up", "Federal Reserve", "RRB Shareholding Ratio", 
    "PM-KISAN", "Louvre Museum", "NFHS-5", "Global Forest Cover", 
    "Climate Change Conference", "Grain-Based Ethanol Plant", 
    "Coal Miners’ Day", "T+1 Settlement", "PM-SVANidhi", 
    "Jal Jeevan Mission", "Repo Rate Revision", 
    "State of World’s Forests Report", 
    "India as 2nd Largest Fish Producer", 
    "Bond Prices and Yields", "ASEEM Portal", 
    "DACE Scheme", "OECD", "BIMSTEC", "First Geological Park", 
    "MPC Composition", "NCFE", "ECLGS", "Section 8 Company", 
    "Textile Sector", "MPC", "EPF Interest Rate", 
    "APY Contribution", "DESH-Stack", "Peacekeeping Medals", 
    "Rural Sex Ratio", "DICGC", "NMP", "Nidhi Company", 
    "JJM Beneficiaries", "GST Collection", "Education Budget", 
    "Antyodaya Campaign", "Jharokha Programme", "Sagarmala", 
    "Fertiliser Subsidy", "Fleet Card", "PayNow", "Bharat Bond ETF", 
    "FATF", "German Development Aid", "OECD Member Count", 
    "Normal Monsoon Assumption", "Memorandum of Association", 
    "FSB Membership", "Interest Payment", "SBI Card", "Kavach", 
    "National Flag Production Partner", "ISRO Project Venus", 
    "Cyclone Asani", "Covid Champion Award", 
    "Khelo India University Championship", 
    "CIA CTO", "NFSU", "World Environment Day", 
    "Wings India", 
    "Debt Recovery Tribunals", 
    "ICICI Lombard", "NEP Education Expenditure Target", 
    "Merchandise Exports", "Food Processing Week", 
    "Indian Pharma Sector", "CBDT Chairperson", 
    "Leaders, Politicians, Citizens", 
    "Indo-German Agroecology", "Miyan Ka Bada Railway Station", 
    "Phosphate Fertiliser Subsidy", "BSR System", 
    "RBI Deputy Governor", "Online Tax Payment Reporting", 
    "Bank Nationalisation", "RBI Statistical Reporting System", 
    "RBI BSR@50 Anniversary Event", "RBI Annual Report", 
    "Combined Gross Market Borrowings", 
    "Central Government Borrowings", 
    "State Government Borrowings", 
    "Government Securities", "Floating Rate Bonds", 
    "FRB Reissue", "YoY Rise in Borrowings", 
    "Global Gender Gap Index", "Grand Order of the Chain of the Yellow Star", "Suriname", "Carbon-Negative Nation", "Towns of Export Excellence", "Trilateral Highway", "e-AMRIT Mobile Application", "Economic Survey", "MV Empress", "TRAI DCA", 
    "CAG External Auditor", "Morgan Stanley India Growth Megatrends", 
    "PLI Scheme Sector Performance", "ASEAN", "BIMSTEC", 
    "Inflation upper threshold notification", "HDFC Bank", 
    "Digital Payment Index", "Mr. Money", "Mrs. Paisa", 
    "e-Way Bill Threshold", "50-year interest-free loans", 
    "Finastra FYN", "Prudential large exposure limits for NBFC-UL", 
    "ICAR–Amazon MoU", "ECB Headquarters", 
    "MRF", "Payments Vision 2025", 
    "Antardrishti Financial Inclusion Dashboard", 
    "Indian Ocean Dipole", "NIRF India Rankings", 
    "Half-Yearly Report on Management of Forex Reserves", 
    "LIC Asset Allocation", "Foreign Trade Policy", 
    "Total Expense Ratio", "Household savings", 
    "CBDC Pilot Launch", "Small Savings Scheme Interest Rates", 
    "MAVEN", "Atlantic Declaration", "Net Owned Funds for HFCs", 
    "B20 Chair", "Grain Storage Plan", 
    "RBI Digital Lending Guidelines", 
    "Net Interest Margin", "Survey of Professional Forecasters", 
    "Haryana Legislative Assembly", "NHB RESIDEX", 
    "AMRUT", "Smart Cities Mission", "PMAY-U", 
    "SEBI Consultation on UPSI", "Spinoza Prize", 
    "Malaysia Masters", "FSSAI State Food Safety Index", 
    "Agriculture & Allied Sector share in GVA", 
    "Telecommunications & IT-related services", 
    "Top FDI Source Countries", "Twenty Point Programme", 
    "Sovereign Gold Bond", "ICAI Foundation Day", 
    "US Rejoining UNESCO", "Petaflop", 
    "₹75 Commemorative Coin", 
    "NPS average monthly net subscriptions", 
    "RBI overseas gold holdings", "Transition Bonds", 
    "Minimum Net Owned Funds for NBFC-MFIs", 
    "DRS Full Form", 
    "SWAMIH Investment Vehicle", 
    "PM-KUSUM", 
    "Smart Cities Mission", 
    "SAI20 Summit", 
    "Climate Clock", "UPI", "PIDF", 
    "Gross Domestic Saving", 
    "SEBI-recognised Clearing Corporations", 
    "Bharat Bill Payment System", 
    "Article 246", 
    "ADB Country Partnership Strategy", 
    "China Gold Production", "TReDS", 
    "Domestic Systemically Important Insurers", 
    "PMAY-U 2.0", "PM MUDRA Yojana", "Union Budget Foreign Assets Rule", 
    "NPS Withdrawal Rule", "TReDS Threshold Revision", 
    "National Monetisation Pipeline", 
    "DAY-NRLM Initiative", 
    "SRI Fund", 
    "MSME Export Share", 
    "PARIVESH Portal", 
    "PMKSY Cold Chain Component", "PM-AASHA", "PM-PRANAM Scheme", 
    "Agriculture Ministry Budget", "UPI Tax Payment Limit", 
    "JP Morgan GBI-EM Index Inclusion", 
    "RBI Financial Inclusion Index", "GST Subsumed Taxes", 
    "RBI Digital Payments Index", 
    "Basic Services Demat Account", 
    "DBS Bank–RXIL TReDS Partnership", 
    "RBI Repo Rate Hike", 
    "NBFC Internal Ombudsman Norm", 
    "Depositor Education and Awareness Fund", 
    "HFC Public Deposit Tenure", "Bulk Deposit Threshold Revision", 
    "FAR Exclusion", "SFB Universal Bank Conversion Criteria", 
    "SRO Framework for FinTechs", "Risk Weights on Consumer Credit", 
    "IFSCA Powers", "Rise in Digital Payments", "INFINET Network", 
    "States Borrowing from RBI", "PSL Classification", 
    "AIFIs Regulated by RBI", "Goiporia Committee", 
    "IAASB/RAASB Net Worth Requirement", 
    "Zero Coupon Zero Principal Bonds", 
    "Monetary Policy Instruments", "IRDAI Penalty", 
    "Banking Ombudsman", "HaRBInger 2024", 
    "Brickwork Ratings Loan Limit", "Floating Rate Savings Bonds", 
    "SEBI Minimum Bond Investment", 
    "SARFAESI Act Year", "SGB Premature Redemption", 
    "NATO Secretary-General", "UNFCCC Troika", "GenAI Patents Leader", 
    "Carlos Alcaraz Grand Slam", "Abhinav Bindra Olympic Gold", 
    "Environmental Performance Index", "PUMA–AFI Kit Sponsorship", 
    "Amitabh Kant – G20 Sherpa", "Yemen – Least Peaceful", 
    "High Seas Treaty", "Lithium Triangle", "IMO Top Countries", 
    "ICICI Lombard – ELEVATE", 
    "Aditya L1", "Tenth Schedule – Anti-Defection Law", 
    "Public Examinations Act", 
    "Houthis", "Soonicorns", "House of Commons & House of Lords", 
    "10 Information Commissioners under CIC", "Top Employers", 
    "Emami", "Artistic Swimming – India Non Participation", 
    "ICOMOS AGM", "Station Shiv Shakti", 
    "Shane Watson – The Winner’s Mindset", 
    "Fincare SFB–AU SFB Merger", 
    "G7 Leaders Summit", 
    "UPI–NPI Linkage with Nepal", 
    "Scoville Heat Units", "Employment, Skilling, MSMEs, Middle Class", "AI Hallucination"
]

def keyword_match(text):
    text_lower = text.lower()
    for kw in GA_ESI_keywords:
        if kw.lower() in text_lower:
            return True
    return False

def extract_news_from_url(url, priority_label):
    try:
        news_source = newspaper.build(url)
        found_t1 = False
        for article in news_source.articles:
            try:
                article.download()
                article.parse()
                pub_date = None
                # Try to get publication date from article
                if hasattr(article, 'publish_date') and article.publish_date:
                    pub_date = article.publish_date
                elif 'date' in article.meta_data:
                    pub_date = article.meta_data['date']
                # Standardize date format
                if pub_date:
                    if isinstance(pub_date, str):
                        try:
                            pub_date = datetime.fromisoformat(pub_date)
                        except Exception:
                            try:
                                pub_date = datetime.strptime(pub_date, "%Y-%m-%d")
                            except Exception:
                                pub_date = None
                # Accept only if date matches T-1 and matches keywords
                if pub_date and pub_date.date() == t1_date.date():
                    if keyword_match(article.title + " " + article.text):
                        found_t1 = True
                        accepted_news.append(format_news_item(
                            headline=article.title,
                            source=priority_label,
                            date=pub_date.strftime('%Y-%m-%d'),
                            category="",
                            keywords=[],
                            url=article.url,
                            article=article
                        ))
                    else:
                        relevance, data, policy, recurrence, efi_score, efi_cat = compute_efi_score(article)
                        rejected_news.append({
                            "Rejected_Headline": article.title,
                            "Source": priority_label,
                            "URL": article.url,
                            "Publication_Date": pub_date.strftime('%Y-%m-%d'),
                            "Rejection_Reason": "Failed keyword relevance matching",
                            "EFI_Score": efi_score,
                            "Batch-ID": batch_id,
                            "Timestamp": today.strftime('%Y-%m-%d %H:%M:%S')
                        })
                else:
                    reason = "Not exact T-1 date" if pub_date else "Missing publication date"
                    rejected_news.append({
                        "Rejected_Headline": article.title,
                        "Source": priority_label,
                        "URL": article.url,
                        "Publication_Date": pub_date.strftime('%Y-%m-%d') if pub_date else "",
                        "Rejection_Reason": reason,
                        "EFI_Score": "",
                        "Batch-ID": batch_id,
                        "Timestamp": today.strftime('%Y-%m-%d %H:%M:%S')
                    })
            except Exception as e:
                rejected_news.append({
                    "Rejected_Headline": "",
                    "Source": priority_label,
                    "URL": url,
                    "Publication_Date": "",
                    "Rejection_Reason": f"Error: {e}",
                    "EFI_Score": "",
                    "Batch-ID": batch_id,
                    "Timestamp": today.strftime('%Y-%m-%d %H:%M:%S')
                })
        if not found_t1:
            # Log if no T-1 news found for this source
            rejected_news.append({
                "Rejected_Headline": "",
                "Source": priority_label,
                "URL": url,
                "Publication_Date": "",
                "Rejection_Reason": f"No news found for T-1 from current date {t1_date.strftime('%Y-%m-%d')}",
                "EFI_Score": "",
                "Batch-ID": batch_id,
                "Timestamp": today.strftime('%Y-%m-%d %H:%M:%S')
            })
    except Exception as e:
        rejected_news.append({
            "Rejected_Headline": "",
            "Source": priority_label,
            "URL": url,
            "Publication_Date": "",
            "Rejection_Reason": f"Source error: {e}",
            "EFI_Score": "",
            "Batch-ID": batch_id,
            "Timestamp": today.strftime('%Y-%m-%d %H:%M:%S')
        })

# Scan Priority 1 sources
for url in priority_1_urls:
    extract_news_from_url(url, "PRIORITY-1")
# Scan Priority 2 sources
for url in priority_2_urls:
    extract_news_from_url(url, "PRIORITY-2")
# Scan Priority 3 sources
for url in priority_3_urls:
    extract_news_from_url(url, "PRIORITY-3")


# Write Excel outputs (full output format)
accepted_columns = ["title","summary","category","RelevanceWeight","DataWeight","PolicyWeight","RecurrenceWeight","EFI_Score","EFI_Category","Possible_MCQs","source","date","url","keywords","EFI_Summary"]
rejected_columns = ["Rejected_Headline","Source","URL","Publication_Date","Rejection_Reason","EFI_Score","Batch-ID","Timestamp"]
write_excel(f"Accepted_{batch_id}.xlsx", accepted_news, columns=accepted_columns)
write_excel(f"Rejected_{batch_id}.xlsx", rejected_news, columns=rejected_columns)

# --- Summary Report ---
total_scanned = sum([len(priority_1_urls), len(priority_2_urls), len(priority_3_urls)])
accepted_count = len(accepted_news)
rejected_count = len(rejected_news)
top_efi_score = max([item["EFI_Score"] for item in accepted_news], default=0)
highest_efi_item = next((item for item in accepted_news if item["EFI_Score"] == top_efi_score), None)
top_domains = set([item["source"] for item in accepted_news])

summary_report = {
    "Batch-ID": batch_id,
    "Total_Scanned": total_scanned,
    "Accepted_Count": accepted_count,
    "Rejected_Count": rejected_count,
    "Top_EFI_Score": top_efi_score,
    "Highest_EFI_Item": highest_efi_item,
    "Top_Domains_Represented": list(top_domains)
}

with open(f"Summary_{batch_id}.txt", "w", encoding="utf-8") as f:
    for k, v in summary_report.items():
        f.write(f"{k}: {v}\n")
