import { z, getCollection } from "astro:content";
import { Arrays } from "@helpers";

export const CollectionItemSchema = z.object({
    "layout": z.string()
});

export const NewsItemSchema = CollectionItemSchema.extend({
    "headline": z.string(),
    "date": z.coerce.date(),
    "excerpt": z.string().optional(),
    "icon": z.string()
});

// ############################################################
// Terms
// ############################################################

export namespace Terms {
    export type Term = z.infer<typeof Schema>;
    export const Schema = NewsItemSchema.extend({
        "layout": z.literal("@layouts/news/term.astro"),
        "election": z.literal(true),
        "term": z.coerce.number().int().positive(),
        "parties": z.array(z.object({
            "name": z.string(),
            "bgcolour": z.string(),
            "txtcolour": z.string(),
            "members": z.array(z.string()).optional().default([]),
            "exmembers": z.array(z.string()).optional().default([])
        }))
    });

    export function isTerm(
        frontmatter: any
    ) {
        return frontmatter["election"] === true;
    }

    export function ensureTerm<T extends Term>(
        term: T
    ): T {
        term.parties ??= [];
        for (const party of term.parties) {
            party.members ??= [];
            party.exmembers ??= [];
        }
        return term;
    }

    /**
     * Retrieves all terms sorted from newest to oldest.
     */
    export async function getTerms() {
        return (await getCollection("news"))
            .filter((entry) => isTerm(entry.data))
            .sort(Arrays.sortByDate((entry) => entry.data.date))
            .reverse();
    }
}

// ############################################################
// Acts
// ############################################################

export namespace Acts {
    export type Act = z.infer<typeof Schema>;
    export const Schema = NewsItemSchema.extend({
        "layout": z.literal("@layouts/news/act.astro"),
        "changetolaw": z.literal(true),
        "institution": z.enum(["senate", "executive", "referendum", "icenian-signatures"]),
        "document": z.object({
            "type": z.enum(["local-file", "remote-file", "markdown"]),
            "value": z.string()
        }),
        "changes": z.array(z.object({
            "kind": z.enum(["passage", "amendment", "repeal"]),
            "target": z.string()
        }))
    });

    export function isAct(
        frontmatter: any
    ) {
        return frontmatter["changetolaw"] === true;
    }

    export function ensureAct<T extends Act>(
        act: T
    ): T {
        act.changes ??= [];
        return act;
    }

    /**
     * Retrieves all acts sorted from newest to oldest.
     */
    export async function getActs() {
        return (await getCollection("news"))
            .filter((entry) => isAct(entry.data))
            .sort(Arrays.sortByDate((entry) => entry.data.date))
            .reverse();
    }
}

// ############################################################
// Laws
// ############################################################

import LawsData from "./data/laws.yml";
export namespace Laws {
    export type Law = z.infer<typeof Schema>;
    export const Schema = z.object({
        "slug": z.string(),
        "name": z.string(),
        "fullname": z.string().optional(),
        "kind": z.enum(["constitution", "statute", "statehood", "treaty"]),
        "googledoc": z.string(),
        "hidden": z.boolean(),
    });

    export async function getLaws(): Promise<Law[]> {
        return (LawsData["entries"] as any[])
            .map((law) => Schema.safeParse(law))
            .filter((parsed) => parsed.success)
            // @ts-ignore
            .map((parsed) => parsed["data"]);
    }

    export function getFullTitle(
        law: Law
    ): string {
        return law.fullname || law.name;
    }

    export async function getChangers(
        law: Law
    ) {
        return (await Acts.getActs())
            .flatMap((act) => {
                const data = act.data as Acts.Act;
                return data.changes.map((change) => ({
                    kind: change.kind,
                    target: change.target,
                    act
                }));
            })
            .filter((changer) => changer.target === law.slug);
    }
}
