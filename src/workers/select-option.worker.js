/*
 * @Author       : djkloop
 * @Date         : 2021-07-07 22:13:10
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-07-07 23:45:25
 * @Description  : 头部注释
 * @FilePath     : /vue-worker/src/worker/select-options.worker.js
 */
import { has } from "lodash-es";

const obj = {
  foo: "foo",
};

has(obj, "foo");

self.addEventListener("message", (event) => {
  if (event.data.type && event.data.type === "appic-test") {
    for (let index = 0; index < event.data.workNumber; index++) {
      if (index === event.data.workNumber - 1) {
        self.postMessage({
          type: "appic-test",
          timeStart: event.data.timeStart,
          timeEnd: new Date().getTime(),
        });
      }
    }
  }
});
