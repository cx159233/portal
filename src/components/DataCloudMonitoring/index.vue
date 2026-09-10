<template>
  <div class="data-cloud-monitoring common-card">
    <div class="component-header">
      <h3>
        <img src="@/assets/czoa/cloud.png" />
        <span>数据上云监测</span>
      </h3>
      <!-- <a-button type="link" class="enter-system-btn">进入系统 &gt;</a-button> -->
    </div>

    <div class="content">
      <div class="statistics">
        <div class="stat-item">
          <div class="stat-label">累计报告总量</div>
          <div class="stat-value">{{ formattedTotalReportCnt }} <span>万份</span></div>
        </div>
        <div class="stat-item">
          <div class="stat-label">累计存储量</div>
          <div class="stat-value">{{ formattedTotalImageSize }} <span>TB</span></div>
        </div>
      </div>

      <div class="chart-container">
        <h4>近半年上云动态(TB)</h4>
        <div ref="cloudChart" class="cloud-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { resolveRoute } from '@/api/index.js'

export default {
  data() {
    return {
      chartInstance: null,
      summaryMetrics: {},
      halfYearStorage: {},
      itemObj: null
    }
  },
  computed: {
    // 格式化累计报告总量
    formattedTotalReportCnt() {
      return this.formatWithCommas(this.summaryMetrics.totalReportCnt)
    },
    // 格式化累计存储量
    formattedTotalImageSize() {
      return this.formatWithCommas(this.summaryMetrics.totalImageSize)
    }
  },
  mounted() {
    // this.initChart()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
    if (this.chartInstance) {
      this.chartInstance.dispose()
    }
  },
  methods: {
    // 添加千位分隔符的格式化方法
    formatWithCommas(num) {
      if (num === null || num === undefined) return 0
      if (typeof num === 'string') num = parseFloat(num)
      if (isNaN(num)) return 0

      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    initChart() {
      this.chartInstance = echarts.init(this.$refs.cloudChart)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c} TB'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.halfYearStorage.date,
          axisLine: {
            lineStyle: {
              color: '#ccc'
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
              color: '#e9e9e9'
            }
          }
        },
        series: [
          {
            name: '上云量',
            type: 'bar',
            data: this.halfYearStorage.data,
            itemStyle: {
              color: '#53B982',
              borderRadius: [4, 4, 0, 0]
            },
            barWidth: '60%'
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
      this.summaryMetrics = data.summaryMetrics || {}
      this.halfYearStorage = data.halfYearStorage
      this.initChart()
      this.itemObj = list.find(item => item.pm_code === 'DCMP')
    },
    jump() {
      console.log(this.itemObj, '<<<ob')
      if (this.itemObj) {
        const href = resolveRoute(`${this.itemObj.pm_url}?userOrigin=czoa`)
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
.data-cloud-monitoring {
  .statistics {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      padding: 20px 30px;
      background: #ECFEF5;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 1px solid #DBFAE9;
      .stat-label {
        font-size: 14px;
        color: #59A57F;
        font-weight: bold;
      }

      .stat-value {
        font-size: 24px;
        font-weight: 500;
        color: #286148;
        span{
          font-size: 14px;
        }
      }
      &:last-child {
        margin-bottom: 0;
        background: #EFF6FE ;
        border-color: #D6EAF8;
        .stat-label {
          color: @primary-color;
        }
        .stat-value {
          color: #1E40AF;
        }
      }
    }
  }

  .chart-container {
    height: 250px;

    h4 {
      margin: 0 0 15px 0;
      font-size: 14px;
      color: #666;
    }

    .cloud-chart {
      width: 100%;
      height: calc(100% - 25px);
    }
  }
}
</style>
