import { stripHtml as INTERNAL_stripHtml } from "string-strip-html";
import { parse as INTERNAL_parseMarkdown } from "marked";
import INTERNAL_formatDate from "dateformat";

import { EXCERPT_SEPARATOR } from "@comptime";

export namespace Astros {
    export function isDevMode(): boolean {
        return import.meta.env.MODE === "development";
    }

    export function createLink(
        label: string,
        href: string,
        target: "_self" | "_blank" | "_parent" | "_top" = "_self"
    ) {
        return { label, href, target };
    }

    export function return404() {
        return new Response(null, {
            status: 404
        });
    }

    /**
     * @example
     * import { type APIContext } from "astro";
     * export async function GET(context: APIContext) {
     *     return renderJson({ "Hello": "World!" });
     * }
     */
    export function renderJson(
        json: Json.JSONValue
    ) {
        return new Response(JSON.stringify(json));
    }

    export function getOrGenerateExcerpt(
        entry: {
            body: string,
            data: unknown
        }
    ): string {
        // @ts-ignore
        const excerpt = entry.data.excerpt ?? null;
        if (excerpt !== null) {
            return excerpt;
        }
        const separatorIndex = entry.body.indexOf(EXCERPT_SEPARATOR);
        if (separatorIndex === -1) {
            return entry.body;
        }
        return entry.body.substring(0, separatorIndex);
    }
}

export namespace Nullish {
    export function exists(
        thing: unknown
    ): boolean {
        return (thing ?? null) !== null;
    }

    /**
     * Requires that a given thing has a value, or throws an error.
     */
    export function mustExist<T>(
        thing: T,
        message?: string
    ): NonNullable<T> {
        if (exists(thing)) {
            return thing!;
        }
        throw new Error(message ?? "Given thing must exist!");
    }
}

export namespace Json {
    export type JSONObject = { [key: string]: JSONValue | undefined };
    export type JSONArray = JSONValue[];
    export type JSONValue = JSONObject | JSONArray | string | number | boolean | null;

    /** Wrapper function for JSON.parse() that provides a proper return type. */
    export function parseJson(raw: string): JSONValue {
        return JSON.parse(raw)
    }
}

export namespace Arrays {
    export type ElementType<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

    export function hasElements<T>(
        array?: T[]
    ): boolean {
        return (array?.length ?? 0) > 0;
    }

    /**
     * Somewhat equivalent to [].join(), but instead of joining into a string, it's
     * combining into another array.
     */
    export function insertBetween<T>(
        array: readonly T[],
        between: () => T
    ): T[] {
        return array.flatMap((ele) => [ele, between()]).slice(0, -1);
    }

    /**
     * @example
     * const test = [{ time: new Date() }, { time: new Date(12345) }];
     * test.sort(sortByDate((entry) => entry.time));
     */
    export function sortByDate<T>(
        getter: (entry: T) => Date
    ): (lhs: T, rhs: T) => number {
        return (lhs, rhs) => getter(lhs).getTime() - getter(rhs).getTime();
    }

    export function toMap<T, K>(
        array: T[],
        keyer: (ele: T) => K
    ): Map<K, T> {
        return new Map(
            array.map((entry) => [keyer(entry), entry])
        );
    }
}

export namespace Strings {
    export function normaliseWhitespace(
        text: string
    ): string {
        return text.replaceAll(/\s+/gm, " ");
    }

    export function stripNewLines(
        text: string
    ): string {
        return text.replace("\n", "").replace("\r", "");
    }

    export function stripHtml(
        html: string
    ): string {
        return INTERNAL_stripHtml(html).result;
    }

    export const parseMarkdown = INTERNAL_parseMarkdown;
    export const formatDate = INTERNAL_formatDate;
}
