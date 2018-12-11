const { Readable } = require("stream");
const { createReadStream } = require("fs");

class ReadlineStream extends Readable {
  constructor(filePath) {
    super(filePath);

    this.__internalStream = createReadStream(filePath, {
      encoding: "utf-8"
    });
    this.__lines = [];
    this.__firstLine = "";

    this.__internalStream.on("data", chunk => {
      if (chunk.includes("\n")) {
        const lines = chunk.split("\n");
        const firstLine = (this.__firstLine || "") + lines.shift();
        this.__firstLine = lines.pop();
        this.__lines.push(firstLine);
        this.__lines = this.__lines.concat(lines);

        while (this.__lines.length > 0) {
          let line = this.__lines.shift();

          if (this.push(line) === false) {
            this.__internalStream.pause();
            break;
          }
        }
      } else {
        this.__firstLine += chunk;
      }
    });

    this.__internalStream.on("end", () => {
      this.push(null);
    });
  }

  // implemented according to docs:
  // https://nodejs.org/api/stream.html#stream_readable_read_size_1
  _read() {
    this.__internalStream.resume();
  }
}

function createReadlineStream(...args) {
  return new ReadlineStream(...args);
}

module.exports = ReadlineStream;
module.exports.createReadlineStream = createReadlineStream;
