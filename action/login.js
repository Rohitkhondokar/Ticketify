"use server";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/route";
import { AuthError } from "next-auth";

import { LoginSchema, RegisterSchema } from "../schema";
import { db } from "@/db/prisma";

export const login = async (values, callback) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid login credentials" };
  }
  const { email, password } = validateFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: callback || "/",
    });
    return { success: "Login successful", result };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went error" };
      }
    }
    throw error;
  }
};

export const registar = async (values) => {
  console.log(values);

  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid registar credentials" };
  }

  try {
    const { name, email, password } = validateFields.data;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists" };
    }
    // Insert the user into the database
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { success: "Registar successful" };
  } catch (error) {
    return { error: error.message };
  }
};

// export const getUserById = async (id) => {
//   try {
//     const user = await db.user.findUnique({ where: { id } });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     return user;
//   } catch (error) {
//     return null;
//   }
// };
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
