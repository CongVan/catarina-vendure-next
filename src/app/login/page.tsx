import React from "react";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  async function login(data: FormData) {
    "use server";

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="h1 font-extrabold">Đăng nhập</h1>
            <form className="space-y-4 md:space-y-6" action={login}>
              <div className="form-control w-full">
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="input input-bordered input-primary w-full "
                />
              </div>
              <div className="form-control w-full">
                <label className=" label">Password</label>

                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="input input-bordered input-primary w-full "
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox" />
                    <span className="label-text ml-1">Remember me</span>
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Đăng nhập
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
