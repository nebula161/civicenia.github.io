#!/usr/bin/env bun
import { dev as watch } from "astro";

await watch({
    root: ".",
});

await import("netlify-cms-proxy-server");
