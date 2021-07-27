<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12"
        ><el-card class="grid-content bg-purple box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="border">
            <img src="../../assets/img.jpg" alt="" />
            <div class="details">
              济南遥墙国际机场位于济南市东北方向的历城区，距市中心30公里，定位为具有特色的区域枢纽机场、山东省核心机场之一、大型机场、现代化联运的大型综合交通枢纽、京沪航路的备降机场、航空货运集疏散中心。近期规划用地面积1370.91公顷，总建筑面积约254万平方米，总投资约419.27亿元。飞行区新建2条跑道（新建西一、西二跑道），航站区新建60万平方米T2航站楼、38万平方米综合交通中心（含旅客过夜用房）及相关市政配套设施等，工作区主要建设综合办公用房、生产辅助设施。
            </div>
          </div>
        </el-card></el-col
      >
      <el-col :span="12"
        ><el-card class="grid-content bg-purple box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="slide">
            <el-carousel
              type="card"
              height="30vh"
              :trigger="click"
              :autoplay="false"
            >
              <el-carousel-item v-for="item in 3" :key="item">
                <!-- <h3>{{ item }}</h3> -->
                <video
                  :id="item"
                  class=""
                  poster="../../assets/timg.jpeg"
                  preload="none"
                  loop=""
                  height=""
                  controls
                >
                  <source
                    src="https://vjs.zencdn.net/v/oceans.mp4"
                    type="video/mp4"
                  />
                </video>
              </el-carousel-item>
            </el-carousel>
          </div> </el-card
      ></el-col>
    </el-row>
    <el-row :gutter="20" class="row-bottom">
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="row-body flex">
            <div id="figurePie" class="echartsBox"></div>
            <div id="emergencyPie" class="echartsBox"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="row-body over_auto">
            <router-link to="/Internal">
              <el-row
                :gutter="0"
                v-for="(item, i) in bimMassage"
                :key="i"
                class="listRow"
              >
                <el-col
                  :span="7"
                  class="ellipsis"
                  :title="item.LevelName"
                  v-if="item.LevelName == '紧急'"
                >
                  <el-button type="warning" round size="mini">
                    {{ item.LevelName }}</el-button
                  >
                </el-col>
                <el-col
                  :span="7"
                  class="ellipsis"
                  :title="item.LevelName"
                  v-else-if="item.LevelName == '一般'"
                >
                  <el-button type="success" round size="mini">
                    {{ item.LevelName }}</el-button
                  >
                </el-col>
                <el-col
                  :span="7"
                  class="ellipsis"
                  :title="item.LevelName"
                  v-else
                >
                  <el-button type="danger" round size="mini">
                    {{ item.LevelName }}</el-button
                  >
                </el-col>
                <el-col
                  :span="10"
                  class="taskName ellipsis"
                  :title="item.Title"
                >
                  {{ item.Title }}
                </el-col>
                <el-col :span="7" class="ellipsis" title="2021-09-23"
                  >2021-09-23</el-col
                >
              </el-row>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="row-body"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTableData } from "@/api/test.js";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],

      bimMassage: [
        {
          State: "待响应",
          Title: "请执行任务 JN-NBRW-29【aaa】",
          Time: "2021-03-03T14:50:55.913",
          EntityValue: "280",
          LevelName: "紧急",
        },
        {
          State: "待响应",
          Title: "请执行任务 JN-NBRW-28【444】",
          Time: "2021-03-03T14:46:18.947",
          EntityValue: "279",
          LevelName: "一般",
        },
        {
          State: "待响应",
          Title: "请执行任务 JN-NBRW-26【test5】",
          Time: "2021-03-03T11:21:35.143",
          EntityValue: "277",
          LevelName: "紧急",
        },
        {
          State: "待响应",
          Title: "请执行任务 JN-NBRW-25【test4】",
          Time: "2021-03-03T11:20:17.867",
          EntityValue: "276",
          LevelName: "非常紧急",
        },
        {
          State: "待响应",
          Title: "请执行任务 JN-NBRW-24【test3】",
          Time: "2021-03-03T11:17:06.997",
          EntityValue: "275",
          LevelName: "紧急",
        },
        {
          State: "待响应",
          Title: "请执行任务 @Obj.ActivityNumber@【0000】",
          Time: "2021-03-02T17:42:36.643",
          EntityValue: "253",
          LevelName: "一般",
        },
      ],
    };
  },
  mounted: function () {
    // 网络请求统一处理
    let color = ["red", "#91cc75"];
    let series = [
      {
        name: "任务完成比",
        type: "pie",
        radius: "80%",
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
        ],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    ];
    this.drawFigure("任务完成比", "figurePie", color, series);
    this.drawFigure("任务完成比", "emergencyPie", color, series);
    this.getlisttest();
  },
  methods: {
    drawFigure(pieTitle, chartName, color, series) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(chartName));
      // 绘制图表
      myChart.setOption({
        title: {
          text: pieTitle,
          top: "0",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          confine: true,
        },
        legend: {
          orient: "horizontal",
          bottom: "0",
        },
        color: color,
        series: series,
      });
    },
    getlisttest() {
      this.req({
        url: "/api/Project/HasProject/", // 此处写不同业务对应的url，框架会自动与baseURL拼接
        data: {},
        method: "GET",
      }).then(
        (res) => {
          // 请求成功后的处理
          console.log("res :", res);
        },
        (err) => {
          // 请求失败后的处理
          console.log("err :", err);
        }
      );
    },
  },
};
</script>

<style lang='scss' rel="stylesheet/scss" scope>
body {
  .container {
    padding-top: 10px;
    .border {
      height: 30vh;
      display: flex;
      img {
        width: 40%;
      }
      div {
        padding-left: 10px;
        overflow: auto;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        width: 60%;
      }
    }
    .slide {
      height: 30vh;
      video {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
      }
    }
    .row-bottom {
      padding-top: 10px;
      .row-body {
        height: 40vh;
        .listRow {
          margin-top: 10px;
        }
        .lavel {
          padding: 10px;
        }
      }
      .echartsBox {
        width: 50%;
        height: 100%;
      }
    }
  }
}
</style>