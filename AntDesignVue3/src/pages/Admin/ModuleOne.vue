<template>
  <div id="main">
    <a-empty>
      <span slot="description"> 欢迎来到 <a href="#">模块二</a> </span>
    </a-empty>
    <k-form-design toolbarsTop :showHead="false" style="height: 100%" />
  </div>
</template>

<script>
import "../../components/k-form-design/styles/form-design.less";
import KFormDesign from "../../components/k-form-design/packages/KFormDesign";
export default {
  components: { KFormDesign: KFormDesign },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang='less' scoped >
.main {
  height: 100%;
}
</style>