## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## backend
I chose to have one app using next js to serve the front end and back end.
Back end API is available is proxyed through `/api/proxy` (app/api/proxy/route.ts)
this is done by checking a list of approved routes (static and api) then returning the fetch response.
I am using next js fetch caching to cache the response for 300 seconds or 5 min.

I attempted to use type code generation of route data but it did not work out, so I decided to use zod to validate the response data.

## front end 
I am using next 16 dynamic rendering to ensure the data is always up to date.



