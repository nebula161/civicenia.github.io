// https://docs.astro.build/en/guides/content-collections/#defining-collections
import { z, defineCollection } from "astro:content";
import { Acts, Terms } from "../collections.ts";

export const collections = {
    "news": defineCollection({
        type: "content",
        schema: z.discriminatedUnion("layout", [
            Acts.Schema,
            Terms.Schema
        ])
    })
};
