const DatauriParser = require("datauri/parser");
const path = require("path");

const getDataUri = (file) => {
  const datauri = new DatauriParser();
  const extName = path.extname(file.originalname).toString();
  return datauri.format(extName, file.buffer);
};

module.exports = getDataUri;