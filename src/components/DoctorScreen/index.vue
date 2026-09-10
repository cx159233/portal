<template>
  <div class="doctor-screen" id="login-auth-workbench">
    <!-- 顶部导航 -->
    <div class="header-container">
      <div class="header-content">
        <div class="header-left">
          <div class="logo">
            <img src="@/assets/czoa/logo.png" alt="logo" />
          </div>
          <div class="header-title">医生一屏看</div>
        </div>
        <div class="header-right">
          <a class="back-portal" @click="goBack">&lt; 返回工作台</a>
          <div class="user-info">
            <a-button type="primary" shape="circle" icon="user" size="default"></a-button>
            <span class="user-name">张三</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 横幅 -->
    <section class="hero">
      <img class="banner-img" src="@/assets/doctor/banner.png" alt="banner" />
      <div class="hero-inner">
        <div class="hero-copy">
          <span class="hero-tag"><a-icon type="audit" />合规透明 · 精准赋能 · 服务监管</span>
          <h1>医生一屏看</h1>
          <p>围绕医师执业全周期医保需求，打造阳光数据、阳光政策、阳光应用三大核心板块，将医保侧沉淀的全量业务数据、最新政策规则、AI 智能能力统一集成——医保业务全透明展示、政策精准定向推送、智能工具随取随用。</p>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- 上排：阳光数据 + 阳光政策 -->
      <div class="grid">
        <!-- 板块一：阳光数据 -->
        <div class="section">
          <div class="section-head">
            <span class="num">01</span>
            <div class="section-title">
              <h2>阳光数据</h2>
              <p>全量业务数据脱敏可视化，事前自主自查、主动规范执业</p>
            </div>
            <span class="more">更多 &gt;</span>
          </div>
          <div class="metrics">
            <div class="metric" v-for="(item, index) in statList" :key="index">
              <div class="metric-icon">
                <a-icon :type="item.icon" />
              </div>
              <div>
                <small>{{ item.label }}</small>
                <strong>{{ item.value }}<em>{{ item.unit }}</em></strong>
                <span :class="['trend', item.noteClass]">{{ item.note }}</span>
              </div>
            </div>
          </div>
          <div class="data-bottom">
            <div class="chart">
              <div class="box-title">近 12 个月服务医保患者人次（脱敏统计）</div>
              <svg viewBox="0 0 650 200" preserveAspectRatio="none" class="trend-svg">
                <g stroke="#e6eef6" stroke-width="1">
                  <line x1="40" y1="25" x2="635" y2="25"/>
                  <line x1="40" y1="65" x2="635" y2="65"/>
                  <line x1="40" y1="105" x2="635" y2="105"/>
                  <line x1="40" y1="145" x2="635" y2="145"/>
                  <line x1="40" y1="180" x2="635" y2="180"/>
                </g>
                <path d="M40 110 C70 95,90 92,95 92 S120 96,140 102 S165 120,185 126 S210 138,230 145 S255 122,278 108 S300 95,325 88 S350 78,370 76 S395 78,415 82 S440 92,465 98 S490 85,510 75 S535 62,565 58 S600 58,635 60 L635 180 L40 180Z" fill="#dceeff"/>
                <path d="M40 110 C70 95,90 92,95 92 S120 96,140 102 S165 120,185 126 S210 138,230 145 S255 122,278 108 S300 95,325 88 S350 78,370 76 S395 78,415 82 S440 92,465 98 S490 85,510 75 S535 62,565 58 S600 58,635 60" fill="none" stroke="#1688ee" stroke-width="3"/>
                <g fill="#fff" stroke="#1688ee" stroke-width="2">
                  <circle cx="40" cy="110" r="3.5"/>
                  <circle cx="95" cy="92" r="3.5"/>
                  <circle cx="140" cy="102" r="3.5"/>
                  <circle cx="185" cy="126" r="3.5"/>
                  <circle cx="230" cy="145" r="3.5"/>
                  <circle cx="278" cy="108" r="3.5"/>
                  <circle cx="325" cy="88" r="3.5"/>
                  <circle cx="370" cy="76" r="3.5"/>
                  <circle cx="415" cy="82" r="3.5"/>
                  <circle cx="465" cy="98" r="3.5"/>
                  <circle cx="510" cy="75" r="3.5"/>
                  <circle cx="565" cy="58" r="3.5"/>
                  <circle cx="635" cy="60" r="3.5"/>
                </g>
                <g fill="#7d94aa" font-size="11" text-anchor="middle">
                  <text x="40" y="197">10月</text>
                  <text x="90" y="197">11月</text>
                  <text x="140" y="197">12月</text>
                  <text x="185" y="197">1月</text>
                  <text x="230" y="197">2月</text>
                  <text x="275" y="197">3月</text>
                  <text x="325" y="197">4月</text>
                  <text x="370" y="197">5月</text>
                  <text x="415" y="197">6月</text>
                  <text x="460" y="197">7月</text>
                  <text x="510" y="197">8月</text>
                  <text x="620" y="197">9月</text>
                </g>
              </svg>
            </div>
            <div class="alerts">
              <div class="box-title">
                <a-icon type="alert" /> 合规自查提示
              </div>
              <div class="alert" v-for="(item, index) in riskList" :key="index">
                <div class="alert-head">
                  <span :class="['badge', item.level]">{{ item.levelText }}</span>
                  <span class="alert-title" :title="item.title">{{ item.title }}</span>
                </div>
                <div class="alert-desc" :title="item.desc">{{ item.desc }} · {{ item.date }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 板块二：阳光政策 -->
        <div class="section">
          <div class="section-head">
            <span class="num green">02</span>
            <div class="section-title">
              <h2>阳光政策</h2>
              <p>专属标签定向推送，预留自查补正缓冲空间</p>
            </div>
            <span class="more">更多 &gt;</span>
          </div>
          <div class="tags">
            <span class="tag2">心血管内科</span>
            <span class="tag2">临床执业医师</span>
            <span class="tag2">门诊 + 住院</span>
            <span class="tag2">市中心人民医院</span>
          </div>
          <div class="policy-list">
            <div class="policy" v-for="(item, index) in policyList" :key="index">
              <span :class="['policy-tag', item.tagClass]">{{ item.type }}</span>
              <div>
                <div class="pt" :title="item.title">{{ item.title }}</div>
                <span class="desc" :title="item.content">{{ item.content }}</span>
              </div>
              <span class="date">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 下排：阳光应用 -->
      <div class="section apps">
        <div class="section-head">
          <span class="num orange">03</span>
          <div class="section-title">
            <h2>阳光应用</h2>
            <p>依托医保 AI 智能体平台能力底座，轻量化 AI 服务嵌入日常开单、写病历执业流程</p>
          </div>
          <span class="more">更多 &gt;</span>
        </div>
        <div class="app-grid">
          <div class="app" v-for="(item, index) in appList" :key="index">
            <div class="app-icon">
              <a-icon :type="item.icon" />
            </div>
            <div class="app-body">
              <b>{{ item.name }}</b>
              <p>{{ item.desc }}</p>
            </div>
            <span class="use">使用 &gt;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resolveRoute } from '@/api/index.js'
export default {
  name: 'DoctorScreen',
  data() {
    return {
      statList: [
        { icon: 'team', label: '累计服务医保患者', value: '12,865', unit: '人次', note: '本年度 · 同比 +8.6%', noteClass: 'up' },
        { icon: 'experiment', label: '检查开具总量', value: '8,642', unit: '人次', note: '本年度 · 同比 +5.2%', noteClass: 'up' },
        { icon: 'medicine-box', label: '医保药品使用占比', value: '68.5', unit: '%', note: '科室均值 65.2%', noteClass: 'flat' },
        { icon: 'heart', label: '手术医保结算', value: '1,258', unit: '台次', note: '结算金额 862.4 万元', noteClass: 'flat' }
      ],
      riskList: [
        { level: 'warn', levelText: '关注', title: '“心脏彩超”开具率高于科室均值 23%', desc: '建议核对适应症，规避不合理检查风险', date: '2026-09-07' },
        { level: 'info', levelText: '提示', title: '医保药品使用占比接近科室警戒线（70%）', desc: '本月占比 68.5%，请关注用药结构', date: '2026-09-05' },
        { level: 'todo', levelText: '待办', title: 'DRG 入组偏差反馈 2 条待处理', desc: '详见 DRG 智能分组助手，请及时确认调整', date: '2026-09-01' }
      ],
      policyList: [
        { type: '异常线索', tagClass: 'red', title: '智能监管联动提示：您本月“心脏彩超”开具频次异常', content: '涉及相似案例已同步推送，请于 9 月 15 日前完成自查补正，避免非主观违规。', date: '2026-09-07' },
        { type: '目录更新', tagClass: 'cyan', title: '国家医保药品目录 2026 年动态调整：新增药品 91 种', content: '其中心血管系统用药 3 种，限定支付范围同步更新。', date: '2026-09-06' },
        { type: '招采价格', tagClass: 'g', title: '第八批集采药品价格调整通知', content: '硫酸氢氯吡格雷片等 12 种心血管常用药平均降价 52%，9 月 20 日执行。', date: '2026-09-05' },
        { type: '服务价格', tagClass: 'o', title: '常州市医疗服务价格动态调整（心血管诊疗类）', content: '冠脉造影等 6 项诊疗项目价格调整，请核对最新收费目录。', date: '2026-09-04' },
        { type: '目录更新', tagClass: 'cyan', title: '诊疗项目限定支付范围更新：冠脉 CTA', content: '限定支付条件修订，请规范开具并做好患者告知。', date: '2026-09-02' }
      ],
      appList: [
        { icon: 'medicine-box', name: 'AI 辅助诊断', desc: '影像与检验结果智能判读，辅助临床决策，提升诊断效率。' },
        { icon: 'audit', name: '医保合规 AI 助手', desc: '开单实时校验医保限定支付条件与用药规则，违规风险事前提醒。' },
        { icon: 'file-text', name: '病历书写助手', desc: '结构化病历智能生成与质控校验，减轻日常书写负担。' },
        { icon: 'robot', name: '政策问答智能体', desc: '医保政策自然语言问答，7×24 小时秒级响应，政策理解更高效。' },
        { icon: 'search', name: '智能开单审核', desc: '重复检查、药物相互作用智能识别与拦截，减少非主观违规。' },
        { icon: 'api', name: '检查结果互认调阅', desc: '跨机构检验检查结果智能推荐调阅，互认项目自动标识。' }
      ]
    }
  },
  methods: {
    goBack() {
      location.href = resolveRoute('/')
    }
  }
}
</script>

<style lang="less" scoped>
:root {
  --blue: #1688ee;
  --blue2: #36a8ff;
  --text: #17365f;
  --sub: #7690ad;
  --line: #dcecf9;
  --bg: #f2f8fd;
  --green: #18c978;
  --orange: #ffab35;
}

.doctor-screen {
  min-height: 100vh;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  color: var(--text);
  background: linear-gradient(180deg, #f5faff 0, #eef6fc 100%);
  font-size: 14px;
}

/* 头部区域 - 与集成工作台一致 */
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

        ::v-deep .anticon-user {
          line-height: 32px;
        }

        .user-name {
          font-size: 14px;
        }
      }
    }
  }
}

/* 横幅 - banner 原图满宽不裁剪，文字覆盖其上 */
.hero {
  position: relative;
}

.banner-img {
  display: block;
  width: 100%;
  height: auto;
}

.hero-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.hero-copy {
  width: 90%;
  max-width: 1800px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 3px 12px;
  border: 1px solid rgba(22, 136, 238, 0.4);
  border-radius: 4px;
  background: transparent;
  color: #1474c9;
  font-size: clamp(11px, 0.7vw, 12px);
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.5;

  ::v-deep .anticon {
    margin-right: 6px;
    font-size: 13px;
  }
}

.hero h1 {
  margin: clamp(5px, 0.6vw, 9px) 0 clamp(3px, 0.5vw, 7px);
  font-size: clamp(22px, 2.2vw, 42px);
  line-height: 1.05;
  color: #0d3a66;
  letter-spacing: 1px;
  font-weight: 800;
}

.hero p {
  margin: 0;
  max-width: clamp(680px, 40vw, 980px);
  color: #40628a;
  line-height: 1.7;
  font-size: clamp(12px, 0.85vw, 13.5px);
}

/* 容器 */
.container {
  width: 90%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 18px 0 30px;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1.15fr;
  gap: 18px;
}

/* 板块卡片 */
.section {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #dbeaf6;
  border-radius: 15px;
  padding: 16px;
  box-shadow: 0 8px 25px rgba(34, 108, 157, 0.07);
}

.section-head {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.num {
  width: 43px;
  height: 43px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3aaaff, #087de3);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 800;
  box-shadow: 0 6px 14px rgba(25, 143, 239, 0.22);

  &.green {
    background: linear-gradient(135deg, #37d998, #13b96e);
  }

  &.orange {
    background: linear-gradient(135deg, #ffc05b, #f39419);
  }
}

.section-title {
  margin-left: 13px;
  flex: 1;

  h2 {
    margin: 0 0 3px;
    font-size: 18px;
    color: #173d68;
    font-weight: 700;
  }

  p {
    margin: 0;
    color: #8aa0b7;
    font-size: 11px;
  }
}

.more {
  margin-left: auto;
  color: #1688ee;
  font-size: 12px;
  cursor: pointer;
}

/* 统计卡片 */
.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.metric {
  min-height: 91px;
  border: 1px solid #dcebf7;
  border-radius: 10px;
  background: linear-gradient(135deg, #fbfdff, #f2f8fd);
  padding: 13px;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: all 0.25s ease;
  cursor: default;

  &:hover {
    box-shadow: 0 4px 14px rgba(34, 108, 157, 0.1);
    transform: translateY(-2px);
  }
}

.metric-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #168ff0;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 18px;
  flex-shrink: 0;
}

.metric small {
  display: block;
  color: #647d98;
  font-size: 11px;
}

.metric strong {
  display: inline-block;
  font-size: 21px;
  margin: 2px 0;
  color: #173d68;
  font-weight: 700;
}

.metric em {
  font-style: normal;
  color: #718aa4;
  font-size: 11px;
  margin-left: 3px;
  font-weight: normal;
}

.metric .trend {
  display: block;
  font-size: 11px;
  color: #18bd6b;

  &.flat {
    color: #718aa4;
  }
}

.metric:nth-child(2) .metric-icon {
  background: #22c875;
}

.metric:nth-child(3) .metric-icon {
  background: #ffab35;
}

.metric:nth-child(4) .metric-icon {
  background: #8755e9;
}

/* 图表 + 提示 */
.data-bottom {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 10px;
  margin-top: 10px;
}

.chart,
.alerts {
  border: 1px solid #dcebf7;
  border-radius: 10px;
  padding: 14px 16px;
  background: #fff;
}

.box-title {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 8px;
  color: #173d68;
}

.trend-svg {
  width: 100%;
  height: 200px;
  display: block;
  margin-top: 6px;
}

.alerts {
  background: linear-gradient(180deg, #fffdf8, #fff);

  .box-title {
    color: #d98714;
  }
}

.alert {
  padding: 9px 10px;
  border: 1px solid #edf0f2;
  border-radius: 8px;
  margin-top: 7px;
  font-size: 11px;
  line-height: 1.45;
}

.alert-head {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.alert-title {
  flex: 1;
  font-size: 12px;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.alert-desc {
  color: #8aa0b7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
  margin-left: 1px;
}

.badge {
  flex-shrink: 0;
  display: inline-block;
  padding: 2px 7px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 11px;
  line-height: 1.6;

  &.warn {
    background: #fff1df;
    color: #ed901d;
  }

  &.info {
    background: #eaf6ff;
    color: #1688ee;
  }

  &.todo {
    background: #fff0f3;
    color: #f04d6a;
  }
}

/* 标签 */
.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 2px 0 12px;
}

.tag2 {
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #bfe3fb;
  background: #f2faff;
  color: #188be8;
  font-size: 11px;
}

/* 政策列表 */
.policy-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.policy {
  min-height: 55px;
  border: 1px solid #e2edf6;
  border-radius: 9px;
  padding: 8px 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 9px;
  align-items: center;
  background: #fff;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #bfe3fb;
    background: #f7fbff;
  }
}

.policy-tag {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;

  &.red {
    color: #f24f65;
    background: #fff0f3;
  }

  &.cyan {
    color: #159ce9;
    background: #eaf6ff;
  }

  &.g {
    color: #16bd73;
    background: #e9fbf2;
  }

  &.o {
    color: #f29a23;
    background: #fff4e5;
  }
}

.policy .pt {
  font-size: 12px;
  font-weight: 600;
  color: #173d68;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.policy .desc {
  display: block;
  color: #91a4b8;
  font-size: 10px;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 10px;
  color: #9baebe;
  white-space: nowrap;
}

/* 阳光应用 */
.apps {
  margin-top: 18px;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.app {
  height: 78px;
  border: 1px solid #dcebf7;
  border-radius: 10px;
  background: linear-gradient(110deg, #fff, #f6fbff);
  display: flex;
  align-items: center;
  padding: 12px 14px;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 18px rgba(34, 108, 157, 0.12);
    transform: translateY(-2px);
    border-color: #bfe3fb;
  }
}

.app-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #258fe9;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 18px;
  margin-right: 13px;
  box-shadow: 0 5px 13px rgba(37, 143, 233, 0.18);
  flex-shrink: 0;
}

.app:nth-child(2) .app-icon {
  background: #16bfd0;
}

.app:nth-child(3) .app-icon {
  background: #8755e9;
}

.app:nth-child(4) .app-icon {
  background: #ff9f43;
}

.app:nth-child(5) .app-icon {
  background: #168ff0;
}

.app:nth-child(6) .app-icon {
  background: #22c875;
}

.app b {
  font-size: 13px;
  color: #173d68;
}

.app p {
  font-size: 10px;
  color: #8ca1b7;
  margin: 5px 0 0;
  line-height: 1.4;
}

.app-body {
  flex: 1;
  min-width: 0;
}

.use {
  margin-left: auto;
  color: #1688ee;
  font-size: 11px;
  flex-shrink: 0;
}

/* 响应式 */
@media (max-width: 1200px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .app-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 15px 0;
  }

  .metrics {
    grid-template-columns: 1fr;
  }

  .app-grid {
    grid-template-columns: 1fr;
  }

  .data-bottom {
    grid-template-columns: 1fr;
  }
}
</style>
