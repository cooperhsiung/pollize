/**
 * Created by Cooper on 2021/06/16.
 */
import poll from '../index';

async function toCheck(i: number): Promise<number> {
  await sleep(200);
  const val = Math.random();
  console.log('got:', val, 'at', new Date());
  return i * val;
}

async function test() {
  const result = await poll(
    toCheck,
    {
      onFulfilled: (result) => result > 8, // polling until return more than 8
      onReject: (result) => result < 0.5, // throw error once result less than 0.5
    },
    10
  );
  console.log('result:', result);
}

test()
  .then((ret) => {
    console.log(ret);
  })
  .catch((err) => {
    console.error(err);
  });

function sleep(delay = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
