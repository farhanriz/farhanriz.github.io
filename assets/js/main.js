let currentSkillTab = 'task';
let currentFilteredProjects = [];
let activeFilters = {
    task: [],
    tools: [],
    soft: [],
    output: [],
    year: []
};
let dropdownOpen = {
    task: false,
    tools: false,
    output: false,
    year: false
};
let selectedProject = null;

const tagOrder = ['output', 'tools', 'task'];

function initTheme() {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getAllTags() {
    const tagMap = {};
    portfolio.projects.forEach(project => {
        Object.entries(project.tags).forEach(([category, tags]) => {
            tags.forEach(tag => {
                if (!tagMap[tag]) tagMap[tag] = category;
            });
        });
    });
    const tags = Object.keys(tagMap);
    return tags.sort((a, b) => {
        const catA = tagMap[a];
        const catB = tagMap[b];
        if (catA !== catB) return tagOrder.indexOf(catA) - tagOrder.indexOf(catB);
        return a.localeCompare(b);
    });
}

function getTagsByCategory(category) {
    const tagSet = new Set();
    portfolio.projects.forEach(project => {
        (project.tags[category] || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort();
}

function getTagCategory(tag) {
    for (const project of portfolio.projects) {
        for (const [category, tagArray] of Object.entries(project.tags)) {
            if (tagArray.includes(tag)) return category;
        }
    }
    return null;
}

function renderIntro() {
    const p = portfolio.profile;
    document.getElementById('profile-image').src = p.image || `https://picsum.photos/200/200?random=99`;
    document.getElementById('profile-name').textContent = p.name;
    document.getElementById('profile-role').textContent = p.role;
    document.getElementById('profile-intro').innerHTML = p.intro;
    document.getElementById('email-link').href = `mailto:${p.email}`;
    document.getElementById('github-link').href = p.github;
    document.getElementById('linkedin-link').href = p.linkedin;
    if (p.medium) {
        document.getElementById('medium-link').href = p.medium;
        document.getElementById('medium-link').style.display = 'flex';
    }
    if (p.email) {
        document.getElementById('footer-email').href = `mailto:${p.email}`;
        document.getElementById('footer-email').textContent = p.email;
    }
    if (p.github) document.getElementById('footer-github').href = p.github;
    if (p.linkedin) document.getElementById('footer-linkedin').href = p.linkedin;
    if (p.medium) document.getElementById('footer-medium').href = p.medium;
}

function renderSkills() {
    const content = document.getElementById('skills-content');
    const skills = portfolio.skills[currentSkillTab] || [];
    content.innerHTML = skills.map(skill => `
        <span class="skill-tag clickable ${activeFilters[currentSkillTab].includes(skill) ? 'active' : ''}" data-tag="${skill}" data-category="${currentSkillTab}">${skill}</span>
    `).join('');

    content.querySelectorAll('.skill-tag').forEach(skill => {
        skill.addEventListener('click', (e) => {
            e.stopPropagation();
            const tag = skill.dataset.tag;
            const category = skill.dataset.category;
            toggleFilter(category, tag);
        });
    });
}

function toggleFilter(category, tag) {
    const filters = activeFilters[category];
    const idx = filters.indexOf(tag);
    if (idx === -1) {
        filters.push(tag);
    } else {
        filters.splice(idx, 1);
    }
    updateClearFiltersButton();
    renderSelectedTagsDisplay();
    renderSkills();
    renderAllDropdowns();
    renderProjects();
}

function clearAllFilters() {
    activeFilters = {
        task: [],
        tools: [],
        soft: [],
        output: [],
        year: []
    };
    updateClearFiltersButton();
    renderSelectedTagsDisplay();
    renderSkills();
    renderAllDropdowns();
    renderProjects();
    closeProjectDetail();
}

function getUniqueYears() {
    const years = portfolio.projects.map(p => p.year).filter(y => y);
    return [...new Set(years)].sort((a, b) => b - a);
}

function updateClearFiltersButton() {
    const clearBtn = document.getElementById('clear-filters');
    const hasFilters = activeFilters.task.length > 0 ||
                       activeFilters.tools.length > 0 ||
                       activeFilters.soft.length > 0 ||
                       activeFilters.output.length > 0 ||
                       activeFilters.year.length > 0;
    clearBtn.style.display = hasFilters ? 'block' : 'none';
}

function renderSelectedTagsDisplay() {
    const container = document.getElementById('selected-tags-display');
    if (!container) return;

    const categories = ['task', 'tools', 'soft', 'output', 'year'];
    const labels = { task: 'Task', tools: 'Tools', soft: 'Soft', output: 'Output', year: 'Year' };
    const tagColors = { task: 'tag-task', tools: 'tag-tools', soft: 'tag-soft', output: 'tag-output', year: 'tag-year' };

    let html = '';
    categories.forEach(category => {
        const tags = activeFilters[category];
        if (tags.length > 0) {
            html += '<div class="selected-tag-group">';
            html += '<span class="tag-label">' + labels[category] + ':</span>';
            tags.forEach(tag => {
                html += '<span class="tag ' + tagColors[category] + '" data-category="' + category + '" data-tag="' + tag + '">' + tag + '<span class="tag-remove" data-category="' + category + '" data-tag="' + tag + '">×</span></span>';
            });
            html += '</div>';
        }
    });

    console.log('Selected tags HTML:', html);
    container.innerHTML = html;

    container.querySelectorAll('.tag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = btn.dataset.category;
            const tag = btn.dataset.tag;
            toggleFilter(category, tag);
        });
    });
}

function renderFilterDropdown(category) {
    const container = document.getElementById(category + '-dropdown');
    if (!container) return;

    const tags = category === 'year' ? getUniqueYears() : getTagsByCategory(category);
    const selected = activeFilters[category];
    const labelMap = { task: 'Task', tools: 'Tools', soft: 'Soft', output: 'Output', year: 'Year' };
    const colorMap = { task: '#0A2472', tools: '#10b981', soft: '#8b5cf6', output: '#f59e0b', year: '#6366f1' };

    container.innerHTML = '<div class="dropdown-wrapper">' +
        '<button class="dropdown-toggle ' + (selected.length > 0 ? 'active' : '') + '" data-category="' + category + '" style="--dropdown-color: ' + colorMap[category] + '">' +
        labelMap[category] + (selected.length > 0 ? ' (' + selected.length + ')' : '') +
        '<svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>' +
        '</button>' +
        '<div class="dropdown-content" data-category="' + category + '">' +
        (category === 'year'
            ? tags.map(year => '<label class="dropdown-option"><input type="checkbox" class="dropdown-checkbox" value="' + year + '"' + (selected.includes(year) ? ' checked' : '') + '>' + year + '</label>').join('')
            : tags.map(tag => '<label class="dropdown-option"><input type="checkbox" class="dropdown-checkbox" value="' + tag + '"' + (selected.includes(tag) ? ' checked' : '') + '>' + tag + '</label>').join('')
        ) +
        '</div>' +
        '</div>';

    const toggleBtn = container.querySelector('.dropdown-toggle');
    const dropdownContent = container.querySelector('.dropdown-content');

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownOpen[category] = !dropdownOpen[category];
        document.querySelectorAll('.dropdown-content').forEach(d => {
            if (d !== dropdownContent) d.classList.remove('show');
        });
        dropdownContent.classList.toggle('show', dropdownOpen[category]);
        toggleBtn.querySelector('.dropdown-arrow').style.transform = dropdownOpen[category] ? 'rotate(180deg)' : '';
    });

    dropdownContent.querySelectorAll('.dropdown-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            e.stopPropagation();
            const value = category === 'year' ? parseInt(cb.value) : cb.value;
            const idx = activeFilters[category].indexOf(value);
            if (cb.checked) {
                if (idx === -1) activeFilters[category].push(value);
            } else {
                if (idx !== -1) activeFilters[category].splice(idx, 1);
            }
            updateClearFiltersButton();
            renderSelectedTagsDisplay();
            renderAllDropdowns();
            renderProjects();
        });
    });
}

function renderAllDropdowns() {
    renderFilterDropdown('task');
    renderFilterDropdown('tools');
    renderFilterDropdown('soft');
    renderFilterDropdown('output');
    renderFilterDropdown('year');
    setupDropdownCloseListeners();
}

function setupDropdownCloseListeners() {
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-content.show').forEach(d => {
            d.classList.remove('show');
        });
        dropdownOpen = { task: false, tools: false, output: false, year: false };
    });
}

function openProjectDetail(project, card) {
    selectedProject = project;

    const container = document.getElementById('projects-container');
    container.classList.add('show-detail');

    document.querySelector('.project-detail-placeholder').style.display = 'none';
    document.getElementById('project-detail-content').style.display = 'block';

    document.querySelectorAll('.card.selected-project').forEach(c => c.classList.remove('selected-project'));
    card.classList.add('selected-project');

    document.getElementById('detail-image').src = project.image;
    document.getElementById('detail-year').textContent = project.year || '';
    document.getElementById('detail-title').textContent = project.title;
    document.getElementById('detail-description').innerHTML = project.description || '';

    const detailsContainer = document.getElementById('detail-details');
    if (project.details) {
        const detailsList = project.details.split('|').filter(d => d.trim());
        if (detailsList.length > 0) {
            detailsContainer.innerHTML = '<ul class="detail-details-list">' +
                detailsList.map(d => '<li>' + d + '</li>').join('') +
                '</ul>';
            detailsContainer.style.display = 'block';
        } else {
            detailsContainer.style.display = 'none';
        }
    } else {
        detailsContainer.style.display = 'none';
    }

    const tagsContainer = document.getElementById('detail-tags');
    tagsContainer.innerHTML = tagOrder.map(category => {
        const tags = project.tags[category] || [];
        if (tags.length === 0) return '';
        let html = '<div class="detail-tag-group"><span class="detail-tag-label">' + category.charAt(0).toUpperCase() + category.slice(1) + '</span><div class="detail-tag-values">' +
            tags.map(tag => '<span class="tag tag-' + category + '">' + tag + '</span>').join('') +
            '</div></div>';
        if (category === 'output' && project.link) {
            html += '<a href="' + project.link + '" class="detail-output-link" target="_blank">See the result here</a>';
        }
        return html;
    }).join('');
}

function closeProjectDetail() {
    selectedProject = null;
    const container = document.getElementById('projects-container');
    container.classList.remove('show-detail');

    document.querySelector('.project-detail-placeholder').style.display = 'flex';
    document.getElementById('project-detail-content').style.display = 'none';

    document.querySelectorAll('.card.selected-project').forEach(c => c.classList.remove('selected-project'));
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    const search = document.getElementById('project-search').value.toLowerCase();
    let filtered = portfolio.projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(search) ||
                             project.description.toLowerCase().includes(search);

        const matchesTask = activeFilters.task.length === 0 || activeFilters.task.some(t => project.tags.task.includes(t));
        const matchesTools = activeFilters.tools.length === 0 || activeFilters.tools.some(t => project.tags.tools.includes(t));
        const matchesSoft = activeFilters.soft.length === 0 || activeFilters.soft.some(t => (project.tags.soft || []).includes(t));
        const matchesOutput = activeFilters.output.length === 0 || activeFilters.output.some(t => project.tags.output.includes(t));
        const matchesYear = activeFilters.year.length === 0 || (project.year && activeFilters.year.includes(project.year));

        return matchesSearch && matchesTask && matchesTools && matchesSoft && matchesOutput && matchesYear;
    });

    if (activeFilters.task.length === 0 && activeFilters.tools.length === 0 && activeFilters.output.length === 0) {
        filtered.sort((a, b) => {
            const aHasOutput = a.tags.output && a.tags.output.length > 0;
            const bHasOutput = b.tags.output && b.tags.output.length > 0;
            if (aHasOutput && !bHasOutput) return -1;
            if (!aHasOutput && bHasOutput) return 1;
            return 0;
        });
    }

    grid.innerHTML = filtered.map((project, index) => {
        const isSelected = selectedProject === project;
        return '<div class="card' + (isSelected ? ' selected-project' : '') + '" data-index="' + index + '">' +
            '<img src="' + project.image + '" alt="' + project.title + '" class="card-image">' +
            '<div class="card-body">' +
            '<h3 class="card-title">' + project.title + '</h3>' +
            (project.year ? '<div class="card-year">' + project.year + '</div>' : '') +
            '<p class="card-description">' + (project.description ? project.description : '') + '</p>' +
            '<div class="card-tags">' +
            tagOrder.map(cat =>
                (project.tags[cat] || []).map(tag => '<span class="tag tag-' + cat + ' ' + (activeFilters[cat].includes(tag) ? 'active' : '') + '" data-tag="' + tag + '" data-category="' + cat + '">' + tag + '</span>').join('')
            ).join('') +
            '</div></div></div>';
    }).join('');

    currentFilteredProjects = filtered;
}

function calculateDuration(startStr, endStr) {
    const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11,
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    function parseDate(str) {
        const parts = str.split(' ');
        const monthStr = parts[0];
        const year = parseInt(parts[1]);
        const month = months[monthStr];
        return { month: month !== undefined ? month : 0, year: year || 0 };
    }

    const start = parseDate(startStr);
    const endStrLower = endStr.toLowerCase();
    let end;
    if (endStrLower === 'present') {
        const now = new Date();
        end = { month: now.getMonth(), year: now.getFullYear() };
    } else {
        end = parseDate(endStr);
    }

    let totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
    if (totalMonths <= 0) totalMonths = 1;

    if (totalMonths < 2) {
        return '1 mo';
    } else if (totalMonths < 12) {
        return totalMonths + ' mos';
    } else {
        const years = Math.floor(totalMonths / 12);
        const monthsRemainder = totalMonths % 12;
        if (monthsRemainder === 0) {
            return years + ' yr' + (years > 1 ? 's' : '');
        } else if (monthsRemainder < 3) {
            return years + ' yr' + (years > 1 ? 's' : '') + ' ' + monthsRemainder + ' mo';
        } else {
            return years + ' yr' + (years > 1 ? 's' : '') + ' ' + monthsRemainder + ' mos';
        }
    }
}

function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;
    container.innerHTML = portfolio.experiences.map((exp) => {
        const yearParts = exp.year.split(' - ');
        const startYear = yearParts[0].trim();
        const endYear = yearParts.length > 1 ? yearParts[1].trim() : 'Present';
        const duration = calculateDuration(startYear, endYear);
        return '<div class="experience-item" data-expanded="false">' +
            '<div class="experience-header">' +
            '<div class="timeline-dot"></div>' +
            '<div class="experience-summary">' +
            '<div class="timeline-date">' + exp.year + ' · ' + duration + '</div>' +
            '<h3 class="timeline-company">' + exp.role + ' at <span class="company-name">' + exp.company + '</span></h3>' +
            (exp.companyInfo ? '<p class="experience-company-info">' + exp.companyInfo + '</p>' : '') +
            (exp.points.length > 0 && !exp.points[0].startsWith('<b>') ? '<p class="experience-summary-text">' + exp.points[0] + '</p>' : '') +
            '</div>' +
            (exp.points.length > 0 ? '<button class="experience-toggle" aria-label="Toggle details"><svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>' : '') +
            '</div>' +
            (exp.points.length > 0 ? '<div class="experience-details"><ul class="timeline-points">' +
            exp.points.map(point => {
                if (point.startsWith('<b>') && point.endsWith('</b>')) {
                    return '<li class="role-header">' + point + '</li>';
                }
                if (point.startsWith('Technology:')) {
                    const parts = point.split(':');
                    return '<li><span class="tech-label">' + parts[0] + ':</span> ' + parts.slice(1).join(':').trim() + '</li>';
                }
                if (point.trim() === '') {
                    return '<li class="spacer"></li>';
                }
                return '<li>' + point + '</li>';
            }).join('') +
            '</ul></div>' : '') +
            '</div>';
    }).join('');

    container.querySelectorAll('.experience-header').forEach(header => {
        const toggle = header.querySelector('.experience-toggle');
        if (toggle) {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isExpanded = item.dataset.expanded === 'true';
                item.dataset.expanded = !isExpanded;
                header.querySelector('.toggle-icon').style.transform = isExpanded ? '' : 'rotate(180deg)';
            });
        }
    });
}

function init() {
    initTheme();
    renderIntro();
    renderProjects();
    renderSkills();
    renderExperience();
    renderAllDropdowns();
    renderSelectedTagsDisplay();
    updateClearFiltersButton();

    document.getElementById('projects-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card && !e.target.classList.contains('tag')) {
            const index = parseInt(card.dataset.index);
            if (!isNaN(index) && currentFilteredProjects[index]) {
                openProjectDetail(currentFilteredProjects[index], card);
            }
        }
    });

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('footer-theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('project-search').addEventListener('input', renderProjects);

    document.querySelectorAll('.skill-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentSkillTab = btn.dataset.tab;
            document.querySelectorAll('.skill-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSkills();
        });
    });

    document.getElementById('clear-filters').addEventListener('click', clearAllFilters);
    document.getElementById('project-detail-close').addEventListener('click', closeProjectDetail);

    document.addEventListener('click', (e) => {
        if (!selectedProject) return;
        const card = e.target.closest('.card');
        const detail = e.target.closest('.project-detail');
        if (!card && !detail) {
            closeProjectDetail();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
