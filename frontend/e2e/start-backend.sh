#!/usr/bin/env bash
# Starts the real backend on a dedicated, freshly seeded SQLite database so that
# end-to-end tests never touch the development data.
set -euo pipefail
cd "$(dirname "$0")/../../backend"
export DATABASE_URL="file:./e2e.sqlite"
export PORT="${E2E_BACKEND_PORT:-8010}"
export NODE_ENV="test"
export JWT_SECRET="${JWT_SECRET:-e2e-secret-not-for-production}"
rm -f prisma/e2e.sqlite prisma/e2e.sqlite-journal
npx prisma migrate deploy > /dev/null
npm run seed > /dev/null
exec npx ts-node src/index.ts
