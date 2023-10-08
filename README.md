# civicenia.github.io

## Updating the Site

There's a Deno script called `_admin.ts`. In order to run this, you'll need Deno, NodeJS, Jekyll, and Bundler installed. You'll need to have done `bundle install` to ensure everything is installed for Jekyll to build the site. The script is simple, so you can just do what the script does manually without much problem. The script exists so that you can Ctrl+C and both will exit at the same time + both will print to the same terminal.

What this script does is run NetlifyCMS, which makes it really easy to add news items and laws to the site, and Jekyll, the static site generator, which will rebuild after every change, giving you a local version of the site that you can use to test your changes. I recommend doing it this way.

The only instance where NetlifyCMS is more of a hindrance is when you're doing elections, because you can just copy paste the parties and their colours wholesale in yaml, but can't in NetlifyCMS, so you have to do it all manually, which is slow and fiddly.

YOU NEED TO ADD THE LAW TO THE ARCHIVE BEFORE YOU CAN POST A NEWS ITEM ABOUT HOW THAT LAW WAS ENACTED. Also, there is no difference between an active law and a repealed law, except for a checkbox, so if a law has been repealed, check that box, then move it down to the absolute bottom of the list.
