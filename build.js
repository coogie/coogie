"use strict";
import { fileURLToPath } from "url";
import chalk from "chalk";
import boxen from "boxen";
import fs from "fs";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Brand colours
const hex = {
  Mastodon: "#8c8dff",
  GitHub: "#ffffff",
  npm: "#cb3837",
  LinkedIn: "#0a66c2",
  web: "#00a6ed",
};

const name = "Stephen Coogan";
const handle = "coogie";
const work = "Lead Engineer at Personio";
const web = "https://coog.ie";
const card = "coogie";
const socials = [
  { show: 1, site: "Mastodon", url: "https://mastodon.ie", handle: "@coogie" },
  { show: 1, site: "GitHub", url: "https://github.com", handle: "coogie" },
  { show: 0, site: "npm", url: "https://npmjs.com", handle: "~coogie" },
  {
    show: 1,
    site: "LinkedIn",
    url: "https://linkedin.com/in",
    handle: "coogie",
  },
];

// Find the longest site name. We'll use this to "right align" the names
const longest = Math.max(
  ...socials.map(({ show, site }) => (show ? site.length : 0))
);
const pad = (str) => str.padStart(longest);
const line = (label, value) => {
  const punct = label ? ":" : " ";
  const pre = chalk.white.bold(`${pad(label)}${punct}`);
  const post = value.startsWith("http")
    ? chalk.gray(value)
    : chalk.white(value);
  return `${pre}  ${post}`;
};

// Put all our output together into a single variable so we can use boxen effectively
const output = `
${line("Work", work)}

${socials
  .filter(({ show }) => show === 1)
  .map((social) => {
    if (!social.show) return false;
    return line(
      social.site,
      `${social.url}/${chalk.hex(hex[social.site])(social.handle)}`
    );
  })
  .join("\n")}
${line("Web", chalk.hex(hex.web)(web))}

${line("Card", `${chalk.hex(hex.npm)("npx")} ${card}`)}
`;

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  title: `${name} / ${handle}`,
};

fs.writeFileSync(
  path.join(__dirname, "bin/output"),
  chalk.green(boxen(output, options))
);
