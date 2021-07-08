<!--
 * @Author: yeyuhang
 * @Date: 2020-11-03 18:41:07
 * @LastEditTime: 2020-11-12 16:06:24
 * @LastEditors: yeyuhang
 * @Descripttion: 头部注释
-->
<template>
  <el-select
    :value="value"
    v-bind="$attrs"
    :clearable="isClearable"
    @change="setSelectValue"
    :filter-method="handleFilterMethods"
    @visible-change="handleVisiableChange"
    :popper-class="(show && currentSelects.length) < 10 ? '' : 'appic-select'"
  >
    <template v-if="show && currentSelects.length < 10">
      <el-option
        v-for="item in currentSelects"
        :key="item[selectVal]"
        :label="item[selectLabel]"
        :value="item[selectVal]"
      />
    </template>

    <template v-else-if="show">
      <appic-virtual-list
        :height="230"
        :list-data="currentSelects"
        :estimated-item-size="34"
      >
        <template slot-scope="{ item }">
          <el-option
            :key="item[selectVal]"
            :label="item[selectLabel]"
            :value="item[selectVal]"
          />
        </template>
      </appic-virtual-list>
    </template>
    <template v-else> </template>
  </el-select>
</template>

<script>
import { cloneDeep, debounce, isString } from "lodash-es";

export default {
  name: "appic-select",
  props: {
    value: [String, Array],
    selectOptions: Array,
    selectLabel: {
      type: String,
      default: "label",
    },
    isClearable: {
      type: Boolean,
      default: true,
    },
    selectVal: {
      type: String,
      default: "value",
    },
  },
  data() {
    return {
      currentValue: "",
      cacheOptions: [],
      currentSelects: [],
      show: true,
    };
  },
  watch: {
    selectOptions: {
      handler: function () {
        this.setCurrentSelectOptions();
        this.setSelectCacheOptions();
      },
      deep: true,
    },
  },
  created() {
    this.initSelectProps();
  },
  methods: {
    initSelectProps() {
      this.setSelectCacheOptions();
      this.setCurrentSelectOptions();
    },
    setSelectValue(e) {
      this.$emit("input", e);
      this.$emit("change", e);
    },
    setSelectCacheOptions() {
      this.cacheOptions = cloneDeep(this.selectOptions);
    },
    setCurrentSelectOptions() {
      this.currentSelects = cloneDeep(this.selectOptions);
    },
    handleVisiableChange(flag) {
      if (!flag) {
        this.currentSelects = [];
        this.$nextTick(() => {
          this.currentSelects = cloneDeep(this.cacheOptions);
        });
      }
    },
    handleFilterMethods: debounce(function (v) {
      if (v) {
        this.show = false;
        let _options = [];
        _options = this.cacheOptions.filter((item) => {
          const itemValue = Object.values(item).map((item) =>
            isString(item) ? item.toLocaleLowerCase() : item
          );
          if (itemValue.join("").indexOf(v.toLocaleLowerCase()) !== -1) {
            return item;
          } else {
            return null;
          }
        });
        this.currentSelects = _options;
        this.$nextTick(() => {
          this.show = true;
        });
      } else {
        this.currentSelects = this.cacheOptions;
      }
    }, 300),
  },
};
</script>

<style lang="scss">
.appic-select {
  .el-scrollbar__view {
    height: 244px;
  }
  .scroller {
    height: 100%;
  }
}
</style>
