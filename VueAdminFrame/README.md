## 环境依赖

node -v 10.0+

## 开发工具

git
vscode
vue-cil

## VScode 安装插件(建议)

Auto Close Tag
Auto Import
Auto Rename Tag
Debugger for Chrome
Guides
HTML CSS Support
HTML Snippets
indent-rainbow
Prettier
Settings Sync
Stylelint
Vetur
vscode-element-helper

## 目录结构

├── build # 构建相关
├── dist # 打包部署文件
├── mock # 项目 mock 模拟数据
├── node_modules # 依赖包
├── public # 静态资源
│ │── favicon.ico # favicon 图标
│ └── index.html # html 模板
├── src # 源代码
│ ├── api # 所有请求
│ ├── assets # 主题 字体等静态资源
│ ├── components # 全局公用组件
│ ├── directive # 全局指令
│ ├── config # 全局配置
│ ├── colorfulIcon # 项目所有多彩图标存放的位置
│ ├── remixIcon # 项目所有小清新图标存放的位置
│ ├── layouts # 全局外框 layout
│ ├── plugins # 部分组件 export
│ ├── router # 路由
│ ├── store # 全局 状态管理
│ ├── styles # 全局样式
│ ├── utils # 全局公用 utils
│ ├── views # views 所有页面
│ ├── App.vue # 入口页面
│ └── main.js # 入口文件 加载组件 初始化等
├── .env.development # 开发环境变量配置
├── .env.devtest # 测试环境变量配置
├── .env.production # 生产(部署)环境变量配置
├── .eslintrc.js # eslint 配置项
├── .babelrc # babel-loader 配置
├── .editorconfig # 编辑器配置
├── .stylelintrc.js # stylelintrc 配置
├── .gitignore # git 跟踪文件配置
├── .plopfile.js # 代码生成机配置
├── prettier.config.js # prettier 配置
├── vue.config.js # vue-cli 配置
└── package.json # package.json

## 启动项目

```
# 进入项目目录
cd XXX

# 安装淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 建议cnpm安装依赖，速度快，且依赖最新版本
cnpm i OR npm i

# 开发阶段
npm run serve

# 测试阶段
npm run devtest

# 部署阶段
npm run build

```

## 注意事项

1. 项目默认使用 lf 换行符而非 crlf 换行符，新建文件时请注意选择文件换行符
2. 项目默认使用的最严格的 eslint 校验规范（plugin:vue/recommended），使用之前建议配置开发工具实现自动修复
