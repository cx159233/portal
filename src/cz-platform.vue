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
          <div class="header-title">医保综合服务平台</div>
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
            <span class="user-name">{{ userInfo && userInfo.name ? userInfo.name : '用户' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 顶部横幅区域 -->
    <div class="banner-container">
      <div class="banner-content">
        <div class="banner-left">
          <div class="banner-decoration"></div>
          <h1 class="banner-title">医保综合服务平台</h1>
          <p class="banner-description">
            依托医保数字化核心业务枢纽，集统一认证、智能鉴权与“数智医保”于一体的综合服务平台。
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
              <div class="step-name">服务汇聚</div>
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
              <div class="step-name">统一认证</div>
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
              <div class="step-name">智能鉴权</div>
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
              <div class="step-name">高效触达</div>
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
              <div class="step-name">数智医保</div>
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
      <!-- <div class="workbench-container-bottom workbench-container">
        <IndexReportingMonitoring ref="indexReportingMonitoring" />
        <DataCloudMonitoring ref="dataCloudMonitoring" />
      </div> -->
      <!-- <div class="workbench-container-bottom workbench-container">
        <DataQualityDisplay ref="dataQualityDisplay" />
        <InspectionResultsRecognition ref="inspectionResultsRecognition" />
      </div> -->
      <!-- 数据服务监测组件 -->
      <!-- <div class="workbench-container">
        <DataMonitor />
      </div> -->

      <!-- 待办事项 / 通知公告 -->
      <div class="bottom-panels">
        <div class="panel-card">
          <div class="panel-header">
            <span class="panel-title">待办事项</span>
            <a class="panel-more">更多 ></a>
          </div>
          <div class="panel-body">
            <div
              class="notice-row"
              v-for="(todo, index) in todoList"
              :key="'todo' + index"
            >
              <div class="notice-top">
                <span :class="['item-status', todo.level]">{{ todo.status }}</span>
                <span class="notice-date">{{ todo.date }}</span>
              </div>
              <div class="notice-title" :title="todo.title">{{ todo.title }}</div>
            </div>
          </div>
        </div>

        <div class="panel-card">
          <div class="panel-header">
            <span class="panel-title">通知公告</span>
            <a class="panel-more">更多 ></a>
          </div>
          <div class="panel-body">
            <div
              class="notice-row"
              v-for="(notice, index) in noticeList.slice(0, 5)"
              :key="'notice' + index"
            >
              <div class="notice-top">
                <span :class="['notice-tag', notice.tagClass]">{{ notice.type }}</span>
                <span class="notice-date">{{ notice.date }}</span>
              </div>
              <div class="notice-title" :title="notice.title">{{ notice.title }}</div>
              <div class="notice-content" :title="notice.content">{{ notice.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import autofit from 'autofit.js'
import { getWorkbenchUserInfo, getWorkbenchStatistics, resolveRoute } from '@/api/index.js'
import monitorPng from '@/assets/czoa/monitor.png'
export default {
  data() {
    return {
      userInfo: null,
      selOrg: '',
      icon: monitorPng,
      orgList: [],
      serviceList: [],
      loadData: {},
      todoList: [
        { title: '市中心人民医院影像数据上云接入申请待审批', status: '待审批', level: 'urgent', date: '2026-09-07', content: '机构已提交接入申请材料，等待经办机构线上审批。' },
        { title: '2026年第三季度影像数据质量核查任务待处理', status: '待处理', level: 'warning', date: '2026-09-06', content: '本季度核查任务已下发，请在9月30日前完成自查。' },
        { title: '市中医院新增索引上报接口联调确认', status: '进行中', level: 'info', date: '2026-09-05', content: '接口开发已完成，联调测试通过率92%，待最终确认。' },
        { title: '智能监管疑似违规检查结果复核（32条）', status: '待处理', level: 'warning', date: '2026-09-04', content: '系统识别疑似虚假检查记录32条，请及时复核反馈。' },
        { title: '商保数据调阅授权变更申请待审核', status: '待审批', level: 'urgent', date: '2026-09-03', content: '商保机构申请扩大数据调阅范围，需审核授权材料。' },
        { title: '区域影像中心存储扩容方案确认', status: '进行中', level: 'info', date: '2026-09-02', content: '扩容方案已通过技术评审，待项目组最终确认。' }
      ],
      noticeList: [
        { type: '政策文件', tagClass: 'policy', title: '关于开展2026年度医保影像数据质量专项检查的通知', content: '定于2026年9月至11月对全市定点医药机构开展影像数据质量专项检查。', date: '2026-09-07' },
        { type: '系统公告', tagClass: 'system', title: '医保影像云9月15日凌晨升级维护公告', content: '平台将于9月15日0:00-6:00进行升级维护，期间暂停影像调阅服务。', date: '2026-09-06' },
        { type: '政策文件', tagClass: 'policy', title: '关于印发医保影像检查结果互认实施细则的通知', content: '明确检查结果互认的范围、条件与流程，减轻群众重复检查负担。', date: '2026-09-05' },
        { type: '系统公告', tagClass: 'system', title: '数据上云监测看板新增质控指标上线说明', content: '看板新增完整率、一致率等质控指标，机构可在线查看质控详情。', date: '2026-09-04' },
        { type: '操作指引', tagClass: 'guide', title: '居民影像报告线上调阅功能操作指引（医疗机构版）', content: '介绍医疗机构影像报告线上调阅的入口、操作步骤与常见问题处理。', date: '2026-09-03' },
        { type: '政策文件', tagClass: 'policy', title: '关于规范商业保险机构影像数据调阅流程的通知', content: '进一步规范商保机构数据调阅申请、授权与核验全流程管理。', date: '2026-09-02' }
      ]
    }
  },
  components: {},
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
      location.href = resolveRoute(_url)
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
  src: url('@/assets/czoa/优设标题黑.TTF') format('truetype');
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
  background: url('@/assets/czoa/banner-bg.png') no-repeat center;
  background-size: cover;
  height: clamp(236px, 19.5vw, 375px);
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
      font-size: clamp(30px, 2.5vw, 48px);
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      // color: #fff;
      position: relative;
      z-index: 1;
    }
    .banner-description {
      font-size: clamp(13px, 1vw, 18px);
      line-height: 1.5;
      position: relative;
      z-index: 1;
      width: clamp(320px, 26vw, 500px);
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
        width: clamp(80px, 6.6vw, 127px);
        height: clamp(80px, 6.6vw, 127px);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .step-name {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-size: clamp(17px, 1.35vw, 26px);
        line-height: 1.4;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}

.service-card {
  background: linear-gradient( 181deg, #F5F6F9 0%, #FFFFFF 100%);
  box-shadow: 0px 0px 20px 1px rgba(10,84,149,0.08);
  border-radius: 8px;
  // padding: 24px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(10,84,149,0.15);
  }

  .service-icon {
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: -30px;
    top: -22px;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

  }

  .service-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin: 10px 0 20px 0;
    text-align: left;
    padding-left: 30px;
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
.workbench-container-top {
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
/* 待办事项 / 通知公告面板样式 */
.bottom-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  margin: 24px 0;
}

.panel-card {
  background: #ffffff;
  box-shadow: 0px 0px 20px 1px rgba(10, 84, 149, 0.08);
  border-radius: 8px;
  padding: 18px;

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .panel-title {
      font-size: 16px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      position: relative;
      padding-left: 10px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 14px;
        border-radius: 2px;
        background: rgba(19, 114, 209, 1);
      }
    }

    .panel-more {
      font-size: 13px;
      color: rgba(19, 114, 209, 1);
    }
  }
}

.notice-row {
  padding: 12px 14px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;

  & + .notice-row {
    margin-top: 10px;
  }

  &:hover {
    border-color: #bcd9f6;

    .notice-title {
      color: rgba(19, 114, 209, 1);
    }
  }

  .item-status {
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
    padding: 0 8px;
    border-radius: 4px;

    &.urgent {
      color: #f5222d;
      background: #fff1f0;
    }

    &.warning {
      color: #fa8c16;
      background: #fff7e6;
    }

    &.info {
      color: #1890ff;
      background: #e6f7ff;
    }
  }

  .notice-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .notice-date {
      font-size: 12px;
      color: #bbb;
    }
  }

  .notice-tag {
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
    padding: 0 8px;
    border-radius: 4px;

    &.policy {
      color: #1372d1;
      background: #e6f3ff;
    }

    &.system {
      color: #52c41a;
      background: #f0fff4;
    }

    &.guide {
      color: #fa8c16;
      background: #fff7e6;
    }
  }

  .notice-title {
    font-size: 14px;
    color: #333;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .notice-content {
    font-size: 13px;
    color: #999;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    grid-template-columns: repeat(4, 1fr);
    gap:18px;
  }
  .service-card{
    transform: scale(.9);
    .service-icon{
      width: 64px;
      height: 64px;
      left: -26px;
      top: -20px;
    }
    .service-title{
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
}

</style>
