const portfolio = {
    profile: {
        name: "Muhammad Farhan Rizaldi",
        role: "Data Analyst | Analytics Engineer | Spatial Analyst | Business Intelligence Analyst",
        image: "assets/images/profile.jpg",
        email: "rizaldifarhan@gmail.com",
        github: "https://github.com/farhanriz",
        linkedin: "https://www.linkedin.com/in/farhanrizaldi/",
        medium: "https://medium.com/@rizaldifarhan",
        intro: "Data Analyst with 5+ years experience. A well-planned, attention to detail, and creative person. Interested in data analysis and spatial/GIS analysis, and data management & governance. Have a high desire to learn something new.<br><br>Let's Collaborate!",
    },

    projects: [
        {
            title: "[Article] DRY Metadata: Save Time on dbt Documentation with Doc Blocks",
            year: 2026,
            description: "A medium article, published on Towards Data Engineering.<br><br><b>Result</b><br><img src='assets/images/dry-metadata.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><a href='https://medium.com/towards-data-engineering/dry-metadata-on-dbt-documentation-with-doc-blocks-ff62f8f90ae6' target='_blank'>Read the article here</a>",
            details: "",
            tags: {
                task: ['Data Analysis', 'Data Governance'],
                tools: ['dbt'],
                output: ['Article']
            },
            link: "https://medium.com/towards-data-engineering/dry-metadata-on-dbt-documentation-with-doc-blocks-ff62f8f90ae6",
            image: "assets/images/dry-metadata.png"
        },
        {
            title: "West Java Occupation Data Marts using dbt",
            year: 2025,
            description: "<b>Objectives</b><br>- Create & configure dbt environment, pull data, and query data source.<br>- Create several data model (datamarts) using data build tool (dbt) core versions.<br>- Using several dbt features: data modeling, testing, data model build, etc.<br><br><b>Result</b><br><img src='assets/images/westjava-occupation-datamart.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br>- Technical code: <a href='https://github.com/farhanriz/westjava_occupation_mart' target='_blank'>View on GitHub</a><br>- Medium writings: <a href='https://medium.com/@rizaldifarhan/learning-dbt-in-7-days-what-to-expect-a38e656a3421' target='_blank'>Read on Medium</a> (published in Data and Beyond)",
            details: "",
            tags: {
                task: ['Data Analysis', 'Data Management'],
                tools: ['SQL', 'Visual Studio Code', 'dbt'],
                output: ['Dashboard']
            },
            link: "https://github.com/farhanriz/westjava_occupation_mart",
            image: "assets/images/westjava-occupation-datamart.png"
        },
        {
            title: "Superstore Dashboard",
            year: 2024,
            description: "Try to monitor metrics about sales, and show it through dashboard using Power BI<br><br><b>Result</b><br><img src='assets/images/superstore-dashboard.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'>",
            details: "",
            tags: {
                task: ['Data Visualization'],
                tools: ['Power BI'],
                output: ['Dashboard']
            },
            link: "",
            image: "assets/images/superstore-dashboard.png"
        },
        {
            title: "The Look Ecommerce Dashboard",
            year: 2024,
            description: "<b>Output</b><br><img src='assets/images/the-look-ecommerce-1.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><img src='assets/images/the-look-ecommerce-2.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><img src='assets/images/the-look-ecommerce-3.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><a href='https://lookerstudio.google.com/reporting/296be2b9-b121-47fc-abab-21d890137a20' target='_blank'>View dashboard here</a>",
            details: "",
            tags: {
                task: ['Data Visualization'],
                tools: ['BigQuery', 'Looker'],
                output: ['Dashboard']
            },
            link: "https://lookerstudio.google.com/reporting/296be2b9-b121-47fc-abab-21d890137a20",
            image: "assets/images/the-look-ecommerce-1.png"
        },
        {
            title: "Hotline Dashboard",
            year: 2024,
            description: "<b>Objective:</b><br>Responsible to create end-to-end dashboard development, start from ideation, create storyboard, define metrics, define charts, and develop dashboard.<br><br><b>Result</b><br><img src='assets/images/hotline-dashboard.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'>",
            details: "",
            tags: {
                task: ['Data Visualization'],
                tools: ['SQL', 'Tableau'],
                output: ['Dashboard']
            },
            link: "",
            image: "assets/images/hotline-dashboard.png"
        },
        {
            title: "Interactive Visualization - Tourism Dashboard",
            year: 2023,
            description: "<b>Objective:</b><br>Responsible to create end-to-end dashboard development, start from ideation, create storyboard, define metrics, define charts, and develop dashboard.<br><br><b>Result</b><br><img src='assets/images/tourism-dashboard.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><a href='https://dashboard.jabarprov.go.id/id/dashboard-static/kebudayaan-dan-pariwisata' target='_blank'>View dashboard here</a>",
            details: "",
            tags: {
                task: ['Data Visualization'],
                tools: ['Tableau'],
                output: ['Dashboard']
            },
            link: "https://dashboard.jabarprov.go.id/id/dashboard-static/kebudayaan-dan-pariwisata",
            image: "assets/images/tourism-dashboard.png"
        },
        {
            title: "West Java Active Covid-19 Cases Proportion",
            year: 2021,
            description: "<b>Objectives:</b><br>Find out active cases proportion trend in West Java, breakdown by cities.<br><br><b>Result</b><br><img src='assets/images/covid-active-cases-proportion.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><a href='https://public.tableau.com/app/profile/muhammad.farhan.rizaldi/viz/1VizProporsiKasusAktif/ProporsiKasusCOVID19' target='_blank'>View dashboard here</a>",
            details: "",
            tags: {
                task: ['Data Visualization'],
                tools: ['Tableau'],
                output: ['Article']
            },
            link: "https://public.tableau.com/app/profile/muhammad.farhan.rizaldi/viz/1VizProporsiKasusAktif/ProporsiKasusCOVID19",
            image: "assets/images/covid-active-cases-proportion.png"
        },
        {
            title: "DataCo Dashboard Report",
            year: 2023,
            description: "<b>Objectives</b><br>DataCo needs to monitor their sales performance and need to deliver products faster.<br><br><b>Data Preparation</b><br>- Load Data<br>- Handling missing value<br>- Unit standarization (spatial, non spatial data)<br><br><b>Result</b><br><img src='assets/images/DataCoDashboard.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br>- Dashboard: <a href='https://public.tableau.com/app/profile/muhammad.farhan.rizaldi/viz/DataCoDashboard/SalesDash' target='_blank'>View dashboard here</a><br>- Report on Medium: <a href='https://medium.com/@rizaldifarhan/dataco-dashboard-report-dcd282168ccd' target='_blank'>Read the article here</a>",
            details: "",
            tags: {
                task: ['Data Visualization'],
                tools: ['Tableau'],
                output: ['Dashboard']
            },
            link: "https://public.tableau.com/app/profile/muhammad.farhan.rizaldi/viz/DataCoDashboard/SalesDash",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%231e3a8a' width='400' height='250'/%3E%3C/svg%3E"
        },
        {
            title: "K-Modes Clustering Sapawarga App User",
            year: 2022,
            description: "<b>Background</b><br>Sapawarga (https://jabarprov.go.id/sapawarga) is a super app developed by west java government for public service in West Java. With a commitment to seamless integration, Sapawarga is gradually becoming the central hub for all public services in West Java.<br><br>As Sapawarga grows in users, understanding their diverse characteristics is crucial. To achieve this, we plan to conduct cluster analysis, grouping users based on common traits and behaviors. This approach will help us tailor services more effectively to the specific needs of each user cluster.<br><br><b>Objectives</b><br>Understanding diverse characteristics of the sapawarga user.<br><br><b>Data Preparation</b><br>Variables: Age range, education level, type of work, region type<br><br>Data preparation step:<br>- Import data<br>- Join data<br>- Data understanding<br>- Handling missing values<br>- Re-labelling data (based on defined variables category/range)<br><br><b>Result</b><br><img src='assets/images/kmodes-clustering.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br>[confidential]",
            details: "",
            tags: {
                task: ['Data Analysis'],
                tools: ['Python', 'SQL'],
                output: ['Article']
            },
            link: "",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%231e3a8a' width='400' height='250'/%3E%3C/svg%3E"
        },
        {
            title: "DBScan Clustering for Spatial Point Data",
            year: 2023,
            description: "<b>Objectives</b><br>To find out clusters with several points that have very close locations.<br><br><b>Data Preparation</b><br>- Load Data<br>- Handling missing value<br>- Unit standarization (spatial, non spatial data)<br><br><b>Methods</b><br>DBScan Clustering<br><br><b>Result</b><br><img src='assets/images/dbscan-clustering.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br>[confidential]",
            details: "",
            tags: {
                task: ['Data Analysis', 'Spatial Analysis', 'GIS Analysis'],
                tools: ['Python', 'QGIS'],
                output: ['Article']
            },
            link: "",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%231e3a8a' width='400' height='250'/%3E%3C/svg%3E"
        },
        {
            title: "West Java Covid-19 Vaccination Analysis",
            year: 2021,
            description: "<b>Business Understanding</b><br>- <b>Problem:</b><br>  - Citizen need to get vaccinated as soon as possible<br>  - Government need to ensure vaccine delivery (stock)<br>- <b>Objective:</b><br>We must accelerate the COVID-19 vaccine consumption process and ensure stock availability and the readiness of healthcare units.<br><br><b>Point:</b><br>- <b>Health Department Stock:</b><br>  - Have lot of vaccine stock, with limited expired date<br>  - Need to deliver to healthcare clinic efficiently, more consume speed will get more stock<br>- <b>Hospital and Healthcare Unit:</b><br>  - Need to deliver vaccine to users / citizen quickly<br>  - Ensure stock availability<br>- <b>Users / Citizen</b><br>  - Need to get vaccinated ASAP, in nearest healthcare clinic<br><br><b>Result</b><br><img src='assets/images/covid-vaccination-1.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><img src='assets/images/covid-vaccination-2.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><img src='assets/images/covid-vaccination-3.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br><b>Analysis</b><br>- <b>Distribution Strategy:</b><br>  - Try to redistribution vaccines in location with low demand<br>  - Try to give stock based on demand and current stock<br>- <b>Bottleneck Identification:</b><br>  - Create and increase mobile clinic to boost vaccine consumption<br>  - Try to negotiate to national ministry to give more vaccines based on stock and demand data<br>- <b>Trend Analysis:</b> Identify seasonal<br>  - Create events in weekend<br>  - Monitor seasonal event like public holiday<br><br><b>Output</b><br>- Daily to weekly analysis report include conclusion and recommendation for stakeholders.<br><br><b>Achievements</b><br>- Monitor and deliver vaccines based on data (current stock, average demand, coverage rate, etc)<br>- Top 1 province with highest vaccine demand/consumption<br>- Achieve 58% Coverage Rate in the end 2021 (increase 38% in 4 months)<br>- Created events for vaccination day and achieve all time high vaccine consumption per day in (455K / day)",
            details: "",
            tags: {
                task: ['Data Analysis'],
                tools: ['Python', 'SQL', 'Sheets'],
                output: ['Article']
            },
            link: "",
            image: "assets/images/covid-vaccination-1.png"
        },
        {
            title: "Peta Potensi Risiko Penularan Covid-19 Jawa Barat",
            year: 2021,
            description: "<b>Objectives</b><br>Cleansing spatial data that used for scoring in transmission potential analysis/maps.<br><br><b>Data Preparation</b><br>- Load data (Point of interest spatial data)<br>- Data understanding<br>- Handling missing value<br>- Spatial join to villages, district, and cities boundaries<br>- Aggregate data by villages, district, and cities by POI categories.<br><br><b>Result</b><br><img src='assets/images/risk-map-covid.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br>- <a href='https://pikobar.jabarprov.go.id/transmission-potential' target='_blank'>View map here</a><br>- <a href='https://www.youtube.com/watch?v=5PfJMfx_D18' target='_blank'>Watch video here</a>",
            details: "",
            tags: {
                task: ['Data Analysis', 'Spatial Analysis', 'GIS Analysis'],
                tools: ['Python', 'QGIS', 'SQL'],
                output: ['Article']
            },
            link: "https://pikobar.jabarprov.go.id/transmission-potential",
            image: "assets/images/risk-map-covid.png"
        },
        {
            title: "Interactive Visualization - Open Data Jawa Barat",
            year: 2021,
            description: "<b>Objectives</b><br>Responsible to write 14 <b>storyboards</b> of interactive visualization dashboard<br><br><b>Result</b><br><img src='assets/images/opendata-storyboard.png' style='width:100%;max-width:400px;border-radius:0.5rem;border:1px solid var(--border);margin:0.5rem 0;'><br>- <a href='https://opendata.jabarprov.go.id/id/visualisasi/kemajuan-pendidikan-di-jawa-barat' target='_blank'>Kemajuan Pendidikan Jawa Barat</a><br>- <a href='https://opendata.jabarprov.go.id/id/visualisasi/penduduk-yang-bekerja-di-jawa-barat' target='_blank'>Penduduk yang Bekerja di Jawa Barat</a><br>- <a href='https://opendata.jabarprov.go.id/id/visualisasi/produksi-perikanan-tangkap--budidaya-kabupatenkota-di-jawa-barat-tahun-2013-2018' target='_blank'>Produksi Fisheries Tangkap & Budidaya</a><br>- <a href='https://opendata.jabarprov.go.id/id/visualisasi/masjid-di-jawa-barat' target='_blank'>Masjid di Jawa Barat</a><br>- <a href='https://opendata.jabarprov.go.id/id/visualisasi/perkembangan-hak-wanita-berdasarkan-indeks-pemberdayaan-gender' target='_blank'>Perkembangan Hak Wanita Berdasarkan Indeks Pemberdayaan Gender</a>",
            details: "",
            tags: {
                task: ['Data Visualization'],
                tools: [],
                output: ['Dashboard']
            },
            link: "",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%231e3a8a' width='400' height='250'/%3E%3C/svg%3E"
        },
        {
            title: "Spatial Data Integration of Administrative Region Based on GIS",
            year: 2020,
            description: "<b>Business Understanding</b><br>Trying to create spatial data integration of administrative region based on GIS, with study case in Sayang Village, Sumedang.<br><br><b>Result</b><br>An automated spatial SQL query to check administrative region polyline based on topology check and other based on national regulations.<br>Results are <b>confidential</b>.",
            details: "",
            tags: {
                task: ['Spatial Analysis', 'GIS Analysis'],
                tools: ['QGIS', 'SQL'],
                output: ['Article']
            },
            link: "",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%231e3a8a' width='400' height='250'/%3E%3C/svg%3E"
        },
    ],

    skills: {
        task: ['Data Analysis', 'Data Visualization', 'Product Analysis', 'GIS Analysis', 'Spatial Analysis', 'Data Management', 'Data Governance'],
        tools: ['DBT (Data Modeling)', 'PostgreSQL', 'GCP BigQuery', 'MySQL', 'Clickhouse', 'Python', 'Pandas-Python', 'Numpy', 'ArcGIS', 'PostGIS', 'QGIS', 'Geopandas', 'Folium', 'Autocad Civil 3D', 'Tableau', 'Looker', 'Metabase', 'Power BI', 'Seaborn', 'Plotly', 'Matplotlib', 'Visual Studio Code', 'Sheets', 'SQL'],
        soft: ['Analytical Thinking', 'Problem Solving', 'Communication', 'People Management', 'Time Management', 'Leadership']
    },

    experiences: [
        {
            year: "July 2025 - Present",
            company: "Sekolah.mu",
            companyInfo: "Semesta Integrasi Digital - provides education and career solutions through schools, courses, digital platforms, and consulting services",
            role: "Senior Data Analyst",
            points: ["Acted as a data consultant to support decision-making across multiple functions and business units", "Designed, developed, and maintained data models, master data, and outputs such as reports and dashboards", "Prepared, scraped, and developed spatial data, including preprocessing for master data development, analysis, and visualization"],
            technology: "dbt, SQL, Python, Metabase"
        },
{
            year: "Feb 2021 - June 2025",
            company: "Jabar Digital Service",
            companyInfo: "Government digital service agency for West Java province",
            role: "Data Analyst (Junior → Senior)",
            points: [
                "<b>Senior Data Analyst (Jan 2022 - June 2025)</b>",
                "Led a team of 3 data analysts to develop product analytics for <a href='https://sidebar.jabarprov.go.id/' target='_blank'>Sidebar app</a>.",
                "Developed product analytics for multiple digital products, including <a href='https://digitalservice.jabarprov.go.id/sapawarga/' target='_blank'>Sapawarga App</a>, <a href='https://opendata.jabarprov.go.id/id/' target='_blank'>Open Data Jawa Barat</a>, <a href='http://jabarprov.go.id/' target='_blank'>Portal Jabar</a>, <a href='https://desadigital.jabarprov.go.id/' target='_blank'>Platform Desa Digital</a>.",
                "Worked closely with product leaders, data leaders, and other stakeholders to turn business needs into actionable data insights.",
                "Managed end-to-end data processes: planning, collection, quality checks, EDA, and data mart development.",
                "Developed interactive dashboards and automated reports; presented insights and recommendations to stakeholders for data-driven decisions.",
                "",
                "<b>Junior Data Analyst (Feb 2021 - Dec 2021)</b>",
                "Collaborated with product, data, and development teams to support product evaluation and development through data analysis.",
                "Built dashboards and reports for public policy and product monitoring, including COVID-19 vaccination analysis in West Java.",
                "Wrote 14 interactive visualization storyboards within 5 months in <a href='https://opendata.jabarprov.go.id/id/visualisasi' target='_blank'>Open Data Jawa Barat</a>.",
                "Collect and pre-process geospatial data for spatial-based analysis <a href='https://pikobar.jabarprov.go.id/transmission-potential' target='_blank'>pikobar-transmission-potential</a>."
            ],
            technology: "SQL, Python, Tableau, Cloud Services (Clickhouse, GCP)"
        },
        {
            year: "Nov 2020 - Jan 2022",
            company: "Revou",
            companyInfo: "12-week data analytics program - teaching assistant role",
            role: "Team Lead for Full-Stack Data Analytics Program",
            points: ["Conducted weekly Team Lead Simulation (hands-on sessions) for 12 students", "Provided assignment grading and feedback to oversee students' performance", "Provided 1:1 sessions and supervised 3 group final projects"]
        },
        {
            year: "Jan 2024 - Dec 2024",
            company: "RevoU",
            companyInfo: "Indonesia's largest professional skilling platform with total 1.8M+ learners, focused on digital skills.",
            role: "Facilitator for Corporate Data Analytics Training",
            points: ["Monitor project assignment sessions, answer student's questions and facilitate discussions.", "Achieved a facilitator satisfaction rate of 4.88/5."],
            technology: "Power BI, Tableau, Google Sheets, Excel"
        },
        {
            year: "Nov 2020 - Jan 2021",
            company: "Labkesda Jawa Barat",
            companyInfo: "West Java Provincial Health Laboratory",
            role: "Data Entry & Management",
            points: ["Input data into systems accurately and efficiently", "Created and maintained simple data management systems using spreadsheets", "Aggregated data and generated summaries to provide insights for decision-making"],
            technology: "Google Sheets"
        },
        {
            year: "Nov 2020",
            company: "Cariilmu.co.id",
            companyInfo: "Educational platform",
            role: "Data Analyst Intern",
            points: ["Cleansing sales, HR, and ratings data", "Maintained monitoring spreadsheet data (sales, HR, ratings)", "Created pivot table to give insight about summary of the data"],
            technology: "Google Sheets"
        },
    ]
};