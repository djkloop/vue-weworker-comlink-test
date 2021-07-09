/* 
 * @Author       : Eug
 * @Date         : 2021-07-08 20:14:24
 * @LastEditTime : 2021-07-08 20:46:41
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /vue-weworker-comlink-test/src/workers/select-options.worker.js
 */

import * as Comlink from "comlink";
import { each } from "lodash-es";

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
      if (ov[element.partner_id]) {
        _o.unshift(element);
      }
    }
    ///
    const _oo = [];
    each(_o, (val) => {
      _oo.push(val.appid);
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
    v.options.forEach((item) => {
      if (v.vals.includes(item.appid) && v.vals1.includes(item.partner_id)) {
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
