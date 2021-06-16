/**
 * Created by Cooper on 2021/06/16.
 */
const defaultPollOptions = {
  delay: 2000, // 延迟
  interval: 1000, // 执行间隔
  timeout: 30 * 1000, // 超时
};

type Options = Partial<typeof defaultPollOptions>;

export default function poll(uri: string, opts: Options = defaultPollOptions) {
  let looper: NodeJS.Timer;
  const { delay, interval, timeout } = opts;
  return new Promise((resolve, reject) => {
    setTimeout(reject, timeout, Error('polling timeout'));
    setTimeout(() => {
      looper = setInterval(() => {
        // if ... resolve
        // if ... reject
      }, interval);
    }, delay);
  })
    .then((ret) => {
      clearInterval(looper);
      return ret;
    })
    .catch((err) => {
      clearInterval(looper);
      throw err;
    });
}
