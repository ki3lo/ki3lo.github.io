// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "K's Secure Note";
export const SITE_DESCRIPTION = '웹·앱 취약점 분석, 소스코드 진단(SAST), DevSecOps를 방어자 관점에서 기록하는 보안 기술 블로그';
export const GITHUB_URL = 'https://github.com/ki3lo';

// Every post belongs to exactly one category. The key is used in URLs and frontmatter.
export const CATEGORIES = {
	web: { label: '웹 취약점 진단', description: '스캐너가 못 찾는 취약점을 찾고, 개발자가 바로 적용할 수 있는 조치까지' },
	mobile: { label: '모바일 앱 분석', description: 'Frida와 동적 분석으로 들여다보는 Android·iOS 앱 보안' },
	code: { label: '소스코드 보안', description: 'SAST 운영, 시큐어 코딩, 보안성 검토 프로세스' },
	redteam: { label: '침투 훈련', description: '사이버 킬체인 기반 훈련 시나리오와 실습 인프라' },
	cloud: { label: '클라우드·컴플라이언스', description: '클라우드 네이티브 환경의 보안 통제와 CSAP' },
	career: { label: '커리어·학습', description: '자격증, 교육, 공모전, 보안 커리어 이야기' },
} as const;

export type Category = keyof typeof CATEGORIES;

// Prefix an absolute path with the configured `base` (empty when served from the domain root).
export const withBase = (path: string) =>
	`${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

// URL-safe slug for tags and series names (keeps Korean characters).
export const slugify = (value: string) =>
	value.trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '');
