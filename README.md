# civicenia.github.io

## Updating the Site

There is a script called `admin.mjs`, which you can invoke with `./admin.mjs` or `node admin.mjs`. This script will run Astro in development mode and start a [NetlifyCMS](https://v1.netlifycms.org/) proxy. You can access the NetlifyCMS dashboard by going to http://localhost:4321/admin/index.html, or by clicking the "Admin" navigation link on the site.

The NetlifyCMS dashboard is extremely helpful when entering new bills and laws, but can be cumbersome with elections. I recommend doing elections manually since you can then copy-paste party names and colours wholesale. DO NOT REMOVE REPEALED LAWS! Just toggle the "EXPIRED" switch.

YOU NEED TO ADD THE LAW BEFORE YOU CAN POST A NEWS ITEM ABOUT HOW THAT LAW WAS ENACTED! You do this by clicking "Data" in the "Collections" side panel, then click "Laws". This will take you to a take listing all laws from oldest to newest. Click the "Add laws +" button, which should add a new entry to the bottom of the list (you wont be scrolled). Follow the instructions.
