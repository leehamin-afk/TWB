# TWB

Towel 브랜드 사이트 (Next.js + Sanity + Vercel)

## 로컬 실행

```bash
npm install
npm run dev
```

- 사이트: http://localhost:3000
- Studio: http://localhost:3000/studio

`.env.local` 예시:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=b716dh44
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

## Vercel 배포 시 환경변수

아래 3개를 **Production**에 넣고 Redeploy 해야 Sanity 상품이 보입니다.

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
