"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react"
import { useRouter } from "next/navigation"
import { useMounted } from "@/hooks/use-mounted"
import {
  clearCurrentUser,
  CURRENT_USER_KEY,
  getCurrentUser,
  getFullName,
  getInitials,
  invalidateUserCache,
  saveUser,
  USER_SESSION_EVENT,
  type User,
} from "@/lib/user-session"

type UserContextValue = {
  user: User | null
  isReady: boolean
  initials: string
  fullName: string
  firstName: string
  setUser: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {}

  const onStorage = (event: StorageEvent) => {
    if (event.key === CURRENT_USER_KEY || event.key === null) {
      invalidateUserCache()
      onStoreChange()
    }
  }

  window.addEventListener(USER_SESSION_EVENT, onStoreChange)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(USER_SESSION_EVENT, onStoreChange)
    window.removeEventListener("storage", onStorage)
  }
}

function getServerUserSnapshot(): User | null {
  return null
}

function getClientUserSnapshot(): User | null {
  return getCurrentUser()
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const mounted = useMounted()
  const user = useSyncExternalStore(
    subscribe,
    getClientUserSnapshot,
    getServerUserSnapshot
  )

  useEffect(() => {
    if (mounted && user === null) {
      router.push("/login")
    }
  }, [mounted, user, router])

  const setUser = useCallback((next: User) => {
    saveUser(next)
  }, [])

  const logout = useCallback(() => {
    clearCurrentUser()
    router.push("/login")
  }, [router])

  const value = useMemo<UserContextValue>(() => {
    const sessionUser = mounted ? user : null
    const firstName = sessionUser?.firstName ?? ""
    return {
      user: sessionUser,
      isReady: mounted,
      initials: sessionUser ? getInitials(sessionUser) : "",
      fullName: sessionUser ? getFullName(sessionUser) : "",
      firstName,
      setUser,
      logout,
    }
  }, [user, mounted, setUser, logout])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
