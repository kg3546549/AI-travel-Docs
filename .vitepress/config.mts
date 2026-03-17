import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 여행 플래너',
  description: '조건 몇 가지만 입력하면, AI가 완성된 여행 일정을 만들어준다',
  base: '/AI-travel-Docs/',
  lang: 'ko-KR',
  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: '서비스 개요', link: '/01-overview' },
    ],
    sidebar: [
      { text: '서비스 개요', link: '/01-overview' },
      { text: '프로덕트 & UX', link: '/02-product' },
      { text: '디자인 시스템', link: '/03-design' },
      { text: 'AI 설계', link: '/04-ai' },
      { text: '데이터베이스', link: '/05-database' },
      { text: '웹 프론트엔드', link: '/06-web' },
      { text: 'Flutter 앱', link: '/07-app' },
      { text: '인프라 & 배포', link: '/08-infra' },
    ],
    socialLinks: [],
    search: { provider: 'local' },
  },
})
