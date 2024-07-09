import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: ISession }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: IUser }) {
      try {
        const existingGuest = await getGuest(user.email!);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: ISession }) {
      const guest = await getGuest(session.user.email!);
      session.user.guestId = guest!.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig as any);
// REVIEW: this freaking type
