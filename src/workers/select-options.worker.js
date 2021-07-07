/*
 * @Author       : djkloop
 * @Date         : 2021-07-07 22:13:10
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-07-08 01:15:00
 * @Description  : 头部注释
 * @FilePath     : /vue-worker/src/workers/select-options.worker.js
 */
import * as Comlink from "comlink";

const o = {
  useCalculateSelectOptions(v) {
    for (let index = 0; index < v.workNumber; index++) {
      if (index === v.workNumber - 1) {
        return {
          type: "appic-test",
          timeStart: v.timeStart,
          timeEnd: new Date().getTime(),
        };
      }
    }
  },
};

Comlink.expose(o);
