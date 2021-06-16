# pollize

[![NPM Version][npm-image]][npm-url]
[![Node Version][node-image]][node-url]

poll until response

## Installation

```bash
npm i pollize -S
```

## Usage

```typescript
import poll from 'pollize';

async function toCheck(i: number): Promise<number> {
  await sleep(200);
  const val = Math.random();
  console.log('got:', val, 'at', new Date());
  return i * val;
}

const result = await poll(toCheck,{
  onFulfilled: (result) => result > 8, // polling until return more than 8
  onReject: (result) => result < 0.5, // throw error once result less than 0.5
}, 10);
console.log('result:', result);
```

## Options

```typescript
const defaultPollOptions = {
  delay: 100, // delay time to start loop query
  interval: 1000, // execute interval
  timeout: 10 * 1000, // time after long time
};
```

## Examples

examples are listed at [examples](https://github.com/cooperhsiung/pollize/tree/master/examples)

## Todo

- [ ] xx

## Others


## License

MIT

[npm-image]: https://img.shields.io/npm/v/pollize.svg
[npm-url]: https://www.npmjs.com/package/pollize
[node-image]: https://img.shields.io/badge/node.js-%3E=8-brightgreen.svg
[node-url]: https://nodejs.org/download/
