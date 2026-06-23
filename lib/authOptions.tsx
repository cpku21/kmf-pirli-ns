import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db/mongoose.tsx';
// We'll declare model imports carefully
import mongoose from 'mongoose';

// Define mini standing model checker or look up inside credentials provider
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Molimo unesite korisničko ime i lozinku');
        }

        // 1. Check env credentials fallback first (convenient for instant testing)
        const envAdminUser = process.env.ADMIN_USERNAME || 'admin';
        const envAdminPass = process.env.ADMIN_PASSWORD || 'secure_pirli_admin_2026';

        if (credentials.username === envAdminUser && credentials.password === envAdminPass) {
          return {
            id: 'admin-env-id',
            name: 'KMF Pirli Admin',
            email: 'admin@kmfpirli.rs',
            role: 'admin',
          };
        }

        // 2. Query DB
        try {
          await connectToDatabase();
          
          // Access model dynamically to avoid early registration issues
          const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
            username: { type: String, required: true, unique: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            role: { type: String, default: 'admin' }
          }));

          const user = await (User as any).findOne({ username: credentials.username });
          if (!user) {
            throw new Error('Netačni kredencijali');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Netačni kredencijali');
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            role: user.role || 'admin',
          };
        } catch (error: any) {
          console.error('Auth error falling back is active:', error);
          throw new Error(error.message || 'Greška prilikom prijave');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key-kmf-pirli-2026-dynamic-token',
};
