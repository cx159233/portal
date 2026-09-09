<template>
  <div class="index-reporting-monitoring common-card">
    <div class="component-header" @click="jump">
      <h3>
        <img src="@/assets/czoa/arrow.png" />
        <span>索引上报监测</span>
      </h3>
      <a-button type="link" class="enter-system-btn">进入系统 ></a-button>
    </div>

    <div class="content">
      <div class="left-section">
        <div class="hospital-ranking">
          <h4>医院上报排行榜(top10)</h4>
          <div class="ranking-list">
            <div v-for="(hospital, index) in hospitalRankings" :key="index" class="ranking-item">
              <span class="rank" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
              <span class="hospital-name" :title="hospital.hospitalName">{{ hospital.hospitalName }}</span>
              <span class="report-count">{{ hospital.formattedIndexReportCnt }}条</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right-section">
        <div class="statistics">
          <div class="stat-item">
            <div class="stat-label">今日累计上报</div>
            <div class="stat-value">{{ formattedTodayReport }} <span>条</span></div>
            <!-- <div :class="['stat-trend', summaryMetrics.todayIndexReportDoD > 0 ? 'positive' : 'negative']">{{ summaryMetrics.todayIndexReportDoD > 0 ? '+' : '' }}{{ summaryMetrics.todayIndexReportDoD }}%</div> -->
          </div>
          <div class="stat-item">
            <div class="stat-label">最近30天日均</div>
            <div class="stat-value">{{ formattedAvgReport }} <span>条</span></div>
          </div>
        </div>

        <div class="chart-container">
          <h4>近10天上报趋势(条)</h4>
          <div ref="reportChart" class="report-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      hospitalRankings: [],
      chartInstance: null,
      summaryMetrics: {},
      itemObj: null
    }
  },
  computed: {
    // 格式化今日累计上报数量
    formattedTodayReport() {
      return this.formatWithCommas(this.summaryMetrics.todayIndexReportCnt)
    },
    // 格式化最近30天日均上报数量
    formattedAvgReport() {
      return this.formatWithCommas(this.summaryMetrics.last30DaysAvgIndexReportCnt)
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
    if (this.chartInstance) {
      this.chartInstance.dispose()
    }
  },
  methods: {
    // 数字格式化方法：将数字转换为1.2w或6k格式
    formatNumber(num) {
      if (num === null || num === undefined) return 0
      if (typeof num === 'string') num = parseFloat(num)
      if (isNaN(num)) return 0

      if (num >= 10000) {
        return (num / 10000).toFixed(1).replace(/\.0$/, '') + 'w'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
      } else {
        return num.toString()
      }
    },

    // 添加千位分隔符的格式化方法
    formatWithCommas(num) {
      if (num === null || num === undefined) return 0
      if (typeof num === 'string') num = parseFloat(num)
      if (isNaN(num)) return 0

      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    initChart(obj) {
      this.chartInstance = echarts.init(this.$refs.reportChart)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c} 条'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: obj.date || [],
          axisLine: {
            lineStyle: {
              color: '#e8e8e8'
            }
          },
          axisLabel: {
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: '上报数量',
            type: 'line',
            data: obj.data || [],
            lineStyle: {
              color: '#1890ff'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                { offset: 1, color: 'rgba(24, 144, 255, 0.05)' }
              ])
            },
            smooth: true
          }
        ]
      }

      this.chartInstance.setOption(option)
    },
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    },
    setData(data, list) {
      // console.log(data, '<<<data')
      this.summaryMetrics = data.summaryMetrics || {}
      // 格式化医院排行榜数据
      this.hospitalRankings = (data?.top10IndexReport || []).map(hospital => ({
        ...hospital,
        formattedIndexReportCnt: this.formatNumber(hospital.indexReportCnt)
      }))
      this.initChart(data.recent10DaysIndex)
      // console.log(list, '<<lisy')
      this.itemObj = list.find(item => item.pm_code === 'MUAV')
    },
    jump() {
      // console.log(this.itemObj, '<<<ob')
      if (this.itemObj) {
        const href = `${location.origin}${this.itemObj.pm_url}?userOrigin=czoa`
        window.open(href, '_self')
      } else {
        this.$message.error('暂无权限')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../common.less);
.index-reporting-monitoring {
  .content {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-gap: 20px;
  }
  .left-section{
    background: #F5F6F9;
    border-radius: 8px;
    padding: 20px;
  }
  .hospital-ranking {
    h4 {
      margin: 0 0 15px 0;
      font-size: 14px;
      color: #666;
      font-weight: bold;
    }

    .ranking-item {
      display: flex;
      align-items: center;
      padding: 8px 0;

      .rank {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        background: #c0c0c0;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        margin-right: 5px;
      }

      .top-three {
        background: @primary-color;
        color: #fff;
      }

      .hospital-name {
        flex: 1;
        font-size: 14px;
        color: #333;
        max-width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .report-count {
        font-size: 14px;
        margin-left: 20px;
        color: #111;
      }
    }
  }

  .statistics {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    .stat-item {
      text-align: center;
      background: #EFF6FE;
      padding: 30px 0;
      flex: 1;
      border-radius: 8px;
      margin: 0 15px;
      .stat-label {
        font-size: 14px;
        color: @primary-color;
        margin-bottom: 8px;
      }

      .stat-value {
        font-size: 26px;
        font-weight: 500;
        color: #1E40AF;
        margin-bottom: 4px;
        span{
          font-size: 14px;
        }
      }

      .stat-trend {
        font-size: 14px;

        &.positive {
          color: #52c41a;
        }
        &.negative{
          color: red;
        }
      }
      &:last-child{
        filter: grayscale(80%);
      }
    }
  }

  .chart-container {
    height: 250px;

    .report-chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
