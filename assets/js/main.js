let currentSkillTab = 'task';
let filters = {
    type: 'all',
    task: [],
    tools: [],
    year: []
};
let selectedProject = null;
let currentPage = 1;

const PAGE_SIZE = 5;
const TYPE_ORDER = ['Analysis', 'Dashboard', 'Article', 'Data Management'];
const TYPE_LABELS = { Analysis: 'Analysis', Dashboard: 'Dashboards', Article: 'Articles', 'Data Management': 'Data Management' };

function esc(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function slugify(str) {
    return str.toLowerCase().replace(/\[[^\]]*\]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function isPlaceholder(src) {
    return !src || src.startsWith('data:image/svg');
}

// Theme

function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.theme = dark ? 'dark' : 'light'; } catch (e) {}
}

function toggleTheme() {
    setTheme(!document.documentElement.classList.contains('dark'));
}

// Data helpers

function getTagsByCategory(category) {
    const tagSet = new Set();
    portfolio.projects.forEach(project => {
        (project.tags[category] || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort();
}

function getUniqueYears() {
    const years = portfolio.projects.map(p => p.year).filter(y => y);
    return [...new Set(years)].sort((a, b) => b - a);
}

function countProjects(predicate) {
    return portfolio.projects.filter(predicate).length;
}

function getTypes() {
    return getTagsByCategory('output').sort((a, b) => {
        const ia = TYPE_ORDER.indexOf(a), ib = TYPE_ORDER.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
    });
}

function projectTypes(project) {
    return (project.tags.output || []).slice().sort((a, b) => TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b));
}

function hasActiveFilters() {
    return filters.type !== 'all' || filters.task.length > 0 || filters.tools.length > 0 ||
        filters.year.length > 0 || document.getElementById('project-search').value.trim() !== '';
}

function getFilteredProjects() {
    const search = document.getElementById('project-search').value.trim().toLowerCase();
    return portfolio.projects.filter(project => {
        const text = (project.title + ' ' + (project.summary || '') + ' ' + project.description.replace(/<[^>]+>/g, ' ')).toLowerCase();
        const matchesSearch = !search || text.includes(search) ||
            Object.values(project.tags).some(tags => tags.some(t => t.toLowerCase().includes(search)));
        const matchesType = filters.type === 'all' || (project.tags.output || []).includes(filters.type);
        const matchesTask = filters.task.length === 0 || filters.task.some(t => project.tags.task.includes(t));
        const matchesTools = filters.tools.length === 0 || filters.tools.some(t => project.tags.tools.includes(t));
        const matchesYear = filters.year.length === 0 || filters.year.includes(project.year);
        return matchesSearch && matchesType && matchesTask && matchesTools && matchesYear;
    }).sort((a, b) => (b.year || 0) - (a.year || 0));
}

// Intro

function renderIntro() {
    const p = portfolio.profile;
    if (p.image) document.getElementById('profile-image').src = p.image;
    document.getElementById('profile-name').textContent = p.name;
    document.getElementById('profile-roles').innerHTML = p.role.split('|')
        .map(r => '<span class="role-chip">' + esc(r.trim()) + '</span>').join('');
    document.getElementById('profile-intro').innerHTML = p.intro;

    const emailBtn = document.getElementById('email-link');
    const emailText = document.getElementById('email-text');
    emailText.textContent = p.email;
    emailBtn.title = 'Copy email';
    emailBtn.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(p.email).catch(() => {});
        }
        emailText.textContent = 'Copied!';
        setTimeout(() => { emailText.textContent = p.email; }, 1600);
    });

    document.getElementById('github-link').href = p.github;
    document.getElementById('linkedin-link').href = p.linkedin;
    if (p.medium) {
        document.getElementById('medium-link').href = p.medium;
        document.getElementById('medium-link').hidden = false;
    }
    if (p.email) document.getElementById('footer-email').href = 'mailto:' + p.email;
    if (p.github) document.getElementById('footer-github').href = p.github;
    if (p.linkedin) document.getElementById('footer-linkedin').href = p.linkedin;
    if (p.medium) document.getElementById('footer-medium').href = p.medium;
    document.getElementById('footer-year').textContent = new Date().getFullYear();
}

// Stats

function renderStats() {
    const years = getUniqueYears();
    const stats = [{ value: portfolio.projects.length, label: 'Projects', type: 'all' }]
        .concat(getTypes().map(t => ({ value: countProjects(p => p.tags.output.includes(t)), label: TYPE_LABELS[t] || t, type: t })))
        .concat([
        { value: getTagsByCategory('tools').length, label: 'Tools' },
        { value: portfolio.profile.yearsExperience || '5+', label: 'Years', caption: years.length ? years[years.length - 1] + '–' + years[0] : '' }
        ]);

    document.getElementById('stats').innerHTML = stats.map(s => {
        const inner = '<span class="stat-value">' + esc(s.value) + '</span>' +
            '<span class="stat-label">' + esc(s.label) + (s.caption ? ' <span class="stat-caption">' + esc(s.caption) + '</span>' : '') + '</span>';
        return s.type
            ? '<button type="button" class="stat stat-action' + (s.type !== 'all' && filters.type === s.type ? ' active' : '') + '" data-type="' + s.type + '">' + inner + '</button>'
            : '<div class="stat">' + inner + '</div>';
    }).join('');

    document.querySelectorAll('#stats .stat-action').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.type === 'all') {
                clearAllFilters();
            } else {
                filters.type = filters.type === btn.dataset.type ? 'all' : btn.dataset.type;
                refreshProjects();
            }
            scrollToIndex();
        });
    });
}

// Featured

function renderFeatured() {
    const featured = portfolio.projects.filter(p => p.featured);
    const container = document.getElementById('featured');
    container.innerHTML = featured.map(project => {
        const tools = project.tags.tools.slice(0, 3);
        return '<button type="button" class="feature-card" data-slug="' + slugify(project.title) + '">' +
            '<div class="feature-media">' +
            (isPlaceholder(project.image) ? '<div class="feature-placeholder"></div>' : '<img src="' + esc(project.image) + '" alt="" loading="lazy">') +
            '</div>' +
            '<div class="feature-body">' +
            '<div class="feature-meta">' + esc(project.year) + ' · ' + projectTypes(project).map(esc).join(', ') + '</div>' +
            '<h4 class="feature-title">' + esc(project.title) + '</h4>' +
            (project.summary ? '<p class="feature-summary">' + esc(project.summary) + '</p>' : '') +
            '<div class="feature-foot">' +
            (project.impact ? '<span class="impact">' + esc(project.impact) + '</span>' : '') +
            '<span class="feature-tools">' + tools.map(esc).join(' · ') + '</span>' +
            '</div>' +
            '</div>' +
            '</button>';
    }).join('');

    container.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => openDrawerBySlug(card.dataset.slug));
    });
}

// Filter bar

function renderTypeFilter() {
    const types = [['all', 'All']].concat(getTypes().map(t => [t, TYPE_LABELS[t] || t]));
    const container = document.getElementById('type-filter');
    container.innerHTML = types.map(([value, label]) =>
        '<button type="button" class="segment' + (filters.type === value ? ' active' : '') + '" data-type="' + esc(value) + '">' + esc(label) + '</button>'
    ).join('');
    container.querySelectorAll('.segment').forEach(btn => {
        btn.addEventListener('click', () => {
            filters.type = btn.dataset.type;
            refreshProjects();
        });
    });
}

function renderDomainChips() {
    const container = document.getElementById('domain-chips');
    container.innerHTML = getTagsByCategory('task').map(tag => {
        const count = countProjects(p => p.tags.task.includes(tag));
        return '<button type="button" class="chip' + (filters.task.includes(tag) ? ' active' : '') + '" data-tag="' + esc(tag) + '">' +
            esc(tag) + '<span class="chip-count">' + count + '</span></button>';
    }).join('');
    container.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => toggleFilter('task', chip.dataset.tag));
    });
}

function renderFilterDropdown(category) {
    const container = document.getElementById(category + '-dropdown');
    const options = category === 'year' ? getUniqueYears() : getTagsByCategory(category);
    const label = category === 'year' ? 'Year' : 'Tools';
    const selected = filters[category];

    container.innerHTML =
        '<button type="button" class="dropdown-toggle' + (selected.length ? ' active' : '') + '" aria-expanded="false">' +
        label + (selected.length ? ' <span class="dropdown-count">' + selected.length + '</span>' : '') +
        '<svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>' +
        '</button>' +
        '<div class="dropdown-content">' +
        options.map(opt => '<label class="dropdown-option"><input type="checkbox" value="' + esc(opt) + '"' +
            (selected.includes(opt) ? ' checked' : '') + '>' + esc(opt) + '</label>').join('') +
        '</div>';

    const toggleBtn = container.querySelector('.dropdown-toggle');
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !container.classList.contains('open');
        closeDropdowns();
        container.classList.toggle('open', willOpen);
        toggleBtn.setAttribute('aria-expanded', willOpen);
    });

    container.querySelector('.dropdown-content').addEventListener('click', e => e.stopPropagation());
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const value = category === 'year' ? parseInt(cb.value, 10) : cb.value;
            const list = filters[category];
            const idx = list.indexOf(value);
            if (cb.checked && idx === -1) list.push(value);
            if (!cb.checked && idx !== -1) list.splice(idx, 1);
            updateDropdownToggle(category);
            refreshProjects({ keepDropdowns: true });
        });
    });
}

function updateDropdownToggle(category) {
    const container = document.getElementById(category + '-dropdown');
    const toggleBtn = container.querySelector('.dropdown-toggle');
    const n = filters[category].length;
    toggleBtn.classList.toggle('active', n > 0);
    const countEl = toggleBtn.querySelector('.dropdown-count');
    if (n > 0) {
        if (countEl) countEl.textContent = n;
        else toggleBtn.querySelector('.dropdown-arrow').insertAdjacentHTML('beforebegin', '<span class="dropdown-count">' + n + '</span>');
    } else if (countEl) {
        countEl.remove();
    }
}

function closeDropdowns() {
    document.querySelectorAll('.filter-dropdown.open').forEach(d => {
        d.classList.remove('open');
        d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
}

function toggleFilter(category, tag) {
    const list = filters[category];
    const idx = list.indexOf(tag);
    if (idx === -1) list.push(tag);
    else list.splice(idx, 1);
    refreshProjects();
}

function clearAllFilters() {
    filters = { type: 'all', task: [], tools: [], year: [] };
    document.getElementById('project-search').value = '';
    refreshProjects();
}

function refreshProjects(opts) {
    opts = opts || {};
    currentPage = 1;
    renderTypeFilter();
    renderDomainChips();
    if (!opts.keepDropdowns) {
        renderFilterDropdown('tools');
        renderFilterDropdown('year');
    }
    renderStats();
    renderSkills();
    renderProjectIndex();
}

function scrollToIndex() {
    document.getElementById('all-projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Project index

function renderProjectIndex() {
    const list = document.getElementById('project-index');
    const projects = getFilteredProjects();
    const pageCount = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), pageCount);
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const pageItems = projects.slice(startIdx, startIdx + PAGE_SIZE);

    document.getElementById('result-count').textContent = projects.length + ' of ' + portfolio.projects.length;
    document.getElementById('clear-filters').hidden = !hasActiveFilters();
    renderPagination(projects.length, pageCount, startIdx, pageItems.length);

    if (projects.length === 0) {
        list.innerHTML = '<li class="index-empty">No projects match these filters. <button type="button" class="link-btn" id="empty-clear">Clear filters</button></li>';
        document.getElementById('empty-clear').addEventListener('click', clearAllFilters);
        return;
    }

    list.innerHTML = pageItems.map(project => {
        const slug = slugify(project.title);
        const tools = project.tags.tools;
        return '<li><button type="button" class="index-row' + (selectedProject === project ? ' selected' : '') + '" data-slug="' + slug + '">' +
            '<span class="index-year">' + esc(project.year || '') + '</span>' +
            '<span class="index-main">' +
            '<span class="index-title">' + (project.featured ? '<span class="star" title="Featured">★</span>' : '') + esc(project.title) + '</span>' +
            '<span class="index-domains">' + project.tags.task.map(esc).join(' · ') + '</span>' +
            '</span>' +
            '<span class="index-types">' + projectTypes(project).map(t => '<span class="type-badge">' + esc(t) + '</span>').join('') + '</span>' +
            '<span class="index-tools">' + tools.slice(0, 3).map(t => '<span class="tool">' + esc(t) + '</span>').join('') +
            (tools.length > 3 ? '<span class="tool tool-more">+' + (tools.length - 3) + '</span>' : '') + '</span>' +
            '<svg class="index-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>' +
            '</button></li>';
    }).join('');
}

function renderPagination(total, pageCount, startIdx, shown) {
    const nav = document.getElementById('pagination');
    if (total <= PAGE_SIZE) {
        nav.innerHTML = '';
        nav.hidden = true;
        return;
    }
    nav.hidden = false;
    const arrow = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="' + d + '"></path></svg>';
    let pages = '';
    for (let i = 1; i <= pageCount; i++) {
        pages += '<button type="button" class="page-btn' + (i === currentPage ? ' active' : '') + '" data-page="' + i + '"' +
            (i === currentPage ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }
    nav.innerHTML =
        '<span class="page-info">' + (startIdx + 1) + '–' + (startIdx + shown) + ' of ' + total + '</span>' +
        '<div class="page-controls">' +
        '<button type="button" class="page-btn" data-page="' + (currentPage - 1) + '" aria-label="Previous page"' + (currentPage === 1 ? ' disabled' : '') + '>' + arrow('M15 19l-7-7 7-7') + '</button>' +
        pages +
        '<button type="button" class="page-btn" data-page="' + (currentPage + 1) + '" aria-label="Next page"' + (currentPage === pageCount ? ' disabled' : '') + '>' + arrow('M9 5l7 7-7 7') + '</button>' +
        '</div>';
}

// Drawer

function openDrawerBySlug(slug) {
    const project = portfolio.projects.find(p => slugify(p.title) === slug);
    if (project) openDrawer(project);
}

function openDrawer(project) {
    selectedProject = project;
    const drawer = document.getElementById('project-drawer');

    document.getElementById('drawer-meta').textContent = [project.year, projectTypes(project).join(', ')].filter(Boolean).join(' · ');
    document.getElementById('drawer-title').textContent = project.title;

    const groups = [['Domain', project.tags.task], ['Tools', project.tags.tools]];
    document.getElementById('drawer-tags').innerHTML = groups.filter(([, tags]) => tags && tags.length).map(([label, tags]) =>
        '<div class="drawer-tag-group"><span class="drawer-tag-label">' + label + '</span><div class="drawer-tag-values">' +
        tags.map(t => '<span class="tag">' + esc(t) + '</span>').join('') + '</div></div>'
    ).join('');

    const link = document.getElementById('drawer-link');
    link.hidden = !project.link;
    if (project.link) link.href = project.link;

    const desc = document.getElementById('drawer-description');
    const descHtml = project.description || '';
    const leadImage = !descHtml.includes('<img') && !isPlaceholder(project.image)
        ? '<img src="' + esc(project.image) + '" alt="">' : '';
    desc.innerHTML = leadImage + descHtml;
    desc.querySelectorAll('img').forEach(img => {
        img.removeAttribute('style');
        img.addEventListener('click', () => openLightbox(img.src));
    });
    desc.querySelectorAll('a').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });

    drawer.querySelector('.drawer-body').scrollTop = 0;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.getElementById('drawer-backdrop').classList.add('open');
    document.body.classList.add('no-scroll');
    history.replaceState(null, '', '#p/' + slugify(project.title));
    document.getElementById('drawer-close').focus({ preventScroll: true });
    renderProjectIndex();
}

function closeDrawer() {
    if (!selectedProject) return;
    const slug = slugify(selectedProject.title);
    selectedProject = null;
    const drawer = document.getElementById('project-drawer');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.getElementById('drawer-backdrop').classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (location.hash.startsWith('#p/')) history.replaceState(null, '', location.pathname + location.search);
    renderProjectIndex();
    const row = document.querySelector('.index-row[data-slug="' + slug + '"]');
    if (row) row.focus({ preventScroll: true });
}

function openFromHash() {
    if (location.hash.startsWith('#p/')) openDrawerBySlug(decodeURIComponent(location.hash.slice(3)));
}

// Skills

function renderSkills() {
    const content = document.getElementById('skills-content');
    const skills = portfolio.skills[currentSkillTab] || [];
    const filterable = currentSkillTab === 'soft' ? [] : getTagsByCategory(currentSkillTab);

    content.innerHTML = skills.map(skill => {
        if (!filterable.includes(skill)) return '<span class="skill-tag">' + esc(skill) + '</span>';
        const active = filters[currentSkillTab].includes(skill);
        return '<button type="button" class="skill-tag clickable' + (active ? ' active' : '') + '" data-tag="' + esc(skill) + '">' + esc(skill) + '</button>';
    }).join('');

    content.querySelectorAll('.skill-tag.clickable').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleFilter(currentSkillTab, btn.dataset.tag);
            scrollToIndex();
        });
    });
}

// Experience

function calculateDuration(startStr, endStr) {
    const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11,
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    function parseDate(str) {
        const parts = str.split(' ');
        const month = months[parts[0]];
        const year = parseInt(parts[1]);
        return { month: month !== undefined ? month : 0, year: year || 0 };
    }

    const start = parseDate(startStr);
    let end;
    if (endStr.toLowerCase() === 'present') {
        const now = new Date();
        end = { month: now.getMonth(), year: now.getFullYear() };
    } else {
        end = parseDate(endStr);
    }

    let totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
    if (totalMonths <= 0) totalMonths = 1;

    if (totalMonths < 2) return '1 mo';
    if (totalMonths < 12) return totalMonths + ' mos';
    const years = Math.floor(totalMonths / 12);
    const rem = totalMonths % 12;
    const yrs = years + ' yr' + (years > 1 ? 's' : '');
    if (rem === 0) return yrs;
    return yrs + ' ' + rem + (rem < 3 ? ' mo' : ' mos');
}

function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;
    container.innerHTML = portfolio.experiences.map((exp) => {
        const yearParts = exp.year.split(' - ');
        const startYear = yearParts[0].trim();
        const endYear = yearParts.length > 1 ? yearParts[1].trim() : 'Present';
        const duration = calculateDuration(startYear, endYear);
        const hasPoints = exp.points.length > 0;
        return '<div class="experience-item" data-expanded="false">' +
            '<div class="experience-header' + (hasPoints ? ' expandable' : '') + '">' +
            '<div class="timeline-dot"></div>' +
            '<div class="experience-summary">' +
            '<div class="timeline-date">' + exp.year + (exp.company.toLowerCase() !== 'cariilmu.co.id' ? ' · ' + duration : '') + '</div>' +
            '<h3 class="timeline-company">' + exp.role + ' <span class="at">at</span> <span class="company-name">' + exp.company + '</span></h3>' +
            (exp.companyInfo ? '<p class="experience-company-info">' + exp.companyInfo + '</p>' : '') +
            '</div>' +
            (hasPoints ? '<button class="experience-toggle" type="button" aria-label="Toggle details"><svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>' : '') +
            '</div>' +
            (hasPoints ? '<div class="experience-details"><ul class="timeline-points">' +
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
            (exp.technology ? '<div class="experience-tech">' + exp.technology.split(',').map(t => '<span class="tool">' + t.trim() + '</span>').join('') + '</div>' : '') +
            '</div>';
    }).join('');

    container.querySelectorAll('.experience-header.expandable').forEach(header => {
        header.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const item = header.parentElement;
            item.dataset.expanded = item.dataset.expanded === 'true' ? 'false' : 'true';
        });
    });
}

// Lightbox

let lightboxZoom = 1;

function openLightbox(src) {
    if (isPlaceholder(src)) return;
    const img = document.getElementById('lightbox-image');
    img.src = src;
    img.style.transform = 'scale(1)';
    lightboxZoom = 1;
    document.getElementById('image-lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('image-lightbox').classList.remove('active');
}

function zoomIn() {
    lightboxZoom += 0.5;
    document.getElementById('lightbox-image').style.transform = 'scale(' + lightboxZoom + ')';
}

function zoomOut() {
    if (lightboxZoom > 0.5) {
        lightboxZoom -= 0.5;
        document.getElementById('lightbox-image').style.transform = 'scale(' + lightboxZoom + ')';
    }
}

function resetZoom() {
    lightboxZoom = 1;
    document.getElementById('lightbox-image').style.transform = 'scale(1)';
}

// Init

function init() {
    renderIntro();
    renderFeatured();
    renderExperience();
    refreshProjects();

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('project-search').addEventListener('input', () => {
        currentPage = 1;
        renderProjectIndex();
    });
    document.getElementById('pagination').addEventListener('click', (e) => {
        const btn = e.target.closest('.page-btn');
        if (!btn || btn.disabled) return;
        currentPage = parseInt(btn.dataset.page, 10);
        renderProjectIndex();
    });
    document.getElementById('clear-filters').addEventListener('click', clearAllFilters);

    document.getElementById('project-index').addEventListener('click', (e) => {
        const row = e.target.closest('.index-row');
        if (row) openDrawerBySlug(row.dataset.slug);
    });

    document.querySelectorAll('.skill-tabs .segment').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSkillTab = btn.dataset.tab;
            document.querySelectorAll('.skill-tabs .segment').forEach(b => b.classList.toggle('active', b === btn));
            renderSkills();
        });
    });

    document.getElementById('drawer-close').addEventListener('click', closeDrawer);
    document.getElementById('drawer-backdrop').addEventListener('click', closeDrawer);
    document.addEventListener('click', closeDropdowns);
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (document.getElementById('image-lightbox').classList.contains('active')) closeLightbox();
        else if (selectedProject) closeDrawer();
        else closeDropdowns();
    });

    window.addEventListener('hashchange', openFromHash);
    openFromHash();
}

document.addEventListener('DOMContentLoaded', init);
