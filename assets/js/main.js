let activeTag = null;
let activeCategory = null;
let currentSkillTab = 'task';
let currentFilteredProjects = [];

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
        <span class="skill-tag clickable" data-tag="${skill}" data-category="${currentSkillTab}">${skill}</span>
    `).join('');

    content.querySelectorAll('.skill-tag').forEach(skill => {
        skill.addEventListener('click', () => {
            activeTag = skill.dataset.tag;
            activeCategory = skill.dataset.category;
            renderTags();
            renderProjects();
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    const search = document.getElementById('project-search').value.toLowerCase();
    let filtered = portfolio.projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(search) ||
                             project.description.toLowerCase().includes(search);
        const matchesTag = !activeTag || Object.values(project.tags).some(tags => tags.includes(activeTag));
        return matchesSearch && matchesTag;
    });

    if (!activeTag) {
        filtered.sort((a, b) => {
            const aHasOutput = a.tags.output && a.tags.output.length > 0;
            const bHasOutput = b.tags.output && b.tags.output.length > 0;
            if (aHasOutput && !bHasOutput) return -1;
            if (!aHasOutput && bHasOutput) return 1;
            return 0;
        });
    }

    grid.innerHTML = filtered.map(project => `
        <div class="card">
            <img src="${project.image}" alt="${project.title}" class="card-image">
            <div class="card-body">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                <div class="card-tags">
                    ${tagOrder.map(category =>
                        (project.tags[category] || []).map(tag => `<span class="tag tag-${category}" data-tag="${tag}" data-category="${category}">${tag}</span>`).join('')
                    ).join('')}
                </div>
            </div>
        </div>
    `).join('');

    currentFilteredProjects = filtered;

    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            activeTag = activeTag === tag.dataset.tag ? null : tag.dataset.tag;
            activeCategory = activeTag ? tag.dataset.category : null;
            renderTags();
            renderProjects();
        });
    });

    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', () => {
            openProjectModal(currentFilteredProjects[index]);
        });
    });
}

function renderTags() {
    const allTags = getAllTags();
    const container = document.getElementById('project-tags');
    container.innerHTML = allTags.map(tag => {
        const category = getTagCategory(tag);
        const isActive = activeTag === tag;
        return `<button class="tag-filter tag-${category} ${isActive ? 'active' : ''}" data-tag="${tag}" data-category="${category}">
            ${tag}
        </button>`;
    }).join('');

    container.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            activeTag = activeTag === btn.dataset.tag ? null : btn.dataset.tag;
            activeCategory = activeTag ? btn.dataset.category : null;
            renderTags();
            renderProjects();
        });
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = tagOrder.map(category => {
        const tags = project.tags[category] || [];
        if (tags.length === 0) return '';
        return `
            <div class="modal-tags-label">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
            <div class="modal-tags">
                ${tags.map(tag => `<span class="tag tag-${category}">${tag}</span>`).join('')}
            </div>
        `;
    }).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function calculateDuration(startStr, endStr) {
    const months = {
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
    if (endStrLower === 'present' || endStrLower === 'present') {
        const now = new Date();
        end = { month: now.getMonth(), year: now.getFullYear() };
    } else {
        end = parseDate(endStr);
    }

    let totalMonths = (end.year - start.year) * 12 + (end.month - start.month);
    if (totalMonths < 0) totalMonths = 0;

    if (totalMonths < 1) {
        return '1 mo';
    } else if (totalMonths < 12) {
        return `${totalMonths} mos`;
    } else {
        const years = Math.floor(totalMonths / 12);
        const monthsRemainder = totalMonths % 12;
        if (monthsRemainder === 0) {
            return `${years} yr${years > 1 ? 's' : ''}`;
        } else if (monthsRemainder < 3) {
            return `${years} yr${years > 1 ? 's' : ''} ${monthsRemainder} mo`;
        }
        return `${years} yr${years > 1 ? 's' : ''} ${monthsRemainder} mos`;
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
        return `
        <div class="experience-item" data-expanded="false">
            <div class="experience-header">
                <div class="timeline-dot"></div>
                <div class="experience-summary">
                    <div class="timeline-date">${exp.year} · ${duration}</div>
                    <h3 class="timeline-company">${exp.role} at <span class="company-name">${exp.company}</span></h3>
                    ${exp.companyInfo ? `<p class="experience-company-info">${exp.companyInfo}</p>` : ''}
                    ${exp.points.length > 0 ? `<p class="experience-summary-text">${exp.points[0]}</p>` : ''}
                </div>
                ${exp.points.length > 0 ? `
                <button class="experience-toggle" aria-label="Toggle details">
                    <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>` : ''}
            </div>
            ${exp.points.length > 0 ? `
            <div class="experience-details">
                <ul class="timeline-points">
                    ${exp.points.map(point => {
                        if (point.startsWith('Technology:')) {
                            return `<li><span class="tech-label">${point.split(':')[0]}:</span> ${point.split(':').slice(1).join(':').trim()}</li>`;
                        }
                        return `<li>${point}</li>`;
                    }).join('')}
                </ul>
            </div>` : ''}
        </div>
        `;
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

document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') closeProjectModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

function init() {
    initTheme();
    renderIntro();
    renderProjects();
    renderTags();
    renderSkills();
    renderExperience();

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('footer-theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('project-search').addEventListener('input', renderProjects);

    document.querySelectorAll('.skill-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSkillTab = btn.dataset.tab;
            document.querySelectorAll('.skill-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSkills();
        });
    });
}

document.addEventListener('DOMContentLoaded', init);