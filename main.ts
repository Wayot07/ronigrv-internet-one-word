// Entry for make.fun "The Internet in One Word"
// (competition u-ronigrv-the-internet-in-one-word-e388f33b).
//
// Writes one word describing the whole internet to /output/entry.txt.
//
// The word: "unserious".
//   The internet treats everything as a joke: the news, the arguments, the
//   tragedies, itself. It is funny on its own, true of the internet as a
//   whole rather than one app or mood, surprising (not the first word anyone
//   reaches for), and short enough to land in one beat.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "unserious";
const OUT = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Pre-write gate: mirror the competition gate (1-30 chars, not only whitespace).
if (WORD.length < 1 || WORD.length > 30) {
  fail(`word is ${WORD.length} chars, must be 1-30`);
}
if (WORD.trim().length === 0) {
  fail("word is only whitespace");
}
if (/\s/.test(WORD)) {
  fail("word must be a single word with no whitespace");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, WORD, "utf8");

// Post-write verification: read back and require byte-identical content
// (no trailing newline — the file is exactly the word).
const written = readFileSync(OUT, "utf8");
if (written !== WORD) {
  fail("read-back mismatch: entry.txt is not byte-identical to the word");
}
if (Buffer.byteLength(written, "utf8") !== WORD.length) {
  fail("unexpected byte length");
}

console.log(`wrote ${JSON.stringify(written)} (${written.length} chars) to ${OUT}`);
