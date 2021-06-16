/**
 * Created by Cooper on 2021/06/16.
 */

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

const defaultPollOptions = {
  delay: 100, // delay time to start loop query
  interval: 1000, // execute interval
  timeout: 10 * 1000, // time after long time
};

type Options = Partial<typeof defaultPollOptions>;

export default function poll<T extends (...args: any[]) => any>(
  fn: T,
  opts: Options & {
    onFulfilled: (result: Unpacked<ReturnType<T>>) => boolean;
    onReject: (result: Unpacked<ReturnType<T>>) => boolean;
  },
  ...args: Parameters<T>
) {
  let looper: NodeJS.Timer;
  let timer: NodeJS.Timer;
  mergeOption(opts, defaultPollOptions);

  const { delay, interval, timeout } = opts;
  return new Promise((resolve, reject) => {
    timer = setTimeout(reject, timeout, Error('polling timeout'));
    setTimeout(() => {
      looper = setInterval(async () => {
        try {
          const result = await fn(...args);
          if (opts.onFulfilled(result)) {
            return resolve(result);
          }
          if (opts.onReject(result)) {
            return reject(result);
          }
        } catch (e) {
          reject(e);
        }
      }, interval);
    }, delay);
  })
    .then((ret) => {
      clearInterval(looper);
      clearTimeout(timer);
      return ret;
    })
    .catch((err) => {
      clearInterval(looper);
      clearTimeout(timer);
      throw err;
    });
}

function mergeOption(input: any, defaultOptions: any) {
  for (const k in defaultOptions) {
    if (input[k] === undefined) {
      input[k] = defaultOptions[k];
    }
  }
}
