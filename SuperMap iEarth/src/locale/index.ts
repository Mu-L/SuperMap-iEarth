//语言
import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import { getLang } from '@/utils'
import { LangEnum } from '@/enums/styleEnum'
import zh from './zh/index'
import en from './en/index'

// 获取当前浏览器语言环境
var currentLanguage;
var cookieLanguage = getLang();
if (cookieLanguage !== undefined) currentLanguage = cookieLanguage;


// 语言数组
export const langList = [
  {
    label: '中文',
    key: LangEnum.ZH
  },
  {
    label: 'English',
    key: LangEnum.EN
  }
]

// 全局语言对象
export const langGlobal = {
  "zh":zh,
  "en":en
}

const i18n = createI18n({
  locale: currentLanguage,
  messages: {
    [LangEnum.ZH]: zh,
    [LangEnum.EN]: en
  }
})

export default i18n