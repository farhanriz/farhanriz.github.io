# Portfolio Website

A responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Features project filtering with multi-select dropdowns, skill tags, and a split-view detail panel.

## Features

- **Multi-select filter dropdowns** - Filter projects by Task, Tools, Output, Year with AND/OR logic
- **Skill-based filtering** - Click skills in the Skills section to filter projects
- **Selected tags display** - Shows active filters with remove buttons
- **Split-view detail panel** - Project details appear alongside the grid
- **Dark/Light theme** - Toggle between themes, persisted in localStorage
- **Responsive design** - Works on mobile and desktop
- **Google Sheets integration** - Update portfolio data via Google Sheets

## Quick Start

```bash
# No build step required - just open index.html in browser
```

Or with a local server:

```bash
python -m http.server 8000
# Open http://localhost:8000
```

## Data Management

Portfolio data is managed through Google Sheets or local CSV files.

### Setup Google Sheets

1. Create a Google Cloud project and enable Google Sheets API
2. Create a service account and download JSON credentials
3. Share your spreadsheet with the service account email
4. Copy `.env.example` to `.env` and configure

```bash
cp assets/data/.env.example assets/data/.env
```

### Update Portfolio Data

```bash
# Fetch from Google Sheets
python assets/data/get_data.py --update

# Or use local CSV files
python assets/data/import_notion.py --local
```

See [assets/data/README.md](assets/data/README.md) for detailed setup instructions.

## Project Structure

```
├── index.html              # Main HTML
├── assets/
│   ├── css/styles.css      # Styles
│   ├── js/main.js          # JavaScript
│   └── data/
│       ├── portfolio.js    # Portfolio data (generated)
│       ├── get_data.py     # Google Sheets fetcher
│       ├── import_notion.py # CSV to portfolio.js generator
│       ├── sheets_data/    # CSV from Google Sheets
│       └── templates/      # CSV templates
```

## Tech Stack

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Sheets API (optional)
- Python for data import

## License

MIT