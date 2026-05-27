import csv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = BASE_DIR

def parse_list_field(value):
    if not value:
        return []
    return [item.strip() for item in value.split(',') if item.strip()]

def deduplicate_keep_order(items):
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

def generate_projects(projects_csv):
    filepath = os.path.join(DATA_DIR, projects_csv)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    projects = []
    for i, row in enumerate(rows):
        title = row.get('Name', '')
        year_str = row.get('Year', '')
        year = int(year_str) if year_str.strip().isdigit() else None
        task = parse_list_field(row.get('Task', ''))
        tools = parse_list_field(row.get('Tools', ''))
        projects.append({
            'title': title,
            'year': year,
            'description': '',
            'tags': {
                'task': task,
                'tools': tools,
                'output': []
            },
            'image': f'https://picsum.photos/400/250?random={i+10}'
        })
    sorted_projects = sorted(projects, key=lambda x: (x['year'] or 0), reverse=True)
    return sorted_projects

def generate_skills_task(skills_csv):
    filepath = os.path.join(DATA_DIR, skills_csv)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        lines = [line.strip() for line in f if line.strip() and line.strip() != 'Name']
    return lines

def generate_skills_soft(skills_csv):
    filepath = os.path.join(DATA_DIR, skills_csv)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        lines = [line.strip() for line in f if line.strip() and line.strip() != 'Name']
    return lines

def generate_skills_tools(tools_csv):
    filepath = os.path.join(DATA_DIR, tools_csv)
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        lines = [line.strip() for line in f if line.strip()]
    if not lines:
        return []
    header = lines[0].split(',')
    name_idx = header.index('Name') if 'Name' in header else 0
    tools = []
    for line in lines[1:]:
        parts = line.split(',')
        if parts and parts[name_idx].strip():
            tools.append(parts[name_idx].strip())
    return deduplicate_keep_order(tools)

def generate_portfolio():
    projects = generate_projects('Projects 68e0d9fb5920463195135579f661d279_all.csv')
    skills_task = generate_skills_task('Technical Skills e9cfbe0ce611433f9ce586c6c69aa0cf.csv')
    skills_soft = generate_skills_soft('Soft Skills 23e6f091e83a41d4abbc6f4d942a9fa7.csv')
    skills_tools = generate_skills_tools('Tools 1a9ebb5346e346879ecba885b083e177.csv')

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
        lines.append('            tags: {')
        lines.append(f'                task: {str(project["tags"]["task"])},')
        lines.append(f'                tools: {str(project["tags"]["tools"])},')
        lines.append(f'                output: {str(project["tags"]["output"])}')
        lines.append('            },')
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

if __name__ == '__main__':
    portfolio = generate_portfolio()
    output = format_js(portfolio)
    print(output)