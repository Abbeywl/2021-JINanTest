<template>
  <span v-if="themeBar">
    <vab-icon
      title="主题配置"
      :icon="['fas', 'palette']"
      @click="handleOpenThemeBar"
    />
    <div class="theme-bar-setting">
      <div @click="handleOpenThemeBar">
        <vab-icon :icon="['fas', 'palette']" />
        <p>主题配置</p>
      </div>
    </div>

    <el-drawer
      title="主题配置"
      :visible.sync="drawerVisible"
      direction="rtl"
      append-to-body
      size="260px"
    >
      <el-scrollbar style="height: 94vh; overflow: hidden">
        <div class="el-drawer__body">
          <el-form ref="form" :model="theme">
            <el-form-item label="菜单布局">
              <el-switch
                v-model="layoutbool"
                :layoutname="theme.layout"
                active-color="#46a6ff"
              ></el-switch>
            </el-form-item>
            <el-form-item label="头部固定">
              <el-switch
                v-model="headerbool"
                :headername="theme.header"
                active-color="#46a6ff"
              ></el-switch>
            </el-form-item>
            <el-form-item label="多标签页">
              <el-switch
                v-model="tabsBarbool"
                :tabsbarname="theme.tabsBar"
                active-color="#46a6ff"
              ></el-switch>
            </el-form-item>
            <el-form-item>
              <label for="" style="display: inline-block; margin-bottom: 10px">
                主题
              </label>
              <el-row :gutter="20">
                <el-col
                  v-for="(item, index) in themeImg"
                  :key="index"
                  :span="12"
                  class="themediv"
                >
                  <el-image
                    :src="item.src"
                    :class="[theme.name == item.name ? 'active' : '']"
                    @click="handTypeColor(item.name)"
                  ></el-image>
                  <span class="demonstration">{{ item.name }}</span>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" align="top" style="flex-direction: column">
                <el-col>
                  <el-button type="primary" round @click="handleSaveTheme">
                    保存
                  </el-button>
                </el-col>
                <el-col>
                  <el-button round @click="handleSetDfaultTheme">
                    恢复默认
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </span>
</template>

<script>
  import variables from '@/styles/variables.scss'
  import { mapActions, mapGetters } from 'vuex'
  import { layout as defaultLayout } from '@/config'
  export default {
    name: 'VabThemeBar',
    data() {
      return {
        drawerVisible: false,
        layoutbool: Boolean,
        headerbool: Boolean,
        tabsBarbool: Boolean,
        theme: {
          name: 'default',
          layout: '',
          header: '',
          tabsBar: '',
        },
        themeImg: [
          {
            src: require('@/assets/styles_theme_images/default.jpg'),
            name: 'default',
          },
          {
            src: require('@/assets/styles_theme_images/dark.jpg'),
            name: 'dark',
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        layout: 'settings/layout',
        header: 'settings/header',
        tabsBar: 'settings/tabsBar',
        themeBar: 'settings/themeBar',
      }),
    },
    watch: {
      layoutbool: function (newdata, olddata) {
        var layouted = newdata ? 'vertical' : 'horizontal'
        this.theme.layout = layouted
      },
      headerbool: function (newdata, olddata) {
        var headered = newdata ? 'fixed' : 'noFixed'
        this.theme.header = headered
      },
      tabsBarbool: function (newdata, olddata) {
        var tabsBared = newdata ? 'true' : 'false'
        this.theme.tabsBar = tabsBared
      },
    },
    created() {
      this.$baseEventBus.$on('theme', () => {
        this.handleOpenThemeBar()
      })
      const theme = localStorage.getItem('vue-admin-beautiful-theme')
      if (null !== theme) {
        this.theme = JSON.parse(theme)
        this.handleSetTheme()
      } else {
        this.theme.layout = this.layout
        this.theme.header = this.header
        this.theme.tabsBar = this.tabsBar.toString()
      }
      this.handleSetSiwch()
    },
    methods: {
      ...mapActions({
        changeLayout: 'settings/changeLayout',
        changeHeader: 'settings/changeHeader',
        changeTabsBar: 'settings/changeTabsBar',
      }),
      handleIsMobile() {
        return document.body.getBoundingClientRect().width - 1 < 992
      },
      handleOpenThemeBar() {
        this.drawerVisible = true
      },
      handleSetTheme() {
        let { name, layout, header, tabsBar } = this.theme
        localStorage.setItem(
          'vue-admin-beautiful-theme',
          `{
            "name":"${name}",
            "layout":"${layout}",
            "header":"${header}",
            "tabsBar":"${tabsBar}"
          }`
        )
        if (!this.handleIsMobile()) this.changeLayout(layout)
        this.changeHeader(header)
        this.changeTabsBar(tabsBar)
        document.getElementsByTagName(
          'body'
        )[0].className = `vue-admin-beautiful-theme-${name}`
        this.drawerVisible = false
      },
      handleSaveTheme() {
        this.handleSetTheme()
      },
      handleSetDfaultTheme() {
        let { name } = this.theme
        document
          .getElementsByTagName('body')[0]
          .classList.remove(`vue-admin-beautiful-theme-${name}`)
        localStorage.removeItem('vue-admin-beautiful-theme')
        this.$refs['form'].resetFields()
        Object.assign(this.$data, this.$options.data())
        this.changeHeader(defaultLayout)
        this.theme.name = 'default'
        this.theme.layout = this.layout
        this.theme.header = this.header
        this.theme.tabsBar = this.tabsBar
        this.drawerVisible = false
      },
      handleGetCode() {},
      handleSetSiwch() {
        let { name, layout, header, tabsBar } = this.theme
        this.layoutbool = layout == 'vertical' ? true : false
        this.headerbool = header == 'fixed' ? true : false
        this.tabsBarbool = tabsBar == 'true' ? true : false
      },
      handTypeColor(data) {
        this.theme.name = data
      },
    },
  }
</script>

<style lang="scss" scoped>
  @mixin right-bar {
    position: fixed;
    right: 0;
    z-index: $base-z-index;
    width: 60px;
    min-height: 60px;
    text-align: center;
    cursor: pointer;
    background: $base-color-blue;
    border-radius: $base-border-radius;

    > div {
      padding-top: 10px;
      border-bottom: 0 !important;

      &:hover {
        opacity: 0.9;
      }

      & + div {
        border-top: 1px solid $base-color-white;
      }

      p {
        padding: 0;
        margin: 0;
        font-size: $base-font-size-small;
        line-height: 30px;
        color: $base-color-white;
      }
    }
  }

  .theme-bar-setting {
    @include right-bar;

    top: calc((100vh - 110px) / 2);

    ::v-deep {
      svg:not(:root).svg-inline--fa {
        display: block;
        margin-right: auto;
        margin-left: auto;
        color: $base-color-white;
      }

      .svg-icon {
        display: block;
        margin-right: auto;
        margin-left: auto;
        font-size: 20px;
        color: $base-color-white;
        fill: $base-color-white;
      }
    }
  }

  .el-drawer__body {
    padding: 20px;
  }

  .themediv {
    text-align: center;
    cursor: pointer;
    .el-image:hover::before,
    .active::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      content: '';
      border: 12px solid transparent;
      border-top-color: #9ba8b4;
      border-left-color: #9ba8b4;
    }

    .active::before {
      border-top-color: #007aff !important;
      border-left-color: #007aff !important;
    }

    .el-image:hover::after,
    .active::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 16px;
      height: 16px;
      font-family: 'iconfont' !important;
      font-size: 10px;
      font-style: normal;
      font-weight: 900;
      font-variant: normal;
      line-height: 16px;
      color: #fff;
      text-align: center;
      content: '\e636';
      text-rendering: auto;
    }
  }

  .el-button {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
<style lang="scss">
  .el-drawer__wrapper {
    outline: none !important;

    * {
      outline: none !important;
    }
  }

  .vab-color-picker {
    .el-color-dropdown__link-btn {
      display: none;
    }
  }
</style>
