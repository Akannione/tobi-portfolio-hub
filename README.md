# Tobi Oniyide Portfolio Hub

This is a dynamic static portfolio hub that connects the strongest existing assets in the workspace.

## Purpose

The hub turns scattered project folders into one public-facing proof system for:

- analytics roles
- business intelligence roles
- automation work
- technical consulting
- graduate school and career positioning

## Included Projects

- Business Operations Reporting & Automation System
- CRM Sales Pipeline & Lead Follow-Up Automation System
- Chiropractic Business OS MVP
- Transcript-Grounded AI Learning Agent
- TOBI_OS automation and operating-system proof

## How To View

Open this file in a browser:

```text
portfolio_hub/index.html
```

No build step is required.

The frontend uses:

- `index.html`
- `styles.css`
- `script.js`
- local image and document assets under `assets/`

## Deployment Check

Run this before publishing:

```bash
python3 scripts/check_deploy_ready.py
```

## Deployment Status

The hub is prepared for static deployment.

Use:

```text
portfolio_hub/DEPLOYMENT.md
```

The deployable folder now includes:

- public project links
- bundled resume PDF at `assets/docs/tobi_oniyide_master_resume.pdf`
- portfolio screenshot assets under `assets/images/`
- native JavaScript interactions in `script.js`
- deployment checker at `scripts/check_deploy_ready.py`
- `.nojekyll` for GitHub Pages compatibility

## Source Assets

Images are copied from:

```text
portfolio/business_admin_cist_ops_automation/assets/screenshots/
portfolio/crm_sales_pipeline_automation_system/assets/screenshots/
```

The live Chiropractic Business OS production screenshot is stored at:

```text
portfolio_hub/assets/images/business_os_mvp.png
portfolio_hub/assets/images/transcript_learning_agent.png
```

The portfolio project spotlight uses the raw screenshot assets inside a cleaned
CSS browser frame:

```text
portfolio_hub/assets/images/business_operations_dashboard.png
portfolio_hub/assets/images/crm_dashboard.png
portfolio_hub/assets/images/business_os_mvp.png
```

The frame, crop, and spacing live in `styles.css`, so future screenshots can be
swapped by changing `script.js` without regenerating wrapper images.

## Next Improvements

- Add a deployed public URL.
- Add a short walkthrough video for each completed case study.
- Use the live proof in direct applications, consulting conversations, and graduate-school positioning.
- Add new projects only when they exceed the proof quality of an existing entry.
- Add contact email once the public contact route is finalized.
