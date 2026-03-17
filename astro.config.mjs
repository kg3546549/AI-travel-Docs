import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  // GitHub Pages 배포 시 레포 이름으로 변경 (예: base: '/travel')
  base: '/AI-travel-Docs',
  integrations: [
    starlight({
      title: 'AI 여행 플래너',
      description: '조건 몇 가지만 입력하면, AI가 완성된 여행 일정을 만들어준다',
      defaultLocale: 'root',
      locales: {
        root: { label: '한국어', lang: 'ko' },
      },
      sidebar: [
        { label: '서비스 개요', link: '/01-overview' },
        { label: '프로덕트 & UX', link: '/02-product' },
        { label: '디자인 시스템', link: '/03-design' },
        { label: 'AI 설계', link: '/04-ai' },
        { label: '데이터베이스', link: '/05-database' },
        { label: '웹 프론트엔드', link: '/06-web' },
        { label: 'Flutter 앱', link: '/07-app' },
        { label: '인프라 & 배포', link: '/08-infra' },
      ],
      social: [],
    }),
  ],
})
