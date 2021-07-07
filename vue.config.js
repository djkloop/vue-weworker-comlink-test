/*
 * @Author       : djkloop
 * @Date         : 2021-07-07 22:07:02
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-07-08 01:06:58
 * @Description  : 头部注释
 * @FilePath     : /vue-worker/vue.config.js
 */
module.exports = {
  chainWebpack: (config) => {
    // 配置
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .options({
        inline: "fallback",
      });
    config.module.rule("js").exclude.add(/\.worker\.js$/);
  },
  // 解决打包的时报错: (由于一些原因我的项目最后没有使用 worker, 也就没有研究打包遇到的问题...)
  parallel: false,
};
