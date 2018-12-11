# Stream Readline

This package provides a stream to read file line by line, so every chunk of data is a string.

## Installation

```sh
npm install --save stream-readline
```

## Requirements

Node.js 8+.

## Usage

```js
const { createReadlineStream } = require('stream-readline');

const stream = createReadlineStream("input.txt");

stream.on("data", chunk => {
  console.log("===============");
  console.log(chunk); // your string
});
```

## License

MIT

