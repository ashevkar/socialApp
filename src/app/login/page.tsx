"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);

      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className=" min-h-screen h-full flex flex-col md:flex-row  bg-gray-50">
      {/* Left Side - Centered Image */}
      <div className="hidden md:flex md:w-1/2 h-screen sticky  bg-gradient-to-t to-blue-300 from-pink-300 pr-5">
  <div className="flex flex-col md:mx-auto w-full text-right items-center">
    <Image
      src="/login2.png"
      alt="loginPage"
      width={450}
      height={100}
      className=""
    />
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-black italic text-gray-900">
        &quot;Reconnect with Friends Like Never Before&quot;
      </h2>
      <p className="text-gray-600 text-sm">
        The most beloved social network is making a comeback! Share testimonials, send messages, and relive the joy of genuine connections—all in one place.
      </p>
    </div>
  </div>
</div>


      {/* Right Side - Sign In */}
      <div className=" flex justify-center md:w-1/2 m-5 md:m-4 bg-gray-50 items-center">
      <div className="custom-outline md:w-2/3 p-5">
        <h1 className="text-4xl font-black text-pink-600">Orkut</h1>
        <div className="">
          <h2 className="mt-2  text-xl font-black italic text-gray-900">
            Sign in to your account
          </h2>
          {/* <p className="text-gray-500">Enter your details below to continue.</p> */}
        </div>

        <div className="mt-2  rounded-xl ">
          <div className="bg-white py-3  shadow sm:rounded-lg sm:px-5">
            <form className="space-y-6 text-gray-700" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="custom-border w-full flex justify-center py-2 px-4 5 rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Dont have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/signup"
                  className="custom-border w-full flex justify-center py-2 px-4  shadow-sm text-sm font-medium text-blue-600 bg-white "
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
