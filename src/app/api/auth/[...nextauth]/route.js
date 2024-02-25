import NextAuth from "next-auth";
import CrediantialsProvider from "next-auth/providers/credentials";
import connectSql, { connection } from "@/app/api/connectDb/route";
const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CrediantialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        connectSql();
        const rows = await connection
          .promise()
          .query(`SELECT * FROM users WHERE emailId='${credentials.email}'`)
          .then(([data, fields]) => {
            if(data.length === 0) return null;
            return data;
          })
          .catch((err) => {
            return null;
          });

        const user = rows[0];

        if (user && user.pwd === credentials.password) {
          if(user.status === "inactive") return null;
          return {
            fname: user.fName,
            lname: user.lName,
            email: user.emailId,
            role: user.role,
            status: user.status,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          user: user,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: token.user,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
