<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 初始element-ui版本-
// "element-ui": "2.7.2",
export default {
  name: "App",
};
</script>
<style lang="scss">
// 滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background: #b9b9b9;
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
}
// 滚动条样式
body {
  background: #edf5ff;
  .container {
    padding: 0 10px;
  }
}
.root {
  margin: 50px 25px 0px 25px;
}
.my-flex {
  display: flex;
}
.over_auto {
  overflow: auto;
}
.flex {
  display: flex;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
