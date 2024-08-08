const fs = require("fs");
const path = require("path");
const os = require("os");

const fileWriter = () => {
  const homeDir = os.homedir();
  const filePath = path.join(homeDir, "Downloads", "text.txt");

  const content = "Some content";

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
};

module.exports = { fileWriter };
