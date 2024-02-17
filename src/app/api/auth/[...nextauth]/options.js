import { auth, collectionAdmin } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { user } = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );

        if (user) {
          let filterUser;
          try {
            const queryUser = query(
              collectionAdmin,
              where("email", "==", credentials.email)
            );
            const getUser = await getDocs(queryUser);

            filterUser = getUser.docs.map((item) => ({ ...item.data() }));
          } catch (error) {
            console.log("error di authorize");
          }

          // Any object returned will be saved in `user` property of the JWT
          return filterUser[0];
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const now = new Date().getTime() / 1000;

      if (trigger === "update") {
        token.user.photoURL = session;
      }

      if (token)
        return {
          ...token,
          ...user,
        };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
