# civicenia.github.io

## Installing the site

You'll need [git](https://git-scm.com/downloads), [node 20](https://nodejs.org/en/download/), and [pnpm](https://pnpm.io/installation).

- Clone the repo: `git clone https://github.com/CivIcenia/civicenia.github.io.git IceniaGov`

- Change directories into the cloned repo: `cd IceniaGov`

- Install the site's dependencies: `pnpm install`

## Updating the Site

There is a script called `admin.mjs`, which you can invoke via `./admin.mjs` or `node admin.mjs`. This script will run [Astro](https://docs.astro.build/en/getting-started/) in development mode and start a [NetlifyCMS](https://v1.netlifycms.org/) proxy. You can access the NetlifyCMS dashboard by going to http://localhost:4000/admin/index.html, or by clicking the "Admin" navigation link on the site.

The NetlifyCMS dashboard is extremely helpful when entering new bills and laws, but can be cumbersome with elections. I recommend using both the dashboard and your IDE with elections since you can then copy-paste party names and colours wholesale. DO NOT REMOVE REPEALED LAWS! Just toggle the "EXPIRED" switch in the dashboard.

## Saving in the Dashboard

Once you've finished editing something in the dashboard, you should see in the top left "UNSAVED CHANGES", and to the right of that is a dropdown-button labelled "Publish". Click that and choose the "Publish now" option. This will save your changes to disk.

## Particulars

- Laws:
  - YOU NEED TO ADD THE LAW BEFORE YOU CAN POST THE BILL THAT ENACTED THE LAW!
  - In the dashboard, click "Data" in the sidebar.
  - Click "Laws", this should bring up a page with all laws ordered from oldest to newest.
  - Click "Add law +"
  - Scroll down to the new form.
  - Follow the instructions.


- Bills:
  - Short and concise Bills should be recorded in Markdown (use the dashboard).
  - Longer Bills, or Bills that include media (like images), should be included as PDFs:
    - Export the Bill as-is to a PDF.
    - Generate a random UUIDv4 from https://www.uuidgenerator.net/ or `crypto.randomUUID()`
    - Rename the PDF to that UUIDv4 (eg: `648f32f8-b3cb-4cdc-98e5-8adef925ebf7.pdf`)
    - Move the PDF to `/public/archive/`
    - In the dashboard, scroll down to the "HOW ARE YOU EMBEDDING THIS?" section.
    - Select "Local File"
    - Paste your PDF's name prefixed by `/archive/` (eg: `/archive/648f32f8-b3cb-4cdc-98e5-8adef925ebf7.pdf`)


- Border Polygons:
  - Run `admin.mjs`
  - Open `/src/pages/government/borders.json.ts` in your IDE.
  - Open http://localhost:4000/government/map in your browser.
  - Ensure the "Icenian Territory" collection is toggled on.
  - The map page should automatically update anytime the file is saved.


- Officials:
  - Run `admin.mjs`
  - Open `src/pages/government/officials.astro` in your IDE.
  - Use https://toolscord.com/ to get the profile-pictures of each official.
  - Use their IGN, if known. Or otherwise use their Discord name, simplified if necessary.
  - Include each position, even if obvious (eg: that the Chief Magistrate is also a Magistrate)
  - Roles should be ordered as such: executive, then legislative, then judicial.


- Publishing
  - Always do `pnpm run build` before committing and pushing.
  - The site should automatically republish itself anytime you push to master.
  - If something goes wrong on Github's end, and you need to attempt a republish, do:
    - Click the "Actions" tab above (assuming you're on this repo's Github page)
    - Click the "IceniaGov Site Build" workflow in the left sidebar.
    - Click the "Run workflow" dropdown.
    - Ensure the "Branch" dropdown has the master branch selected.
    - Click the "Run workflow" button.
    - This will manually republish the site regardless of git activity.


- Styling
  - This site uses the GOVUK template.
  - You should consult [this](https://design-system.service.gov.uk/get-started/) if you intend to add new things to the site.
  - The "Components" tab is particularly useful. All of its components have a "HTML" source option, which you can copy as-is onto the site.