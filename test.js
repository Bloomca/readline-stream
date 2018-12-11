const fs = require("fs");
const path = require("path");
const { createReadlineStream } = require("./index");

const firstLine = "first line";
const secondLine = "second line";
const fileContent = `${firstLine}
${secondLine}
`;

const filePath = path.join(__dirname, "__test.txt");

describe("stream-readline", () => {
  beforeAll(() => {
    fs.writeFileSync(filePath, fileContent);
  });
  afterEach(() => {
    fs.unlinkSync(filePath);
  });

  it("should read line by line", done => {
    const stream = createReadlineStream(filePath);
    let i = 1;
    stream.on("data", chunk => {
      if (i === 1) {
        expect(chunk.toString()).toBe(firstLine);
      } else if (i === 2) {
        expect(chunk.toString()).toBe(secondLine);
      }

      i++;
    });
    stream.on("end", done);
  });
});
