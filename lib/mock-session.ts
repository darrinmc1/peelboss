import type { Session } from "next-auth"

// Create a mock session for demo purposes
export const mockSession: Session = {
  user: {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    image: "/generic-avatar-icon.png",
    role: "user",
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
}

// Create a mock admin session for demo purposes
export const mockAdminSession: Session = {
  user: {
    id: "2",
    name: "Demo Admin",
    email: "admin@example.com",
    image: "/generic-avatar-icon.png",
    role: "admin",
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
}
