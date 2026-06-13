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
- image assets under `assets/images/`
- native JavaScript interactions in `script.js`
- deployment checker at `scripts/check_deploy_ready.py`
- `.nojekyll` for GitHub Pages compatibility

## Source Assets

Images are copied from:

```text
portfolio/business_admin_cist_ops_automation/assets/screenshots/
portfolio/crm_sales_pipeline_automation_system/assets/screenshots/
```

The Chiropractic Business OS preview is stored at:

```text
portfolio_hub/assets/images/business_os_mvp.svg
```

It is a screenshot-style dashboard asset based on the actual `business_os_mvp`
React dashboard structure, because the current local environment blocked live
Vite browser capture during this pass.

## Next Improvements

- Add a deployed public URL.
- Add a short walkthrough video for each completed case study.
- Replace the Business OS SVG preview with a live browser screenshot when local Vite capture is available.
- Add a future AI automation case study.
- Add contact email once the public contact route is finalized.
