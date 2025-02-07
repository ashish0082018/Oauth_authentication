"use client";

import { signup } from "@/app/actions/signup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";

function SignupPage() {
  const [formState, action] = useActionState(signup, { error: {} });

  // Full-screen loading state
  const [loading, setLoading] = useState(false);

  if (formState.error.success) {
    redirect("/verifyotp");
  }

  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    await action(formData);
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true); // Start loading
    await signIn("google", { callbackUrl: "/" });
    setLoading(false); // Stop loading
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col gap-8 px-4 sm:px-6 lg:px-8">
      {/* Fullscreen Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-xl">Registering...</div>
        </div>
      )}

      <div className="w-full sm:w-2/3 md:w-1/2 text-center">
        <span className="text-3xl font-semibold tracking-tighter">Sign up 🤗</span>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/3 min-h-1/2 bg-zinc-800 shadow-2xl flex flex-col px-6 py-5 rounded-lg">
        {/* Google Sign-Up Button with Loading State */}
        <button
          onClick={handleGoogleSignUp}
          className="bg-zinc-100 text-zinc-800 hover:bg-zinc-100 px-3 py-2 text-lg w-full flex items-center justify-center gap-3 sm:gap-8"
          disabled={loading}
        >
          <div>
            {/* Google Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </div>
          <span>{loading ? "Signing up..." : "Sign up with Google"}</span>
        </button>

        <div className="flex items-center my-4">
          <div className="border-t border-2 border-gray-400 flex-grow"></div>
          <div className="px-3 text-md">Or, register with your email</div>
          <div className="border-t border-2 border-gray-400 flex-grow"></div>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="tracking-tighter flex flex-col gap-3">
            <label className="flex">Name</label>
            <input
              value={formdata.name}
              onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
              name="name"
              className="px-2 py-1 outline-none text-black rounded-md"
              placeholder="Your name"
              required
            />
            {formState.error.name && (
              <span className="text-red-500">
                {formState.error.name.map((elem, key) => (
                  <li key={key}>{elem}</li>
                ))}
              </span>
            )}

            <label className="flex">Email</label>
            <input
              value={formdata.email}
              onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
              name="email"
              className="px-2 py-1 outline-none text-black rounded-md"
              placeholder="you@example.com"
              required
            />
            {formState.error.email && (
              <span className="text-red-500">
                {formState.error.email.map((elem, key) => (
                  <li key={key}>{elem}</li>
                ))}
              </span>
            )}

            <label className="flex">Password</label>
            <div className="relative w-full">
              <input
                value={formdata.password}
                onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                name="password"
                className="px-2 py-1 outline-none text-black w-full border rounded-md pr-10"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formState.error.password && (
              <span className="text-red-500">
                {formState.error.password.map((elem, key) => (
                  <li key={key}>{elem}</li>
                ))}
              </span>
            )}
          </div>

          {formState.error.formError && (
            <div className="text-red-600 mt-4 bg-red-400 border-red-800 border-1 rounded-lg px-2 py-1">
              {formState.error.formError}
            </div>
          )}

          <SignupButton />
        </form>
      </div>

      <div className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/signin">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

// Submit button with loading indicator
const SignupButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-blue-600 hover:bg-blue-700 transition px-3 py-2 text-lg w-full mt-6 ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Signing up..." : "Sign up"}
    </button>
  );
};

export default SignupPage;
