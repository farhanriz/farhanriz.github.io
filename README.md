# Portfolio Website

A responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Features headline stats, featured projects, a filterable project index, and a slide-over detail drawer.

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

- **Stats row** - Big numbers (projects, per-type counts, tools, years) computed from data; clicking a type filters the list
- **Featured projects** - Compact highlight cards for projects marked `featured: true`, with optional `impact` badge
- **Project index** - Paginated list (5 per page) with search, type switch (All / Analysis / Dashboards / Articles), domain chips, and Tools / Year multi-selects (AND between categories, OR within)
- **Skill-based filtering** - Skills that match project tags are clickable and filter the list
- **Detail drawer** - Slide-over panel; deep-linkable via `#p/<project-slug>`
- **Dark/Light theme** - Follows OS preference, toggle persisted in localStorage
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
| `Task` | Yes | Task categories (pipe-separated) |
| `Tools` | Yes | Tools used (pipe-separated) |
| `Output` | No | One or more of Analysis, Dashboard, Article (pipe-separated) |
| `Year` | Yes | 4-digit year (e.g., 2024) |
| `Description` | No | Brief project description |
| `Details` | No | Additional details (pipe-separated) |
| `Link` | No | URL to project |
| `Image` | No | Leave empty for auto-generated |
| `Featured` | No | `true` to show in the Featured section |
| `Summary` | No | One-line summary for featured cards |
| `Impact` | No | Short highlight badge, e.g. `455K doses/day peak` |

```csv
Name;Company;Role;Task;Tools;Output;Year;Description;Details;Link;Image
E-commerce Dashboard;Personal;Data Analyst;Data Visualization;Python|SQL|Tableau;Dashboard;2024;Sales analysis dashboard;Sales performance tracking|Regional analysis;;
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
Name;Category
Python;Programming
SQL;Database
Tableau;Visualization
QGIS;Gis
```

**Notes:**
- **CSV delimiter is semicolon (`;`)** - not comma, because descriptions may contain commas
- Multi-value fields (Task, Tools, Output) use pipe (`|`) as separator
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