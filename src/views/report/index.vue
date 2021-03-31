<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 2. 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 750px;height:400px;" />
    </el-card>
  </div>
</template>

<script>
// 1. 导入 echart
import * as echarts from 'echarts'
import _ from 'lodash'

import { getReportsData } from '@/api/reports'

export default {
  name: 'Report',
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {

  },
  async mounted() {
    const data = await this.getData()
    this.setEchart(data)
  },
  methods: {
    async getData() {
      const result = await getReportsData()
      console.log(result)
      return result.data
    },
    setEchart(data) {
    // 3. 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))

      // 4. 准备数据和配置项
      const result = _.merge(data, this.options)

      // 5. 展示数据
      // myChart.setOption(options)
      myChart.setOption(result)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
