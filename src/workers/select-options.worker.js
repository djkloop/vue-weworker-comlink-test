/*
 * @Author       : djkloop
 * @Date         : 2021-07-07 22:13:10
 * @LastEditors   : djkloop
 * @LastEditTime  : 2021-07-08 17:33:26
 * @Description  : 头部注释
 * @FilePath      : /vue-weworker-comlink-test/src/workers/select-options.worker.js
 */
import * as Comlink from "comlink";
import { each } from "lodash-es";

Array.prototype.duffForEach = function (fn) {
  const len = this.length;
  var num = Math.floor(len / 8);
  var leftover = len % 8;
  var i = 0;
  if (leftover > 0) {
    do {
      fn(this[i], i++);
    } while (--leftover > 0);
  }
  if (this.length < 8) {
    return;
  }
  do {
    fn(this[i], i++);
    fn(this[i], i++);
    fn(this[i], i++);
    fn(this[i], i++);
    fn(this[i], i++);
    fn(this[i], i++);
    fn(this[i], i++);
    fn(this[i], i++);
  } while (--num > 0);
};

const o = {
  /// 应用
  useCalculateSelectOptions(v) {
    const vv = [];
    each(v.options, (val) => {
      vv.push(val.id);
    });
    return {
      type: "appic-test",
      timeStart: v.timeStart,
      timeEnd: new Date().getTime(),
      data: {
        options: vv,
      },
    };
  },
  /// 应用
  useCalculateSelectOptionsApp(v) {
    /// ??
    const ov = {};
    each(v.vals, (val) => {
      ov[val] = true;
    });

    ///
    const _o = [];
    for (let index = v.options.length - 1; index >= 0; index--) {
      const element = v.options[index];
      if (ov[element.id]) {
        _o.unshift(element);
      }
    }

    ///
    const _oo = [];
    each(_o, (val) => {
      _oo.push(val.id);
    });

    return {
      type: "appic-test",
      timeStart: v.timeStart,
      timeEnd: new Date().getTime(),
      data: {
        options: _o,
        options1: _oo,
      },
    };
  },
  /// 广告组
  useCalculateSelectOptionsAd(v) {
    const _o = [];
    const vals = [...new Set(v.vals)]
    const vals1 = [...new Set(v.vals1)]
    v.options.forEach((item) => {
      if (vals.includes(item.id) && vals1.includes(item.parter_id)) {
        _o.push(item);
      }
    });
    return {
      type: "appic-test",
      timeStart: v.timeStart,
      timeEnd: new Date().getTime(),
      data: {
        options: _o,
      },
    };
  },
};

Comlink.expose(o);
