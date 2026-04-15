import { createAuthClient } from '@neondatabase/neon-js'

const auth = createAuthClient({
  authUrl: import.meta.env.VITE_NEON_AUTH_URL,
})

export default auth
