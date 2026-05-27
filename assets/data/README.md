# Portfolio Data Management

## Directory Structure

```
assets/data/
├── .env.example              # Environment variables template
├── credentials.json           # Google service account (you need to download this)
├── get_data.py                # Fetch data from Google Sheets
├── import_notion.py           # Generate portfolio.js from CSV
├── portfolio.js               # Generated portfolio data
├── sheets_data/               # CSV files from Google Sheets (auto-generated)
│   ├── projects.csv
│   ├── technical_skills.csv
│   ├── soft_skills.csv
│   └── tools.csv
└── templates/                 # CSV templates
    ├── projects_template.csv
    ├── technical_skills_template.csv
    ├── soft_skills_template.csv
    └── tools_template.csv
```

## Setup

### 1. Google Sheets API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create a Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Create a service account
   - Add "Editor" role to the service account
5. Create API Key:
   - Go to the service account
   - "Keys" tab > "Add Key" > "JSON"
   - Download the JSON file and save as `credentials.json` in this directory
6. Share your Google Spreadsheet with the service account email (found in the JSON file, looks like `name@project.iam.gserviceaccount.com`)

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` and set:
- `GOOGLE_SERVICE_ACCOUNT_FILE=credentials.json`
- `GOOGLE_SPREADSHEET_ID=your_spreadsheet_id`

### 3. Install Dependencies

```bash
pip install gspread python-dotenv
```

## Google Sheets Structure

Create a spreadsheet with these sheets:

### Sheet: Projects
| Name | Company | Role | Task | Tools | Output | Year | Description | Link | Image |
|------|---------|------|------|-------|--------|------|-------------|------|-------|

- **Task, Tools, Output**: Separate multiple values with semicolon (`;`)
- **Year**: 4-digit year (e.g., 2024)
- **Link**: URL to project (optional)
- **Image**: Leave empty to use auto-generated placeholder

### Sheet: Technical Skills
| Name |
|------|
| Data Analysis |
| Data Visualization |
| ... |

### Sheet: Soft Skills
| Name |
|------|
| Communication |
| Problem Solving |
| ... |

### Sheet: Tools
| Name | Category |
|------|----------|
| Python | Programming |
| SQL | Database |
| ... |

## Usage

### Fetch data from Google Sheets

```bash
# Fetch all sheets and save as CSV
python get_data.py

# Fetch and automatically update portfolio.js
python get_data.py --update
```

### Generate portfolio.js from local CSV

```bash
# Use sheets_data/ CSVs (after fetching from Google)
python import_notion.py

# Or use specific CSV files
python import_notion.py --local
```

### Workflow

1. Update data in Google Sheets
2. Run `python get_data.py` to fetch latest data as CSV
3. Run `python import_notion.py` to regenerate `portfolio.js`
4. Commit and push changes

## Notes

- The `portfolio.js` file is generated and should NOT be edited manually
- All changes should be made in Google Sheets
- The `credentials.json` contains sensitive data - DO NOT commit it
- Profile and Experience data are currently hardcoded in `import_notion.py`