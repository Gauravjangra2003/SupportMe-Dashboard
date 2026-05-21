export type User = {
  firstName: string
  lastName: string
  email: string
  jobTitle: string
}

const USERS_KEY = "supportme-users"
export const CURRENT_USER_KEY = "supportme-current-user"
export const USER_SESSION_EVENT = "supportme-user-change"

function notifyUserSessionChange() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(USER_SESSION_EVENT))
}

let cachedUser: User | null = null
let cachedRaw: string | null | undefined

export function invalidateUserCache() {
  cachedRaw = undefined
}

function readCachedCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY)
    if (raw === cachedRaw) {
      return cachedUser
    }

    cachedRaw = raw
    if (!raw) {
      cachedUser = null
      return null
    }

    cachedUser = JSON.parse(raw) as User
    return cachedUser
  } catch {
    cachedUser = null
    cachedRaw = null
    return null
  }
}

function writeCachedCurrentUser(user: User | null) {
  cachedUser = user
  cachedRaw = user ? JSON.stringify(user) : null
}

function capitalize(word: string) {
  if (!word) return ""
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function nameFromEmail(email: string): Pick<User, "firstName" | "lastName"> {
  const local = email.split("@")[0] ?? ""
  const parts = local.split(/[._-]/).filter(Boolean)

  if (parts.length >= 2) {
    return {
      firstName: capitalize(parts[0]),
      lastName: capitalize(parts[parts.length - 1]),
    }
  }

  return { firstName: capitalize(local), lastName: "" }
}

export function getInitials(user: Pick<User, "firstName" | "lastName">) {
  const first = user.firstName.trim()[0] ?? ""
  const last = user.lastName.trim()[0] ?? ""
  return `${first}${last}`.toUpperCase() || "?"
}

export function getFullName(user: Pick<User, "firstName" | "lastName">) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ")
}

function readUsers(): User[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as User[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUserByEmail(email: string): User | null {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
}

export function saveUser(user: User) {
  const users = readUsers()
  const index = users.findIndex(
    (u) => u.email.toLowerCase() === user.email.toLowerCase()
  )

  if (index >= 0) {
    users[index] = user
  } else {
    users.push(user)
  }

  writeUsers(users)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  writeCachedCurrentUser(user)
  notifyUserSessionChange()
}

export function getCurrentUser(): User | null {
  return readCachedCurrentUser()
}

export function clearCurrentUser() {
  if (typeof window === "undefined") return
  localStorage.removeItem(CURRENT_USER_KEY)
  writeCachedCurrentUser(null)
  notifyUserSessionChange()
}

export function loginWithEmail(email: string): User {
  const existing = findUserByEmail(email)
  if (existing) {
    saveUser(existing)
    return existing
  }

  const { firstName, lastName } = nameFromEmail(email)
  const user: User = {
    firstName,
    lastName,
    email,
    jobTitle: "Operations Manager",
  }

  saveUser(user)
  return user
}

export function registerUser(
  data: Pick<User, "firstName" | "lastName" | "email"> & { jobTitle?: string }
): User {
  const user: User = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    jobTitle: data.jobTitle ?? "Operations Manager",
  }

  saveUser(user)
  return user
}
