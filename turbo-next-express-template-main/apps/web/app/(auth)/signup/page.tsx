"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(6, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  role: z.enum(["user", "organizer", "admin"]),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await axios.post("http://localhost:3100/api/v1/auth/register", data); 
      alert("Registration successful");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input {...register("name")} placeholder="Name" className="p-2 border rounded mb-2" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input {...register("email")} placeholder="Email" className="p-2 border rounded mb-2" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input {...register("password")} type="password" placeholder="Password" className="p-2 border rounded mb-2" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <select {...register("role")} className="p-2 border rounded mb-2">
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
