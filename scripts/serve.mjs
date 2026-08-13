#!/usr/bin/env node
/** Minimal static server for Railway: serves site/dist on $PORT. */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const DIST = new URL("../site/dist", import.meta.url).pathname;
const PORT = process.env.PORT || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".ico": "image/x-icon", ".txt": "text/plain", ".woff2": "font/woff2", ".xml": "application/xml",
};

createServer(async (req, res) => {
  try {
    let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
    if (path.endsWith("/")) path += "index.html";
    let file = join(DIST, path);
    let body;
    try {
      body = await readFile(file);
    } catch {
      file = join(DIST, path, "index.html");
      try {
        body = await readFile(file);
      } catch {
        res.writeHead(404, { "content-type": "text/html" });
        res.end(await readFile(join(DIST, "404.html")).catch(() => "Not found"));
        return;
      }
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream", "cache-control": "public, max-age=300" });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end("Server error");
  }
}).listen(PORT, () => console.log(`AI Money Tracker serving site/dist on :${PORT}`));
