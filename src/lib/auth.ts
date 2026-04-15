import { createAuthClient } from '@neondatabase/server'

const auth = createAuthClient({
  neonAuthUrl: import.meta.env.VITE_NEON_AUTH_URL,
})

export default auth
