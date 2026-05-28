import csv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = BASE_DIR
SHEETS_DIR = os.path.join(BASE_DIR, 'sheets_data')

def parse_list_field(value):
    if not value:
        return []
    return [item.strip() for item in value.split('|') if item.strip()]

def deduplicate_keep_order(items):
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

def get_csv_path(filename, use_sheets=False):
    if use_sheets:
        path = os.path.join(SHEETS_DIR, filename)
        if os.path.exists(path):
            return path
    return os.path.join(DATA_DIR, filename)

def generate_projects(csv_filename, use_sheets=False):
    filepath = get_csv_path(csv_filename, use_sheets)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=';')
        rows = list(reader)
    projects = []
    for i, row in enumerate(rows):
        title = row.get('Name', '')
        year_str = row.get('Year', '')
        year = int(year_str) if year_str.strip().isdigit() else None
        task = parse_list_field(row.get('Task', ''))
        tools = parse_list_field(row.get('Tools', ''))
        output = parse_list_field(row.get('Output', ''))
        description = row.get('Description', '')
        details = row.get('Details', '')
        link = row.get('Link', '')
        projects.append({
            'title': title,
            'year': year,
            'description': description,
            'details': details,
            'tags': {
                'task': task,
                'tools': tools,
                'output': output
            },
            'link': link,
            'image': f'https://picsum.photos/seed/{title}/400/250'
        })
    sorted_projects = sorted(projects, key=lambda x: (x['year'] or 0), reverse=True)
    return sorted_projects

def generate_skills_task(skills_csv, use_sheets=False):
    filepath = get_csv_path(skills_csv, use_sheets)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=';')
        rows = list(reader)
    return [row.get('Name', '').strip() for row in rows if row.get('Name', '').strip()]

def generate_skills_soft(skills_csv, use_sheets=False):
    filepath = get_csv_path(skills_csv, use_sheets)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=';')
        rows = list(reader)
    return [row.get('Name', '').strip() for row in rows if row.get('Name', '').strip()]

def generate_skills_tools(tools_csv, use_sheets=False):
    filepath = get_csv_path(tools_csv, use_sheets)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=';')
        rows = list(reader)
    tools = []
    for row in rows:
        name = row.get('Name', '').strip()
        if name:
            tools.append(name)
    return deduplicate_keep_order(tools)

def generate_portfolio(use_sheets=False):
    projects = generate_projects('projects.csv', use_sheets)
    skills_task = generate_skills_task('technical_skills.csv', use_sheets)
    skills_soft = generate_skills_soft('soft_skills.csv', use_sheets)
    skills_tools = generate_skills_tools('tools.csv', use_sheets)

    experiences = [
        {
            'year': 'July 2025 - Present',
            'company': 'Sekolah.mu',
            'companyInfo': 'Semesta Integrasi Digital - provides education and career solutions through schools, courses, digital platforms, and consulting services',
            'role': 'Senior Data Analyst',
            'points': [
                'Acted as a data consultant to support decision-making across multiple functions and business units',
                'Designed, developed, and maintained data models, master data, and outputs such as reports and dashboards',
                'Prepared, scraped, and developed spatial data, including preprocessing for master data development, analysis, and visualization',
                'Technology: dbt, SQL, Python, Metabase'
            ]
        },
        {
            'year': 'Feb 2021 - June 2025',
            'company': 'Jabar Digital Service',
            'companyInfo': 'Government digital service agency for West Java province',
            'role': 'Data Analyst',
            'points': [
                'Data analysis and visualization for government reports',
                'Dashboard development and maintenance',
                'Stakeholder reporting and data support'
            ]
        },
        {
            'year': 'Nov 2020 - Jan 2022',
            'company': 'Revou',
            'companyInfo': '12-week data analytics program - teaching assistant role',
            'role': 'Team Lead for Full-Stack Data Analytics Program',
            'points': [
                'Conducted weekly Team Lead Simulation (hands-on sessions) for 12 students',
                'Provided assignment grading and feedback to oversee students\' performance',
                'Provided 1:1 sessions and supervised 3 group final projects'
            ]
        },
        {
            'year': 'Nov 2020 - Jan 2021',
            'company': 'Labkesda Jawa Barat',
            'companyInfo': 'West Java Provincial Health Laboratory',
            'role': 'Data Entry & Management',
            'points': [
                'Input data into systems accurately and efficiently',
                'Created and maintained simple data management systems using spreadsheets',
                'Aggregated data and generated summaries to provide insights for decision-making'
            ]
        },
        {
            'year': 'Nov 2020',
            'company': 'Cariilmu.co.id',
            'companyInfo': 'Educational platform',
            'role': 'Data Analyst Intern',
            'points': [
                'Cleansing sales, HR, and ratings data',
                'Maintained monitoring spreadsheet data (sales, HR, ratings)',
                'Created pivot table to give insight about summary of the data'
            ]
        }
    ]

    portfolio = {
        'profile': {
            'name': 'Muhammad Farhan Rizaldi',
            'role': 'Data Analyst | Analytics Engineer | Spatial Analyst | Business Intelligence Analyst',
            'image': 'assets/images/profile.jpg',
            'email': 'rizaldifarhan@gmail.com',
            'github': 'https://github.com/farhanriz',
            'linkedin': 'https://www.linkedin.com/in/farhanrizaldi/',
            'medium': 'https://medium.com/@rizaldifarhan',
            'intro': 'Data Analyst with 4+ years experience. A well-planned, attention to detail, and creative person. Interested in data analysis and spatial/GIS analysis, and data management & governance. Have a high desire to learn something new.<br><br>Let\'s Collaborate!'
        },
        'projects': projects,
        'skills': {
            'task': skills_task,
            'tools': skills_tools,
            'soft': skills_soft
        },
        'experiences': experiences
    }

    return portfolio

def format_js(portfolio):
    lines = ['const portfolio = {']
    lines.append('    profile: {')
    profile = portfolio['profile']
    for key, value in profile.items():
        if isinstance(value, str):
            lines.append(f'        {key}: "{value}",')
        else:
            lines.append(f'        {key}: {value},')
    lines.append('    },')
    lines.append('')
    lines.append('    projects: [')

    for project in portfolio['projects']:
        lines.append('        {')
        lines.append(f'            title: "{project["title"]}",')
        lines.append(f'            year: {project["year"]},')
        lines.append(f'            description: "{project["description"]}",')
        lines.append(f'            details: "{project.get("details", "")}",')
        lines.append('            tags: {')
        lines.append(f'                task: {str(project["tags"]["task"])},')
        lines.append(f'                tools: {str(project["tags"]["tools"])},')
        lines.append(f'                output: {str(project["tags"]["output"])}')
        lines.append('            },')
        lines.append(f'            link: "{project.get("link", "")}",')
        lines.append(f'            image: "{project["image"]}"')
        lines.append('        },')
    lines.append('    ],')
    lines.append('')
    lines.append('    skills: {')
    lines.append(f'        task: {str(portfolio["skills"]["task"])},')
    lines.append(f'        tools: {str(portfolio["skills"]["tools"])},')
    lines.append(f'        soft: {str(portfolio["skills"]["soft"])}')
    lines.append('    },')
    lines.append('')
    lines.append('    experiences: [')
    for exp in portfolio['experiences']:
        lines.append('        {')
        lines.append(f'            year: "{exp["year"]}",')
        lines.append(f'            company: "{exp["company"]}",')
        lines.append(f'            companyInfo: "{exp["companyInfo"]}",')
        lines.append(f'            role: "{exp["role"]}",')
        points_str = '[' + ', '.join(f'"{p}"' for p in exp["points"]) + ']'
        lines.append(f'            points: {points_str}')
        lines.append('        },')
    lines.append('    ]')
    lines.append('};')

    return '\n'.join(lines)

def update_portfolio_from_csv(use_sheets=True, output_file=None):
    portfolio = generate_portfolio(use_sheets=use_sheets)
    output = format_js(portfolio)

    if output_file is None:
        output_file = os.path.join(DATA_DIR, 'portfolio.js')

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(output)

    print(f'Portfolio updated: {output_file}')
    return portfolio

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Import portfolio data')
    parser.add_argument('--local', action='store_true', help='Use local CSV files instead of sheets_data')
    parser.add_argument('--output', type=str, help='Output JS file path')
    args = parser.parse_args()

    use_sheets = not args.local
    portfolio = update_portfolio_from_csv(use_sheets=use_sheets, output_file=args.output)
    print(f'Projects: {len(portfolio["projects"])}')
    print(f'Skills task: {len(portfolio["skills"]["task"])}')
    print(f'Skills soft: {len(portfolio["skills"]["soft"])}')
    print(f'Tools: {len(portfolio["skills"]["tools"])}')