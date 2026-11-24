// Two-Sentence Horror — deterministic entry writer (Node 22 stdlib only).
//
// The story: a thermostat that stops reporting the room and starts reporting
// a body. Sentence one sets a lonely, ordinary ritual; sentence two turns it:
// the house is no longer measuring the air, it is matching the narrator, and
// the vents breathe along. The horror is implied, never explained.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY =
  "I live alone, and every night before bed I set the thermostat to 68. " +
  "This morning it read 98.6, and every vent in the house was breathing in rhythm with my chest.";

function countSentences(text) {
  // A sentence ends with . ! or ? followed by a space or the end of text.
  return text.split(/(?<=[.!?])(?:\s+|$)/).filter((s) => s.trim().length > 0).length;
}

function validate(text) {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.length > 400) {
    throw new Error(`entry is ${text.length} characters, over the 400 limit`);
  }
  if (countSentences(text) !== 2) {
    throw new Error(`entry must be exactly two sentences, found ${countSentences(text)}`);
  }
}

validate(STORY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), STORY, "utf8");
console.log(`wrote ${STORY.length}-character entry to ${join(outDir, "entry.txt")}`);
