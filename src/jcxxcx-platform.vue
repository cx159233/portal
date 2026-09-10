<template>
  <div class="login-auth-workbench" id="jcxxcx-workbench">
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
          <div class="header-title">两定机构医疗保障信息平台(常州)</div>
        </div>
        <div class="header-right">
          <div class="org-name "></div>
          <a class="back-portal" @click="goBack">&lt; 返回工作台</a>
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
          <h1 class="banner-title">两定机构医疗保障信息平台</h1>
          <p class="banner-description">
            面向常州市定点医疗机构与定点零售药店，提供医保协议管理、费用结算、考核评价等综合信息服务。
          </p>
        </div>
      </div>
    </div>
    <div class="cz-container">
      <!-- 服务卡片区域（分组） -->
      <div
        class="services-group"
        v-for="group in serviceGroups"
        :key="group.key"
      >
        <div class="group-header">
          <span class="group-title">{{ group.name }}</span>
        </div>
        <div class="services-grid" v-if="group.list && group.list.length">
          <div
            class="service-card"
            v-for="(service, index) in group.list"
            :key="group.key + '-' + index"
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
        <div class="empty-group" v-else>暂无</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkbenchUserInfo, resolveRoute } from '@/api/index.js'
import imgResource from '@/assets/czoa/数据资源.png'
import imgIndex from '@/assets/czoa/索引.png'
import imgResident from '@/assets/czoa/居民影像.png'
import imgService from '@/assets/czoa/数据服务.png'
import imgQuality from '@/assets/czoa/数据质控.png'
import imgCloud from '@/assets/czoa/数据上云.png'
import imgMonitor from '@/assets/czoa/智能监管.png'
import imgAi from '@/assets/czoa/ai.png'
import imgMonitorIcon from '@/assets/czoa/monitor.png'
import imgScreen from '@/assets/czoa/screen.png'

export default {
  data() {
    return {
      userInfo: null,
      serviceGroups: [
        {
          key: 'common',
          name: '常用入口',
          list: [
            { pm_code: 'XYZCML', pm_name: '西药中成药目录管理', pm_des: '提供西药与中成药医保目录的维护、查询与变更管理。', pm_img: imgResource },
            { pm_code: 'ZLYPML', pm_name: '中药饮片目录管理', pm_des: '提供中药饮片医保目录的维护、查询与变更管理。', pm_img: imgIndex },
            { pm_code: 'YBYS', pm_name: '医保医师信息查询', pm_des: '查询定点医疗机构医保医师的执业注册与备案信息。', pm_img: imgResident },
            { pm_code: 'YBYS2', pm_name: '医保药师信息查询', pm_des: '查询定点零售药店医保药师的执业注册与备案信息。', pm_img: imgService },
            { pm_code: 'ZFFS', pm_name: '支付方式分组付费管理', pm_des: '支持DRG/DIP分组结果查询与付费标准管理。', pm_img: imgQuality }
          ]
        },
        {
          key: 'system',
          name: '系统入口',
          list: [
            { pm_code: 'DDJGGL', pm_name: '定点医药机构管理系统', pm_des: '定点医药机构协议签订、变更与终止的全流程管理。', pm_img: imgCloud },
            { pm_code: 'ZNJG', pm_name: '医疗保障智能监管系统', pm_des: '医保基金智能审核、疑似违规筛查与监管处理。', pm_img: imgMonitor },
            { pm_code: 'YPZC', pm_name: '药品和医用耗材招采系统', pm_des: '药品与医用耗材集中招标采购、挂网与交易管理。', pm_img: imgResource },
            { pm_code: 'GGFW', pm_name: '医保公告服务系统', pm_des: '医保政策公告与通知信息的统一发布与查询。', pm_img: imgAi },
            { pm_code: 'ZFFSGL', pm_name: '支付方式管理系统', pm_des: 'DRG/DIP支付方式改革的分组、结算与考核管理。', pm_img: imgMonitorIcon },
            { pm_code: 'KSYDYJ', pm_name: '跨省异地就医管理系统', pm_des: '跨省异地就医备案、直接结算与费用核查管理。', pm_img: imgScreen }
          ]
        },
        {
          key: 'new',
          name: '新增入口',
          list: []
        }
      ]
    }
  },
  components: {},
  methods: {
    goBack() {
      location.href = resolveRoute('/')
    },
    async getInfo() {
      const res = await getWorkbenchUserInfo()
      if (res.code === 200) {
        this.userInfo = res.data || {}
      }
    },
    jump(item) {
      if (!item.pm_url) return
      let _url = ''
      if (item.pm_url.indexOf('?') !== -1) {
        _url = item.pm_url + '&userOrigin=jcxxcx'
      } else {
        _url = item.pm_url + '?userOrigin=jcxxcx'
      }
      location.href = resolveRoute(_url)
    }
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
#jcxxcx-workbench{
  width: 100%;
  height: 100vh;
  background-color: rgba(240, 242, 245, 1);
  overflow: auto;
}
.login-auth-workbench {
  min-height: calc(100vh - 100px);
  background-color: rgba(240, 242, 245, 1);
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

      .back-portal {
        font-size: 14px;
        color: rgba(19, 114, 209, 1);
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
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
    align-items: center;
    width: 90%;
    max-width: 1700px;
    margin: 0 auto;
  }

  .banner-left {
    width: 100%;
    position: relative;
    overflow: hidden;
    .banner-title {
      font-size: clamp(30px, 2.5vw, 48px);
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

}
.cz-container {
  width: 90%;
  margin: 0 auto;
  max-width: 1800px;
}

/* 服务卡片分组样式 */
.services-group {
  margin: 30px 0;
}

.group-header {
  margin-bottom: 18px;

  .group-title {
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.empty-group {
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
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
