<template>
  <div class="login-auth-workbench" id="login-auth-workbench">
    <!-- 头部区域 -->
    <div class="header-container">
      <div class="header-content">
        <div class="header-left">
          <div class="logo">
            <img
              src="@/assets/czoa/logo.png"
              alt="logo"
            />
          </div>
          <div class="header-title">医保影像云统一服务门户</div>
        </div>
        <div class="header-right">
          <div class="org-name ">
            <!-- <a-select
              v-model="selOrg"
              placeholder="请选择组织"
            >
              <a-select-option v-for="item in orgList || []" :key="item.org_code" :value="item.org_code">
                {{ item.org_name }}
              </a-select-option>
            </a-select> -->
            <!-- <a-dropdown :trigger="['click']" v-if="orgList && orgList.length">
              <span class="ant-dropdown-link" @click="e => e.preventDefault()">
                {{ selOrg }} <a-icon type="down" />
              </span>
              <a-menu slot="overlay">
                <a-menu-item v-for="item in orgList || []" :key="item.org_code" @click="handleSelect(item)">
                  <span>{{ item.org_name }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown> -->
          </div>
          <div class="user-info">
            <a-button type="primary" shape="circle" icon="user" size="default"></a-button>
            <span class="user-name">{{ userInfo?.name || '用户' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 顶部横幅区域 -->
    <div class="banner-container">
      <div class="banner-content">
        <div class="banner-left">
          <div class="banner-decoration"></div>
          <h1 class="banner-title">医保影像云治理驾驶舱</h1>
          <p class="banner-description">
            依托影像大数据、人工智能核心技术，构建从资源汇聚到智能监管的全流程闭环管控，有效识别疑似虚假检查、重复检查等违规行为，提升监管精准度。
          </p>
        </div>
        <div class="banner-right">
          <!-- 流程步骤区域 -->
          <div class="process-steps">
            <div class="step-item">
              <div class="step-icon">
                <img
                  src="@/assets/czoa/data-resource.png"
                  alt=""
                >
              </div>
              <div class="step-name">数据资源</div>
            </div>
            <div class="step-arrow">
              <div class="triangle one "></div>
              <div class="triangle two "></div>
              <div class="triangle three "></div>
            </div>
            <div class="step-item">
              <div class="step-icon">
                <img
                  src="@/assets/czoa/data-cloud.png"
                  alt=""
                >
              </div>
              <div class="step-name">数据上云</div>
            </div>
            <div class="step-arrow">
              <div class="triangle one "></div>
              <div class="triangle two "></div>
              <div class="triangle three "></div>
            </div>
            <div class="step-item">
              <div class="step-icon">
                <img
                  src="@/assets/czoa/data-quality.png"
                  alt=""
                >
              </div>
              <div class="step-name">数据质控</div>
            </div>
            <div class="step-arrow">
              <div class="triangle one "></div>
              <div class="triangle two "></div>
              <div class="triangle three "></div>
            </div>
            <div class="step-item">
              <div class="step-icon">
                <img
                  src="@/assets/czoa/data-service.png"
                  alt=""
                >
              </div>
              <div class="step-name">数据服务</div>
            </div>
            <div class="step-arrow">
              <div class="triangle one "></div>
              <div class="triangle two "></div>
              <div class="triangle three "></div>
            </div>
            <div class="step-item">
              <div class="step-icon">
                <img
                  src="@/assets/czoa/data-monitor.png"
                  alt=""
                >
              </div>
              <div class="step-name">智能监管</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cz-container">
      <!-- 服务卡片区域 -->
      <div class="services-container">
        <div class="services-grid">
          <div
            class="service-card"
            v-for="(service, index) in serviceList || []"
            :key="index"
            @click="jump(service)"
          >
            <div class="service-icon">
              <img
                :src="service.pm_img"
                alt=""
              >
            </div>
            <div class="service-title">{{ service.pm_name }}</div>
            <div class="service-description" :title="service.pm_des">
              {{ service.pm_des }}
            </div>
          </div>
        </div>
      </div>
      <!-- 看板 -->
      <div class="workbench-container-bottom workbench-container">
        <!-- 索引上报监测组件 -->
        <IndexReportingMonitoring ref="indexReportingMonitoring" />

        <!-- 数据上云监测组件 -->
        <DataCloudMonitoring ref="dataCloudMonitoring" />

      </div>
      <!-- <div class="workbench-container-bottom workbench-container">
        <DataQualityDisplay ref="dataQualityDisplay" />
        <InspectionResultsRecognition ref="inspectionResultsRecognition" />
      </div> -->
      <!-- 数据服务监测组件 -->
      <!-- <div class="workbench-container">
        <DataMonitor />
      </div> -->
    </div>
  </div>
</template>

<script>
// import autofit from 'autofit.js'
import { getWorkbenchUserInfo, getWorkbenchStatistics } from '@/api/index.js'
export default {
  data() {
    return {
      userInfo: null,
      selOrg: '',
      icon: require('@/assets/czoa/monitor.png'),
      orgList: [],
      serviceList: [],
      loadData: {}
    }
  },
  components: {
    IndexReportingMonitoring: () => import('./components/IndexReportingMonitoring'),
    DataCloudMonitoring: () => import('./components/DataCloudMonitoring'),
    DataQualityDisplay: () => import('./components/DataQualityDisplay'),
    InspectionResultsRecognition: () => import('./components/InspectionResultsRecognition')
    // DataMonitor: () => import('./components/DataMonitor')
  },
  methods: {
    handleSelect(value) {
      this.selOrg = value.org_name
    },
   async getInfo() {
      const res = await getWorkbenchUserInfo()
      if (res.code === 200) {
        this.userInfo = res.data || {}
        this.orgList = res.data?.org_list || []
        this.serviceList = res.data?.permissions_list.filter(item => item.pm_code !== 'VGSPS') || []
        this.selOrg = this.orgList?.[0]?.org_name || ''
        this.getStatistics()
      }
    },
    async getStatistics() {
      const res = await getWorkbenchStatistics()
      if (res.code === 200) {
        this.loadData = res.data || {}
        this.$nextTick(() => {
          this.$refs.dataCloudMonitoring && this.$refs.dataCloudMonitoring.setData(this.loadData, this.serviceList)
          this.$refs.indexReportingMonitoring && this.$refs.indexReportingMonitoring.setData(this.loadData, this.serviceList)
        })
      }
    },
    jump(item) {
      // const href = `${location.origin}${service.pm_url}?userOrigin=czoa`
      // window.open(href, '_self')
      let _url = ''
      if (item.pm_url.indexOf('?') !== -1) {
        _url = item.pm_url
        _url += '&userOrigin=czoa'
      } else {
        _url = item.pm_url
        _url += '?userOrigin=czoa'
      }
      location.href = _url
    }
  },
   created() {
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'YouSheBiaoTiHei';
  src: url('~@/assets/czoa/优设标题黑.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#login-auth-workbench{
  width: 100%;
  height: 100vh;
  background-color: rgba(240, 242, 245, 1);
  overflow: auto;
}
.login-auth-workbench {
  min-height: calc(100vh - 100px);
  // padding: 16px;
  background-color: rgba(240, 242, 245, 1);
}
:v-deep.ant-select-selection {
  border: none !important;
  box-shadow: none !important;
}

/* 头部区域样式 */
.header-container {
  background-color: white;
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    height: 64px;
    .header-left {
      display: flex;
      align-items: center;

      .logo {
        width: 76px;
        height: 54px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .header-title {
        font-size: 18px;
        font-weight: 600;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 24px;

      .org-name {
        font-size: 14px;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 8px;
       ::v-deep .anticon-user{
          line-height: 32px;
        }
        .user-name {
          font-size: 14px;
        }
      }
    }
  }
}

/* 横幅区域样式 */
.banner-container {
  background: url('~@/assets/czoa/banner-bg.png') no-repeat center;
  background-size: cover;
  height: 375px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .banner-content {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    // text-align: left;
    width: 90%;
    max-width: 1700px;
    margin: 0 auto;
  }

  .banner-left {
    width: 40%;
    position: relative;
    overflow: hidden;
    .banner-title {
      font-size: 48px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      // color: #fff;
      position: relative;
      z-index: 1;
    }
    .banner-description {
      font-size: 24px;
      line-height: 36px;
      position: relative;
      z-index: 1;
      width: 500px;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .banner-right {
    // flex: 1;
    // width: 60%;
    width: calc(100% - 40%);
  }

  /* 流程步骤样式 */
  .process-steps {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      margin-right: 25px;

      .step-icon {
        width: 127px;
        height: 127px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
      }

      .step-name {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-size: 26px;
        line-height: 28px;
        color: rgba(51, 51, 51, 1);
      }
    }
    .step-arrow {
      position: relative;
      margin-right: 25px;
      min-width: 50px;
    }
    .triangle {
      width: 0px;
      height: 0px;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      border-left: 12px solid rgba(19, 114, 209, 1);
      position: relative;
      margin: 0 1px;
      animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
    }
    .one{
      transform: scale(.6);
      position: absolute;
      left: 0px;
      top: -15px;
    }
    .two{
      transform: scale(.8);
      position: absolute;
      left: 15px;
      top: -15px;
    }
    .three{
      transform: scale(1);
      position: absolute;
      left: 30px;
      top: -15px;
    }
    .one {
      animation-delay: 0s;
    }
    .two {
      animation-delay: 0.4s;
    }
    .three{
      animation-delay: 1s;
    }
  }
}
.cz-container {
  width: 90%;
  margin: 0 auto;
  max-width: 1800px;
}

/* 服务卡片区域样式 */
.services-container {
  margin: 30px 0;
  border-radius: 8px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 48px;
}

.service-card {
  background: linear-gradient( 181deg, #F5F6F9 0%, #FFFFFF 100%);
  box-shadow: 0px 0px 20px 1px rgba(10,84,149,0.08);
  border: 2px solid #e1f0ff;
  border-radius: 8px;
  // padding: 24px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(10,84,149,0.15);
  }

  .service-icon {
    width: 96px;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: -40px;
    top: -30px;
    img{
      width: 96px;
      max-height: 96px;
      // height: 96px;
    }
    // line-height: 70px;
  }

  .service-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin:10px  0 20px 0;
  }

  .service-description {
    font-size: 14px;
    color: #666;
    padding: 0px 10px;
    line-height: 1.6;
    text-align: left;
    //只展示三行
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  &.no-active {
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(100%) opacity(0.6);
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
.workbench-container-top {k
  display: flex;
  // grid-template-columns: 2fr 1fr;
  // grid-gap: 24px;
}
.workbench-container-bottom {
  // display: grid;
  // grid-template-columns: 4fr 3fr;
  // grid-gap: 24px;
  margin: 24px 0;
  display: flex;
  .index-reporting-monitoring{
    width: 60%;
    box-sizing: border-box;
    margin-right: 24px;
  }
  .data-cloud-monitoring{
    width: 40%;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 1500px) {
  .services-grid {
    grid-template-columns: repeat(5, 1fr);
    gap:18px;
  }
  .step-name{
    font-size: 30px !important;
  }
  .service-card{
    transform: scale(.9);
    .service-icon{
      width: 76px;
      height: 76px;
      // margin-bottom: 10px;
      // line-height: 50px;
      left: -30px;
      top: -30px;
    }
    .service-title{
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
  .banner-content{
    .banner-left{
      transform: scale(.8);
    }
    .process-steps{
      transform: scale(.7);
    }
  }
}

</style>
