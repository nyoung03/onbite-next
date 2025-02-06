This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Page Router의 장점

1. 파일 시스템 기반의 간편한 페이지 라우팅 제공

- 파일 안의 index.tsx 파일로 페이지 라우팅 처리
- 동적 경로 (Dynamic Routes)
  - [id].tsx
  - [...id].tsx => catch all segment
  - [[...id]].tsx => optional catch all segment

2. 다양한 방식의 사전 렌더링 제공

- 유저가 서버에 접속을 요청하면 서버가 js를 실행하고 렌더링 된 html을 브라우저에 전달하여 화면에 렌더링

1. 서버사이드 렌더링 (SSR)

   - 요청이 들어올 때 마다 사전 렌더링을 진행 함
   - 최신 데이터 보장, 서버-백엔드 서버의 딜레이가 있을 시 문제 발생

2. 정적 사이트 생성 (SSG)

   - 빌드 타임에 미리 페이지 정적으로 사전 렌더링 해 둠
   - 서버-백엔드 서버의 딜레이가 있어도 빌드 타임에 일어나는 일이기 때문에 사용자의 요청에는 완성된 페이지 제공
   - 빌드 타임 이후에는 페이지 재생성하지 않음, 최신 데이터 방영 X

3. 증분 정적 재생성 (ISR)

   - SSG 페이지 일정 시간마다 재생성
   - Revalidate 요청으로 즉각적 생성도 가능

## Page Router의 단점

1. 페이지병 레이아웃 설정이 번거롭다.
2. 데이터 패칭이 페이지 컴포넌트에 집중된다.
3. 불 필요한 컴포넌트들도 JS Bundle에 포함된다.
