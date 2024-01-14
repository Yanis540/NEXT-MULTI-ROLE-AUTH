npx shadcn-ui@latest init
npm install next-auth
npm install prisma --save-dev
npm install @prisma/client @next-auth/prisma-adapter@canary
npx prisma generate

npx prisma migrate dev

