// This is a placeholder for a real database connection
// In a real app, you would use Prisma or another ORM
export const db = {
  user: {
    findUnique: async ({ where }: { where: { email: string } }) => {
      // Mock implementation
      const users = [
        {
          id: "1",
          name: "Alex Johnson",
          email: "alex@example.com",
          password: "password123", // In a real app, this would be hashed
          image: "/diverse-avatars.png",
          role: "user",
        },
        {
          id: "2",
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123", // In a real app, this would be hashed
          image: "/diverse-avatars.png",
          role: "admin",
        },
      ]

      return users.find((user) => user.email === where.email) || null
    },
  },
}
