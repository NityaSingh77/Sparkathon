import { useState } from "react";
import '../styles/login.css';
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-page">
      <div
        className={`
        relative
        w-[850px] max-w-full h-[550px]
        bg-white
        m-5
        rounded-[30px]
        shadow-[0_0_30px_rgba(0,0,0,0.2)]
        overflow-hidden
        font-poppins
        select-none
        font-inter
      `}
    >
      {/* LOGIN FORM */}
      <div
        className={`
          absolute top-0
          h-full
          w-1/2
          bg-white
          p-10
          flex flex-col justify-center items-center
          text-center text-[#333]
          transition-all duration-700 ease-in-out
          ${isLogin
            ? "right-0 opacity-100 z-30 pointer-events-auto"
            : "right-[-50%] opacity-0 z-0 pointer-events-none"}
        `}
      >
        <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-[36px] mb-2">Login</h1>

          <div className="relative my-7">
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full bg-[#eee] rounded-lg py-3 px-5 pr-14 text-[16px] font-medium text-[#333] placeholder:text-[#888] outline-none" />
            <i className="bx bxs-user absolute right-5 top-1/2 -translate-y-1/2 text-[20px]"></i>
          </div>

          <div className="relative my-7">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-[#eee] rounded-lg py-3 px-5 pr-14 text-[16px] font-medium text-[#333] placeholder:text-[#888] outline-none" />
            <i className="bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-[20px]"></i>
          </div>

          <div className="text-left text-[14.5px] mb-6 -mt-4">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#043980] rounded-full shadow-md text-white font-semibold text-[16px] mb-5"
          >
            Login
          </button>

          <p className="mb-4">or login with social platforms</p>

          <div className="flex justify-center space-x-3 text-2xl">
            <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-[#333]">
              <i className="bx bxl-google"></i>
            </a>
            {/* <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-[#333]">
      <i className="bx bxl-github"></i>
    </a>
    <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-[#333]">
      <i className="bx bxl-linkedin"></i>
    </a> */}
          </div>
        </form>
      </div>

      {/* REGISTER FORM */}
      <div
        className={`
          absolute top-0
          h-full
          w-1/2
          bg-white
          p-10
          flex flex-col justify-center items-center
          text-center text-[#333]
          transition-all duration-700 ease-in-out
          ${isLogin
            ? "left-[50%] opacity-0 z-0 pointer-events-none"
            : "left-0 opacity-100 z-30 pointer-events-auto"}
        `}
      >
        <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-[36px] mb-2">Registration</h1>

          <div className="relative my-7">
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full bg-[#eee] rounded-lg py-3 px-5 pr-14 text-[16px] font-medium text-[#333] placeholder:text-[#888] outline-none" />
            <i className="bx bxs-user absolute right-5 top-1/2 -translate-y-1/2 text-[20px]"></i>
          </div>

          <div className="relative my-7">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full bg-[#eee] rounded-lg py-3 px-5 pr-14 text-[16px] font-medium text-[#333] placeholder:text-[#888] outline-none" />
            <i className="bx bxs-envelope absolute right-5 top-1/2 -translate-y-1/2 text-[20px]"></i>
          </div>

          <div className="relative my-7">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-[#eee] rounded-lg py-3 px-5 pr-14 text-[16px] font-medium text-[#333] placeholder:text-[#888] outline-none" />
            <i className="bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-[20px]"></i>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#043980] rounded-full shadow-md text-white font-semibold text-[16px] mb-5"
          >
            Register
          </button>

          <p className="mb-4">or register with social platforms</p>

          <div className="flex justify-center space-x-3 text-2xl">
            <a href="#" className="p-2 border-2 border-gray-300 rounded-lg text-[#333]">
              <i className="bx bxl-google"></i>
            </a>
          </div>
        </form>
      </div>

      {/* TOGGLE BOX */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none">
        {/* Blue curve background */}
        <div
          className={`
            absolute top-0
            transition-all duration-[1800ms] ease-in-out
            w-[300%] h-full
            rounded-[150px]
            bg-[#043980]
            z-10
            pointer-events-none
            ${isLogin ? "left-[-250%]" : "left-[50%]"}
          `}
        ></div>

        {/* Left Toggle Panel */}
        <div
          className={`
            absolute top-0 left-0 w-1/2 h-full
            flex flex-col justify-center items-center
            text-white
            transition-all duration-700 ease-in-out
            z-20
            pointer-events-auto
            ${isLogin
              ? "opacity-100 delay-[1200ms]"
              : "opacity-0 -translate-x-full pointer-events-none delay-300"}
          `}
        >
          <h1 className="text-[36px] font-bold mb-4">Hello, Welcome!</h1>
          <p className="mb-6">Don't have an account?</p>
          <button
            className="w-[160px] h-[46px] border-2 border-white font-semibold rounded-full hover:bg-white hover:text-[#043980] transition ease-in-out duration-300"
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Right Toggle Panel */}
        <div
          className={`
            absolute top-0 right-0 w-1/2 h-full
            flex flex-col justify-center items-center
            text-white
            transition-all duration-700 ease-in-out
            z-20
            pointer-events-auto
            ${isLogin
              ? "opacity-0 translate-x-full pointer-events-none delay-300"
              : "opacity-100 delay-[1200ms]"}
          `}
        >
          <h1 className="text-[36px] font-bold mb-4">Welcome Back!</h1>
          <p className="mb-6">Already have an account?</p>
          <button
            className="w-[160px] h-[46px] border-2 border-white font-semibold rounded-full hover:bg-white hover:text-[#043980] transition ease-in-out duration-300"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
      </div>
      </div>
  );
};

export default AuthForm;
