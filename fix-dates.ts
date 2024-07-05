#!/usr/bin/env bun
import { Glob } from "bun";
import { promises as fs } from "node:fs";
import * as path from "node:path";
import parseGreyMatter from "gray-matter";
import {Dates, Strings} from "@helpers";

const SOURCE_NEWS_FOLDER = "./src/content/news/";
const SITE_NEWS_FOLDER = "/news/";
const NEWS_REGEX = /^\d+-\d{2}-\d{2}-(.*?)$/;

const redirects = new Map<string, string>();

const glob = new Glob("*.md");
for await (const filepath of glob.scan({ cwd: SOURCE_NEWS_FOLDER, onlyFiles: true })) {
    const filename = path.parse(filepath).name;

    let slugSuffix = "senate-election"; {
        // Convert "2024-02-01-senate-election" to "senate-election"
        const match = NEWS_REGEX.exec(filename)
        if (match === null) {
            console.warn(`Could not match [${filename}] with the news-item regex!`);
            continue;
        }
        slugSuffix = match[1];
    }

    let datePrefix = "0000-00-00"; {
        const parsed = parseGreyMatter(await Bun.file(SOURCE_NEWS_FOLDER + filepath).text());
        const date = Dates.parseDate(parsed.data.date);
        if (date === null) {
            console.warn(`Encountered weird date [${parsed.data.date}] within [${filename}]!`);
            continue;
        }
        datePrefix = Strings.formatDate(date, "yyyy-mm-dd");
    }

    const expectedFilename = datePrefix + "-" + slugSuffix;
    if (expectedFilename === filename) {
        continue;
    }

    console.warn(`Found incorrectly dated slug! Expected [${expectedFilename}], actual [${filename}]`);
    await fs.rename(
        SOURCE_NEWS_FOLDER + filepath,
        SOURCE_NEWS_FOLDER + expectedFilename + ".md"
    );
    redirects.set(
        SITE_NEWS_FOLDER + filename,
        SITE_NEWS_FOLDER + expectedFilename
    );
}

if (redirects.size > 0) {
    console.log("Please add the following entries to Astro's redirects:", Object.fromEntries(redirects.entries()));
}
