# Portfolio Hub Deployment

This folder is ready to publish as a dynamic static site.

## Recommended Path

Use GitHub Pages because the hub is plain HTML/CSS/JavaScript and does not need a build step.

Recommended repository name:

```text
tobi-portfolio-hub
```

## Deploy Steps

1. Create a GitHub repository named `tobi-portfolio-hub`.
2. Copy or push the contents of `portfolio_hub/` to that repository root.
3. In GitHub, open Settings -> Pages.
4. Set the source to the default branch and root folder.
5. Wait for GitHub Pages to publish the site.
6. Add the published URL to:

```text
TOBI_OS/DATA/operating_state.json
TOBI_OS/PROJECTS/project_registry.md
TOBI_OS/PORTFOLIO/publishing_pipeline.md
```

Then run from `TOBI_OS/`:

```bash
python3 AUTOMATION/refresh_os.py
python3 AUTOMATION/validate_os.py
```

## Pre-Publish Checklist

- `python3 scripts/check_deploy_ready.py` passes.
- `index.html` opens locally.
- All project links use public URLs.
- Resume link points to `assets/docs/tobi_oniyide_master_resume.pdf`.
- `script.js` exists and is referenced by `index.html`.
- Images exist under `assets/images/`.
- No links point to `../career_system`, `../portfolio`, `../business_os_mvp`, or `../TOBI_OS`.
- Contact path is acceptable for public use.

## Current Intentional Limits

- No contact form is included yet.
- TOBI_OS itself is described but not exposed through local file links.
- The CBOS spotlight uses a production WebKit screenshot captured from the live reactivation workflow.
