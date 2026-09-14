import imgCloud from '@/assets/czoa/数据上云.png'
import imgService from '@/assets/czoa/数据服务.png'
import imgMonitor from '@/assets/czoa/智能监管.png'
import imgResident from '@/assets/czoa/居民影像.png'
import imgResource from '@/assets/czoa/数据资源.png'

const permissionsList = [
  { pm_code: 'DCMP', pm_name: '患者一屏看', pm_des: '多源健康数据聚合，一屏纵览全息医疗档案。', pm_img: imgCloud, pm_url: 'https://doctorprotal-mvp.tssz.qzz.io/?view=overview' },
  // { pm_code: 'JG', pm_name: '医生一屏看', pm_des: '提供阳光数据、阳光政策、阳光应用板块，提供医师全量业务数据查询、最新政策规则调阅、AI智能能力。', pm_img: imgMonitor, pm_url: '/jg' },
  { pm_code: 'JCXXCX', pm_name: '两定机构医疗保障信息平台', pm_des: '面向定点医疗机构与定点零售药店，提供医保协议管理、费用结算、考核评价等综合信息服务。', pm_img: imgService, pm_url: '/jcxxcx' },
  { pm_code: 'DRGRZ', pm_name: '医保人工智能服务平台', pm_des: '面向定点医药机构，提供多云大模型与AI智能体服务', pm_img: imgResource, pm_url: 'https://agentoperation.tssz.qzz.io/#/terminal-user?view=ai-workbench' }
]

// 本地 file:// 打开单文件构建时，内部路由(/jg、/jcxxcx)需转为 hash 定位
export function resolveRoute(url) {
  if (!url || /^https?:/.test(url)) return url
  if (location.protocol === 'file:') {
    return location.href.split('#')[0] + '#' + url
  }
  return url
}

export function getWorkbenchUserInfo() {
  return Promise.resolve({
    code: 200,
    data: {
      name: '张三',
      org_list: [
        { org_code: 'ORG001', org_name: '市医疗保障局' },
        { org_code: 'ORG002', org_name: '市卫生健康委员会' }
      ],
      permissions_list: permissionsList
    }
  })
}

export function getWorkbenchStatistics() {
  const hospitals = [
    '市中心人民医院', '市第一人民医院', '市中医院', '市第二人民医院', '市妇幼保健院',
    '市第三人民医院', '区中心医院', '市肿瘤医院', '市骨科医院', '县人民医院'
  ]
  const days = Array.from({ length: 10 }, (_, i) => {
    const d = new Date(2026, 8, 7)
    d.setDate(d.getDate() - (9 - i))
    return `${d.getMonth() + 1}/${d.getDate()}`
  })

  return Promise.resolve({
    code: 200,
    data: {
      summaryMetrics: {
        todayIndexReportCnt: 128630,
        last30DaysAvgIndexReportCnt: 112450,
        totalReportCnt: 3658.2,
        totalImageSize: 482.6
      },
      top10IndexReport: hospitals.map((hospitalName, i) => ({
        hospitalName,
        indexReportCnt: 9800 - i * 620
      })),
      recent10DaysIndex: {
        date: days,
        data: [98600, 102300, 87400, 110500, 123800, 96700, 108900, 115200, 99800, 128630]
      },
      halfYearStorage: {
        date: ['4月', '5月', '6月', '7月', '8月', '9月'],
        data: [42.5, 55.8, 61.2, 70.4, 78.9, 86.3]
      }
    }
  })
}
