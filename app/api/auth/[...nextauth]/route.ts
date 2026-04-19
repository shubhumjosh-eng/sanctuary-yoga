import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const users = [
  { id: "1", name: "Demo User", email: "demo@sanctuary-yoga.com", password: "demo123" },
];

const handler = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        const user = users.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );
        return user || null;
      },
    }),
  ],
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };