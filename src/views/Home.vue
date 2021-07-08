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
    <!-- <el-select v-model="value" placeholder="请选择" @change="useChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select> -->
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
      <!-- <el-select
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
      </el-select> -->
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

// import dayjs from "dayjs";
// import { filter } from 'vue/types/umd';
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
      ],
      value: [],
      value1: [],
      options1: [],
      options2: [],
      ids: [],
      linkDisabled: false,
      timerId: "sel-timer-id-1",
      timerEnd: 0,
      num: 0,
      checked: false,
      switchv: false,
      work_count_1: 1000000000,
      work_count_2: 100000000,
      work_count_3: 40000,
      work_count_4: 60000,
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
      // const res = await this.remoteWorker.useCalculateSelectOptions({
      //   type: "appic-test",
      //   workNumber: this.work_count_1 / 4,
      //   timeStart: new Date().getTime(),
      // });
      // console.log(res);
      // const res1 = await this.remoteWorker.useCalculateSelectOptions({
      //   type: "appic-test",
      //   workNumber: this.work_count_1 / 4,
      //   timeStart: new Date().getTime(),
      // });
      // console.log(res1);
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
      this.options1 = this.options1.filter((item) =>
        this.value.includes(item.id)
      );
      this.ids = this.options1.map((item) => item.id);
      this.options2 = this.options2.filter(
        (item) =>
          this.ids.includes(item.id) && this.value1.includes(item.parter_id)
      );
      // console.log(res3);
      this.linkDisabled = false;
      // this.timerEnd += dayjs(res.timeEnd - res.timeStart)
      // this.timerEnd += dayjs(res1.timeEnd - res1.timeStart)
      // this.timerEnd += dayjs(res2.timeEnd - res2.timeStart)
      // this.timerEnd += dayjs(res3.timeEnd - res.timeStart).format("mm:ss:SSS");
    },
    useAddBageNumber() {
      this.num++;
    },
  },
};
</script>
