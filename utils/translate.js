const fs = require("fs");
const path = require("path");

const generateIdNameFile = async () => {
  const data = require(`${path.join(__dirname, "../src/test.json")}`);
  if (!Array.isArray(data)) return;
  const result = data.reduce((acc, cur) => {
    if (cur.id && cur.name) {
      acc[cur.id] = cur.name;
    }
    return acc;
  }, {});
  const jsonStr = JSON.stringify(result);
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, "../src/result.json"), jsonStr, (err) => {
      if (err) {
        reject(err);
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
        resolve();
      }
    });
  });
};

const accumulateIds = async () => {
  const idNameJSON = require(path.join(__dirname, "../src/result.json"));
  if (idNameJSON) {
    const ids = Object.keys(idNameJSON).reduce((acc, item) => {
      if (item) return acc.concat(item);
    }, []);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "../src/ids.json"),
        JSON.stringify(ids),
        (err) => {
          if (err) {
            console.log("Error writing file", err);
            reject(err);
          } else {
            console.log("Successfully wrote ids.json");
            resolve();
          }
        }
      );
    });
  }
};
const main = async () => {
  try {
    await generateIdNameFile();
    await accumulateIds();
  } catch (error) {
    console.error("Generation Failed", error);
  }
};

main();
