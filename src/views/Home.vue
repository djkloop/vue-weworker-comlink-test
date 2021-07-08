<!--
 * @Author       : djkloop
 * @Date         : 2021-07-07 22:03:22
 * @LastEditors   : djkloop
 * @LastEditTime  : 2021-07-08 14:56:09
 * @Description  : 头部注释
 * @FilePath      : /vue-weworker-comlink-test/src/views/Home.vue
-->
<template>
  <div class="home">
    <h3 v-if="!timerEnd">请选择第一个下拉框</h3>
    <h3 v-else>循环{{ work_count_1 }}条数据耗时time -> {{ timerEnd }} 秒</h3>
    <h3>耗时time -> {{ timerM }} 毫秒</h3>
    <appic-select
      filterable
      v-model="value"
      :selectOptions="options"
      multiple
      selectLabel="label"
      selectVal="value"
      @change="useChange"
    />
    <p>
      <appic-select
        filterable
        v-model="value1"
        :disabled="linkDisabled"
        :selectOptions="options1"
        multiple
        :placeholder="linkDisabled ? '正在加载数据请稍等~~' : '请选择'"
        selectLabel="label"
        selectVal="value"
      />
    </p>
    <p>
      <appic-select
        filterable
        v-model="value1"
        :disabled="linkDisabled"
        :selectOptions="options1"
        multiple
        :placeholder="linkDisabled ? '正在加载数据请稍等~~' : '请选择'"
        selectLabel="label"
        selectVal="value"
      />
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
          value: 0,
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
        {
          value: 1111,
          label: "黄金糕",
        },
        {
          value: "选1项2",
          label: "双皮奶",
        },
        {
          value: "选2项3",
          label: "蚵仔煎",
        },
        {
          value: "选3项4",
          label: "龙须面",
        },
        {
          value: "选4项5",
          label: "北京烤鸭",
        },
        {
          value: 205,
          label: "黄金糕",
        },
        {
          value: "选6项2",
          label: "双皮奶",
        },
        {
          value: "选7项3",
          label: "蚵仔煎",
        },
        {
          value: "选项84",
          label: "龙须面",
        },
        {
          value: "选项45",
          label: "北京烤鸭",
        },
        {
          value: 303,
          label: "黄金糕",
        },
        {
          value: "选项232",
          label: "双皮奶",
        },
        {
          value: "选34项3",
          label: "蚵仔煎",
        },
        {
          value: "选432项4",
          label: "龙须面",
        },
        {
          value: "选4432项5",
          label: "北京烤鸭",
        },
      ],
      value: [],
      value1: [],
      options1: [],
      options2: [],
      ids: [],
      linkDisabled: false,
      timerId: "sel-timer-id-1",
      timerEnd: 0,
      timerM: 0,
      num: 0,
      checked: false,
      switchv: false,
      work_count_1: 1000000000,
      work_count_2: 100000000,
      work_count_3: 100000,
      work_count_4: 200000,
      remoteWorker: {},
    };
  },
  mounted() {
    this.initWorker();
    for (let index = 0; index < this.work_count_3; index++) {
      this.options1.push({
        label: "index" + index,
        value: "value" + index,
        id: index < 20000 ? 0 : index,
      });
    }
    for (let index = 0; index < this.work_count_4; index++) {
      this.options2.push({
        label: "index" + index,
        value: "value" + index,
        id: index < 20000 ? 0 : index,
        parter_id: 0,
      });
    }
  },
  methods: {
    async initWorker() {
      const worker = new SelectWorker();
      this.remoteWorker = Comlink.wrap(worker);
    },
    async useChange() {
      this.linkDisabled = true;
      // this.options1 = this.options1.filter((item) =>this.value.includes(item.id));
      // this.ids = this.options1.map((item) => item.id);
      // this.options2 = this.options2.filter(
      //   (item) =>
      //     this.ids.includes(item.id) && this.value1.includes(item.parter_id)
      // );
      const now = new Date().getTime();
      const res = await this.remoteWorker.useCalculateSelectOptionsApp({
        type: "appic-test",
        options: this.options1,
        vals: this.value,
        timeStart: new Date().getTime(),
      });
      // const res2 = await this.remoteWorker.useCalculateSelectOptions({
      //   type: "appic-test",
      //   options: res.data.options,
      //   timeStart: new Date().getTime(),
      // });
      const res3 = await this.remoteWorker.useCalculateSelectOptionsAd({
        type: "appic-test",
        options: this.options2,
        vals: res.data.options1,
        vals1: this.value1,
        timeStart: new Date().getTime(),
      });
      this.options1 = res.data.options;
      this.ids = res.data.options1;
      this.options2 = res3.data.options;
      // const res2 = await this.remoteWorker.useCalculateSelectOptions({
      //   type: "appic-test",
      //   workNumber: this.work_count_1 / 4,
      //   timeStart: new Date().getTime(),
      // });
      // console.log(res2);
      // const res3 = await this.remoteWorker.useCalculateSelectOptions({
      //   type: "appic-test",
      //   workNumber: this.work_count_1 / 4,
      //   timeStart: new Date().getTime(),
      // });

      // console.log(res3);
      this.linkDisabled = false;
      // this.timerEnd += dayjs(res.timeEnd - res.timeStart)
      // this.timerEnd += dayjs(res1.timeEnd - res1.timeStart)
      // this.timerEnd += dayjs(res2.timeEnd - res2.timeStart)
      const end = new Date().getTime();
      this.timerM = end - now;
      this.timerEnd += dayjs(end - now).format("ss:SSS");
    },
    useAddBageNumber() {
      this.num++;
    },
  },
};
</script>
