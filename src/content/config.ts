// https://docs.astro.build/en/guides/content-collections/#defining-collections
import { z, defineCollection } from "astro:content";
import { Acts, Elections } from "@collections";

export const collections = {
    "news": defineCollection({
        type: "content",
        schema: z.discriminatedUnion("layout", [
            Acts.Schema,
            Elections.Schema
        ])
    })
};
