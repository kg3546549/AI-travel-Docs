import{_ as s,o as n,c as t,ag as p}from"./chunks/framework.DSqpaH5Z.js";const u=JSON.parse('{"title":"프로덕트 & UX","description":"여행 기본 조건 정의, UX 플로우 3단계","frontmatter":{"title":"프로덕트 & UX","description":"여행 기본 조건 정의, UX 플로우 3단계"},"headers":[],"relativePath":"02-product.md","filePath":"02-product.md"}'),e={name:"02-product.md"};function l(d,a,i,o,r,c){return n(),t("div",null,[...a[0]||(a[0]=[p(`<h2 id="여행-기본-조건-정의" tabindex="-1">여행 기본 조건 정의 <a class="header-anchor" href="#여행-기본-조건-정의" aria-label="Permalink to &quot;여행 기본 조건 정의&quot;">​</a></h2><p>케이스 분기의 핵심. 각 조건이 &quot;확정/미정&quot;이냐에 따라 AI가 채워야 할 항목이 결정된다.</p><h3 id="필수-조건" tabindex="-1">필수 조건 <a class="header-anchor" href="#필수-조건" aria-label="Permalink to &quot;필수 조건&quot;">​</a></h3><table tabindex="0"><thead><tr><th>#</th><th>조건</th><th>설명</th><th>미정일 때 AI 처리</th></tr></thead><tbody><tr><td>1</td><td><strong>목적지</strong></td><td>국가 / 도시 (복수 가능)</td><td>스타일 기반으로 여행지 추천</td></tr><tr><td>2</td><td><strong>일정</strong></td><td>출발일 + 귀국일 → 박수/일수</td><td>스타일·거리 기반으로 적정 일수 추천</td></tr><tr><td>3</td><td><strong>인원</strong></td><td>몇 명, 관계 (혼자/커플/친구/가족)</td><td>기본값 2인으로 처리</td></tr><tr><td>4</td><td><strong>예산</strong></td><td>총 예산 or 1인 예산 (항공 포함 여부)</td><td>해당 목적지 평균 여행 비용 제시</td></tr><tr><td>5</td><td><strong>여행 스타일</strong></td><td>맛집, 관광지, 액티비티, 쇼핑, 휴양, 문화 (복수 선택)</td><td>일반적인 조합으로 기본 구성</td></tr></tbody></table><h3 id="선택-조건" tabindex="-1">선택 조건 <a class="header-anchor" href="#선택-조건" aria-label="Permalink to &quot;선택 조건&quot;">​</a></h3><table tabindex="0"><thead><tr><th>#</th><th>조건</th><th>없을 때 기본값</th></tr></thead><tbody><tr><td>6</td><td><strong>출발지</strong></td><td>서울(인천)</td></tr><tr><td>7</td><td><strong>이동 수단</strong></td><td>대중교통</td></tr><tr><td>8</td><td><strong>숙소 유형</strong></td><td>중간 가격대 호텔</td></tr><tr><td>9</td><td><strong>일정 강도</strong></td><td>보통</td></tr></tbody></table><h3 id="케이스-분기-로직" tabindex="-1">케이스 분기 로직 <a class="header-anchor" href="#케이스-분기-로직" aria-label="Permalink to &quot;케이스 분기 로직&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>목적지 확정 + 일정 확정  →  AI: 스타일/예산에 맞는 세부 일정만 구성</span></span>
<span class="line"><span>목적지 확정 + 일정 미정  →  AI: 적정 일수 추천 후 일정 구성</span></span>
<span class="line"><span>목적지 미정             →  AI: 스타일/예산 기반으로 목적지부터 추천</span></span></code></pre></div><hr><h2 id="ux-플로우" tabindex="-1">UX 플로우 <a class="header-anchor" href="#ux-플로우" aria-label="Permalink to &quot;UX 플로우&quot;">​</a></h2><h3 id="_1단계-조건-입력-토스-스타일-스텝" tabindex="-1">1단계 - 조건 입력 (토스 스타일 스텝) <a class="header-anchor" href="#_1단계-조건-입력-토스-스타일-스텝" aria-label="Permalink to &quot;1단계 - 조건 입력 (토스 스타일 스텝)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>① 어디로 여행 가세요?</span></span>
<span class="line"><span>   → [미정 - AI 추천] or [국가/도시 검색]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>② 언제 가세요?</span></span>
<span class="line"><span>   → [미정 - AI 추천] or [날짜 선택]  ※ 박수 자동 계산</span></span>
<span class="line"><span></span></span>
<span class="line"><span>③ 몇 명이서 가세요?</span></span>
<span class="line"><span>   → [인원 선택] + [관계: 혼자 / 커플 / 친구 / 가족]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>④ 예산은 어느 정도예요?</span></span>
<span class="line"><span>   → [미정] or [직접 입력] or [이 여행지 평균 비용: OO만원]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑤ 여행 스타일 (복수 선택)</span></span>
<span class="line"><span>   → 맛집 / 관광지 / 액티비티 / 쇼핑 / 휴양 / 문화체험</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑥ (선택) 더 디테일하게 설정할까요?</span></span>
<span class="line"><span>   → 출발지 / 이동수단 / 숙소유형 / 일정강도</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⑦ 추가로 원하는 게 있나요? (자유 입력)</span></span>
<span class="line"><span>   → 예: &quot;해리포터 스튜디오 꼭 가고 싶어요&quot;</span></span></code></pre></div><h3 id="_2단계-계획-선택" tabindex="-1">2단계 - 계획 선택 <a class="header-anchor" href="#_2단계-계획-선택" aria-label="Permalink to &quot;2단계 - 계획 선택&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>AI가 3~4개 요약 후보 생성 (1차 호출)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>키워드 카드 리스트로 표시</span></span>
<span class="line"><span>  [ 🍜 맛집 집중형 | 예상 80만원 ]</span></span>
<span class="line"><span>  [ 🏯 관광지 위주 | 예상 75만원 ]</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>하나 선택 → AI 상세 일정 생성 (2차 호출)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>지도뷰 + 일정 상세 페이지</span></span></code></pre></div><h3 id="_3단계-일정-검토" tabindex="-1">3단계 - 일정 검토 <a class="header-anchor" href="#_3단계-일정-검토" aria-label="Permalink to &quot;3단계 - 일정 검토&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>전체 지도뷰 (모든 포인트 한눈에)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>[다음] 버튼 클릭</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>줌아웃 → 카메라 이동 → 다음 장소 줌인 (애니메이션)</span></span>
<span class="line"><span>하단 카드: 장소명 / 예상 체류 시간 / 메모</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>전체 검토 완료 → 저장 / 공유</span></span></code></pre></div><p>출력 예시:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[도쿄 3박 4일 · 2인 · 예산 80만원 · 맛집+관광지]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1일차  시부야 → 하라주쿠 → 신주쿠</span></span>
<span class="line"><span>2일차  아사쿠사 → 우에노 → 아키하바라</span></span>
<span class="line"><span>3일차  오다이바 → 긴자</span></span>
<span class="line"><span>4일차  공항 이동</span></span>
<span class="line"><span></span></span>
<span class="line"><span>총 예상 비용: 항공 28만 / 숙소 24만 / 식비 18만 / 기타 10만 = 약 80만원</span></span></code></pre></div>`,18)])])}const b=s(e,[["render",l]]);export{u as __pageData,b as default};
