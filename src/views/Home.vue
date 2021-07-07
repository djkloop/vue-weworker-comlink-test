<!--
 * @Author       : djkloop
 * @Date         : 2021-07-07 22:03:22
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-07-08 01:26:59
 * @Description  : 头部注释
 * @FilePath     : /vue-worker/src/views/Home.vue
-->
<template>
  <div class="home">
    <h3 v-if="!timerEnd">请选择第一个下拉框</h3>
    <h3 v-else>循环{{ work_count_1 }}条数据耗时time -> {{ timerEnd }} 秒</h3>
    <el-select v-model="value" placeholder="请选择" @change="useChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <p>
      <el-select
        v-model="value1"
        :disabled="linkDisabled"
        :placeholder="linkDisabled ? '正在加载数据请稍等~~' : '请选择'"
      >
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </p>
    <div>
      <h3>检测选择完下拉框处理数据的时候页面是否卡顿</h3>
      <el-badge :value="num" class="item">
        <el-button size="small" @click="useAddBageNumber">评论</el-button>
      </el-badge>
      <p>
        <el-checkbox v-model="checked">备选项</el-checkbox>
      </p>
      <p>
        <el-switch
          v-model="switchv"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </p>
      <p>
        <el-input-number v-model="num" label="描述文字"></el-input-number>
      </p>
    </div>
  </div>
</template>

<script>
import * as Comlink from "comlink";
import SelectWorker from "../workers/select-options.worker.js";

import dayjs from "dayjs";
export default {
  name: "Home",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      value1: "",
      options1: [],
      linkDisabled: false,
      timerId: "sel-timer-id-1",
      timerEnd: 0,
      num: 0,
      checked: false,
      switchv: false,
      work_count_1: 10000000000,
      work_count_2: 100000000,
      remoteWorker: {},
    };
  },
  mounted() {
    this.initWorker();
  },
  methods: {
    async initWorker() {
      const worker = new SelectWorker();
      this.remoteWorker = Comlink.wrap(worker);
    },
    async useChange() {
      this.linkDisabled = true;
      const res = await this.remoteWorker.useCalculateSelectOptions({
        type: "appic-test",
        workNumber: this.work_count_1 / 4,
        timeStart: new Date().getTime(),
      });
      console.log(res);
      const res1 = await this.remoteWorker.useCalculateSelectOptions({
        type: "appic-test",
        workNumber: this.work_count_1 / 4,
        timeStart: new Date().getTime(),
      });
      console.log(res1);
      const res2 = await this.remoteWorker.useCalculateSelectOptions({
        type: "appic-test",
        workNumber: this.work_count_1 / 4,
        timeStart: new Date().getTime(),
      });
      console.log(res2);
      const res3 = await this.remoteWorker.useCalculateSelectOptions({
        type: "appic-test",
        workNumber: this.work_count_1 / 4,
        timeStart: new Date().getTime(),
      });
      console.log(res3);
      this.linkDisabled = false;
      this.timerEnd += dayjs(res.timeEnd - res.timeStart).second();
      this.timerEnd += dayjs(res1.timeEnd - res1.timeStart).second();
      this.timerEnd += dayjs(res2.timeEnd - res2.timeStart).second();
      this.timerEnd += dayjs(res3.timeEnd - res3.timeStart).second();
    },
    useAddBageNumber() {
      this.num++;
    },
  },
};
</script>
