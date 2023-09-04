import React from "react";

export default function RegisterPage() {
  async function register(data: FormData) {
    "use server";

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="h1 font-extrabold">Đăng ký</h1>
            <form className="space-y-4 md:space-y-6" action={register}>
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
                <label className=" label">Mật khẩu</label>

                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="input input-bordered input-primary w-full "
                />
              </div>
              <div className="form-control w-full">
                <label className=" label">Xác nhận mật khẩu</label>

                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="input input-bordered input-primary w-full "
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
