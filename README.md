# Portfolio Website

A responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Features project filtering with multi-select dropdowns, skill tags, and a split-view detail panel.

## Quick Start

```bash
# No build step required - just open index.html in browser
```

Or with a local server:

```bash
python -m http.server 8000
# Open http://localhost:8000
```

## Project Structure

```
farhanriz.github.io/
├── index.html              # Main HTML file
├── README.md               # This file
├── DEVELOPMENT.md          # Detailed development docs (git-ignored)
├── .gitignore
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles
│   ├── js/
│   │   └── main.js         # All JavaScript logic
│   ├── images/
│   │   └── profile.jpg     # Profile photo
│   └── data/
│       ├── portfolio.js   # Portfolio data (generated)
│       ├── import_notion.py    # Generate portfolio.js from CSV
│       ├── get_data.py          # Fetch from Google Sheets
│       ├── .env.example         # Environment template
│       ├── sheets_data/         # CSV from Google Sheets (git-ignored)
│       └── templates/          # CSV templates
```

## Features

- **Multi-select filter dropdowns** - Filter by Task, Tools, Output, Year (AND between categories, OR within)
- **Skill-based filtering** - Click skills in Skills section to filter projects
- **Selected tags display** - Shows active filters with remove buttons
- **Split-view detail panel** - Project details alongside the grid
- **Dark/Light theme** - Toggle in header/footer, persisted in localStorage
- **Responsive design** - Mobile and desktop friendly

## Data Management

Portfolio data is managed through Google Sheets or local CSV files.

### CSV Template Structure

Templates are in `assets/data/templates/`. Each file has a specific structure:

#### 1. Projects

| Column | Required | Description |
|--------|----------|-------------|
| `Name` | Yes | Project title |
| `Company` | Yes | "Personal" or company name |
| `Role` | No | Your role in the project |
| `Task` | Yes | Task categories (semicolon-separated) |
| `Tools` | Yes | Tools used (semicolon-separated) |
| `Output` | No | Output type: Article, Dashboard, etc |
| `Year` | Yes | 4-digit year (e.g., 2024) |
| `Description` | No | Brief project description |
| `Link` | No | URL to project |
| `Image` | No | Leave empty for auto-generated |

```csv
Name,Company,Role,Task,Tools,Output,Year,Description,Link,Image
E-commerce Dashboard,Personal,Data Analyst,Data Visualization; Data Analysis,"Python; SQL; Tableau",Dashboard,2024,Sales analysis dashboard,,,
```

#### 2. Technical Skills

| Column | Required | Description |
|--------|----------|-------------|
| `Name` | Yes | Skill name |

```csv
Name
Data Analysis
Data Visualization
SQL
Python
```

#### 3. Soft Skills

| Column | Required | Description |
|--------|----------|-------------|
| `Name` | Yes | Soft skill name |

```csv
Name
Communication
Problem Solving
Leadership
```

#### 4. Tools

| Column | Required | Description |
|--------|----------|-------------|
| `Name` | Yes | Tool name |
| `Category` | No | Category (Programming, Database, Visualization, GIS, etc.) |

```csv
Name,Category
Python,Programming
SQL,Database
Tableau,Visualization
QGIS,Gis
```

**Notes:**
- Multi-value fields (Task, Tools, Output) use semicolon (`;`) as separator
- Year must be 4-digit
- Image left empty = auto-generated placeholder from picsum.photos
- Task values in projects must match Technical Skills for filter sync

### Setup Google Sheets (Optional)

1. Create Google Cloud project, enable Sheets API
2. Create service account, download JSON credentials as `credentials.json`
3. Share spreadsheet with service account email
4. Configure environment:

```bash
cp assets/data/.env.example assets/data/.env
# Edit .env with your spreadsheet ID
```

### Update Portfolio Data

```bash
# Fetch from Google Sheets and regenerate portfolio.js
python assets/data/get_data.py --update

# Or use local CSV files only
python assets/data/import_notion.py --local
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Variables, Flexbox, Grid
- **JavaScript** - Vanilla ES6+
- **Python** - Data import scripts
- **Google Sheets API** - Optional data source

## License

MIT