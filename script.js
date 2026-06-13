const projects = {
  operations: {
    index: '01 / 03',
    title: 'Business Operations Reporting & Automation System',
    description:
      'A repeatable reporting workflow that cleans messy operations data with Python, analyzes KPIs with SQL, and produces dashboard-ready outputs for weekly management review.',
    image: 'assets/images/business_operations_dashboard.png',
    alt: 'Dashboard preview for operations reporting project',
    results: [
      '640 cleaned records after deduplication',
      '95.8% first-response SLA performance',
      '$158,891 estimated margin supported',
    ],
    links: [
      ['GitHub README', 'https://github.com/Akannione/business-operations-reporting-system'],
      [
        'Showcase',
        'https://htmlpreview.github.io/?https://github.com/Akannione/business-operations-reporting-system/blob/main/reports/portfolio_showcase.html',
      ],
      ['Case study', 'https://github.com/Akannione/business-operations-reporting-system/blob/main/case_study.md'],
    ],
  },
  crm: {
    index: '02 / 03',
    title: 'CRM Sales Pipeline & Lead Follow-Up Automation System',
    description:
      'A sales operations workflow that cleans CRM exports, scores leads, prioritizes follow-up work, and turns pipeline data into clear management reports.',
    image: 'assets/images/crm_dashboard.png',
    alt: 'Dashboard preview for CRM sales pipeline project',
    results: [
      '760 deduplicated clean leads',
      '$4.46M active pipeline value',
      '188 high-priority active leads',
    ],
    links: [
      ['GitHub README', 'https://github.com/Akannione/crm-sales-pipeline-automation-system'],
      [
        'Showcase',
        'https://htmlpreview.github.io/?https://github.com/Akannione/crm-sales-pipeline-automation-system/blob/main/reports/portfolio_showcase.html',
      ],
      ['Case study', 'https://github.com/Akannione/crm-sales-pipeline-automation-system/blob/main/case_study.md'],
    ],
  },
  businessos: {
    index: '03 / 03',
    title: 'Chiropractic Business OS MVP',
    description:
      'A focused full-stack web app for chiropractic practices to capture inquiries, track follow-ups, review KPIs, export CSVs, and support lightweight intake automation.',
    image: 'assets/images/business_os_mvp.svg',
    alt: 'Dashboard preview for Chiropractic Business OS MVP',
    results: [
      'React, Vite, TypeScript frontend',
      'Node, Express, TypeScript backend',
      'MongoDB data model and API documentation',
    ],
    links: [
      ['GitHub README', 'https://github.com/Akannione/chiropractic-business-os'],
      ['Automation notes', 'https://github.com/Akannione/chiropractic-business-os/blob/main/docs/WORKFLOW_AUTOMATION.md'],
      ['API docs', 'https://github.com/Akannione/chiropractic-business-os/blob/main/docs/API.md'],
    ],
  },
};

const projectKeys = Object.keys(projects);
const progress = document.querySelector('#scrollProgress');
const counters = document.querySelectorAll('[data-count]');
const revealItems = document.querySelectorAll('.reveal');
const tabs = document.querySelectorAll('.project-tab');
const spotlight = document.querySelector('#projectSpotlight');
const projectIndex = document.querySelector('#projectIndex');
const projectTitle = document.querySelector('#projectTitle');
const projectDescription = document.querySelector('#projectDescription');
const projectResults = document.querySelector('#projectResults');
const projectLinks = document.querySelector('#projectLinks');
const projectImage = document.querySelector('#projectImage');
const cycleProject = document.querySelector('#cycleProject');
const previousProject = document.querySelector('#previousProject');
const nextProject = document.querySelector('#nextProject');
const projectMeter = document.querySelector('#projectMeter');
const activeSignal = document.querySelector('#activeSignal');
const orbitDots = document.querySelectorAll('.orbit-dot');
const commandMenu = document.querySelector('#commandMenu');
const openCommand = document.querySelector('#openCommand');
const closeCommand = document.querySelector('#closeCommand');
const commandButtons = document.querySelectorAll('[data-command]');
const sectionTargets = ['top', 'projects', 'services', 'system', 'contact'];
let activeProject = 'operations';
let countersStarted = false;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.height = `${Math.min(100, Math.max(0, percent))}%`;
}

function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  const suffix = element.textContent.includes('%') ? '%' : '';
  const prefix = element.textContent.includes('$') ? '$' : '';
  const compact = target >= 1000;
  const duration = 900;
  const start = performance.now();

  function frame(now) {
    const elapsed = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const value = Math.round(target * eased);
    element.textContent = `${prefix}${compact ? value.toLocaleString() : value}${suffix}`;
    if (elapsed < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counters.forEach(animateCounter);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('proof-band') || entry.target.classList.contains('hero')) {
          startCounters();
        }
      }
    });
  },
  { threshold: 0.16 },
);

revealItems.forEach((item) => observer.observe(item));

function renderProject(key) {
  const project = projects[key];
  if (!project) return;
  const index = projectKeys.indexOf(key);
  activeProject = key;
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.project === key));
  spotlight.classList.remove('switching');
  void spotlight.offsetWidth;
  spotlight.classList.add('switching');

  projectIndex.textContent = project.index;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectImage.src = project.image;
  projectImage.alt = project.alt;
  projectMeter.style.transform = `translateX(${index * 100}%)`;
  activeSignal.textContent = project.title.replace(' & Automation System', '').replace(' System', '');

  projectResults.replaceChildren(
    ...project.results.map((result) => {
      const item = document.createElement('li');
      item.textContent = result;
      return item;
    }),
  );

  projectLinks.replaceChildren(
    ...project.links.map(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      return link;
    }),
  );
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => renderProject(tab.dataset.project));
});

function goToProject(direction = 1) {
  const currentIndex = projectKeys.indexOf(activeProject);
  const next = projectKeys[(currentIndex + direction + projectKeys.length) % projectKeys.length];
  renderProject(next);
}

cycleProject.addEventListener('click', () => {
  goToProject(1);
  document.querySelector('#projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

previousProject.addEventListener('click', () => goToProject(-1));
nextProject.addEventListener('click', () => goToProject(1));

function scrollToSection(id) {
  const target = id === 'top' ? document.querySelector('#top') : document.querySelector(`#${id}`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

orbitDots.forEach((dot) => {
  dot.addEventListener('click', () => scrollToSection(dot.dataset.target));
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.id || 'top';
    orbitDots.forEach((dot) => dot.classList.toggle('active', dot.dataset.target === id));
  },
  { threshold: [0.28, 0.45, 0.62] },
);

sectionTargets.forEach((id) => {
  const target = id === 'top' ? document.querySelector('#top') : document.querySelector(`#${id}`);
  if (target) sectionObserver.observe(target);
});

function setCommandMenu(open) {
  commandMenu.classList.toggle('open', open);
  commandMenu.setAttribute('aria-hidden', String(!open));
  if (open) {
    commandButtons[0]?.focus();
  } else {
    openCommand.focus();
  }
}

openCommand.addEventListener('click', () => setCommandMenu(true));
closeCommand.addEventListener('click', () => setCommandMenu(false));
commandMenu.addEventListener('click', (event) => {
  if (event.target === commandMenu) setCommandMenu(false);
});

commandButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const command = button.dataset.command;
    setCommandMenu(false);
    if (sectionTargets.includes(command)) scrollToSection(command);
    if (command === 'resume') window.location.href = 'assets/docs/tobi_oniyide_master_resume.pdf';
    if (command === 'github') window.location.href = 'https://github.com/Akannione';
  });
});

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'k' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    setCommandMenu(!commandMenu.classList.contains('open'));
  }
  if (event.key === 'Escape' && commandMenu.classList.contains('open')) {
    setCommandMenu(false);
  }
  if (key === 'arrowright' && document.activeElement?.classList?.contains('project-tab')) {
    goToProject(1);
  }
  if (key === 'arrowleft' && document.activeElement?.classList?.contains('project-tab')) {
    goToProject(-1);
  }
});

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
