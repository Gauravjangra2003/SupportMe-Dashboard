"use client"

import { useEffect, useState } from "react"

/** True after client mount — avoids hydration mismatch for browser-only state. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer until after hydration so server/client markup stay in sync.
    queueMicrotask(() => setMounted(true))
  }, [])

  return mounted
}
