import { readFileSync } from "fs"
;
const question = "What is the business operating cost?";

const notes = readFileSync("notes.txt", "utf-8");
const keywords = ["revenue", "profit", "earn", "money", "income","cost","operating"];

const lines = notes.split("\n").filter(line =>
  keywords.some(word => line.toLowerCase().includes(word))
);

console.log("QUESTION:");
console.log(question);

console.log("\nRETRIEVED CONTEXT:");
console.log(lines.join("\n") || "No matching information found.");

console.log("\nANSWER:");
if (lines.length > 0) {
  console.log("Information found in your business notes:");
  console.log(lines.join("\n"));
} else {
  console.log("I could not find the answer in the business notes.");
}
