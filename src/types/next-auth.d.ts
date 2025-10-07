import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: string
      stripeCustomerId?: string
      subscriptionStatus?: string
    }
  }

  interface User {
    id: string
    email: string
    role: string
    stripeCustomerId?: string
    subscriptionStatus?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    stripeCustomerId?: string
    subscriptionStatus?: string
  }
}
