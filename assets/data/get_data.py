import os
import csv
import json
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

SERVICE_ACCOUNT_FILE = os.environ.get('GOOGLE_SERVICE_ACCOUNT_FILE', 'credentials.json')
SPREADSHEET_ID = os.environ.get('GOOGLE_SPREADSHEET_ID')
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(DATA_DIR, 'sheets_data')

SHEETS_CONFIG = {
    'projects': {
        'sheet_name': 'Projects',
        'file': 'projects.csv'
    },
    'technical_skills': {
        'sheet_name': 'Technical Skills',
        'file': 'technical_skills.csv'
    },
    'soft_skills': {
        'sheet_name': 'Soft Skills',
        'file': 'soft_skills.csv'
    },
    'tools': {
        'sheet_name': 'Tools',
        'file': 'tools.csv'
    }
}


def get_gspread_client():
    import gspread
    gc = gspread.service_account(filename=SERVICE_ACCOUNT_FILE)
    return gc


def fetch_sheet_data(spreadsheet_id, sheet_name):
    gc = get_gspread_client()
    sh = gc.open_by_key(spreadsheet_id)
    worksheet = sh.worksheet(sheet_name)
    data = worksheet.get_all_values()
    return data


def save_as_csv(data, filepath):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        for row in data:
            writer.writerow(row)
    print(f'Saved: {filepath}')


def fetch_all_sheets():
    if not SPREADSHEET_ID:
        print('Error: GOOGLE_SPREADSHEET_ID not set in environment or .env file')
        return False

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for key, config in SHEETS_CONFIG.items():
        try:
            print(f'Fetching sheet: {config["sheet_name"]}...')
            data = fetch_sheet_data(SPREADSHEET_ID, config['sheet_name'])
            filepath = os.path.join(OUTPUT_DIR, config['file'])
            save_as_csv(data, filepath)
        except Exception as e:
            print(f'Error fetching {config["sheet_name"]}: {e}')
            continue

    print('\nAll sheets fetched successfully!')
    return True


def update_portfolio():
    print('Updating portfolio.js from sheets data...')
    import import_notion
    import_notion.update_portfolio_from_csv()
    print('Portfolio updated!')


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Fetch data from Google Sheets')
    parser.add_argument('--update', action='store_true', help='Also update portfolio.js after fetching')
    args = parser.parse_args()

    success = fetch_all_sheets()

    if success and args.update:
        update_portfolio()