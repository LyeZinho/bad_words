const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "bad-words.txt");
const file = fs.readFileSync(filePath, "utf-8");
const lines = file.split("\n");
const json = lines.map(line => {
    //Remove 1 last characters
    const word = line.slice(0, -1);
    return {
        input: word,
        output: 1
    }
});


const jsonPath = path.join(__dirname, "badwordslist.json");
fs.writeFileSync(jsonPath, JSON.stringify(json));
console.log("Model saved");