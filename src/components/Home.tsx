import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import landing from '../assets/landing.png';
import { FaChevronDown } from 'react-icons/fa';
import box from '../assets/box.jpg';

export default function LandingPage() {
  const landingRef = useRef(null);
  const navigate = useNavigate();

  const scrollToContent = () => {
    const contentSection = document.getElementById('main-content');
    if (contentSection) {
      const top = contentSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Landing Section */}
      <section
        ref={landingRef}
        className="h-screen bg-cover bg-center text-black relative transition-all duration-1000 ease-in-out opacity-100 translate-y-0"
        style={{
          backgroundImage: `url(${landing})`,
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        <div className="flex flex-col justify-center h-[80%] px-10 pt-20 sm:px-20 text-left">
          <h1 className="text-[10rem] sm:text-[12rem] font-bold text-white leading-none">SIRN</h1>
          <p className="mt-4 text-2xl sm:text-4xl max-w-2xl drop-shadow text-white">
            Smart Inventory Redistribution Network
          </p>
        </div>

        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-smooth-bounce text-white"
          onClick={scrollToContent}
        >
          <FaChevronDown size={28} />
        </div>
      </section>

      {/* Main Content Section */}
      <section id="main-content" style={{ fontFamily: "sans-serif" }}>
        <div className="bg-[#140c57] h-[28rem] w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between p-10 sm:pl-20 h-full">
            <div className="sm:w-1/2 w-full text-center sm:text-left">
              <h1 className="text-4xl sm:text-7xl font-bold text-[#dae1de] leading-tight">
                Powering Precision in Inventory Movement
              </h1>
              <p className="mt-4 text-lg sm:text-2xl text-[#dae1de] max-w-xl">
                Smarter stock decisions, seamless redistribution — all backed by real-time AI insights.
              </p>
            </div>

            <div className="sm:w-1/2 w-full mt-8 sm:mt-0 flex justify-center relative">
              <img src={box} alt="Inventory Box" className="w-2/3 sm:w-3/4" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-100 bg-opacity-90 text-[#15342d] px-4 py-2 text-center text-sm sm:text-base">
                Smarter Inventory. Smarter Retail.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 py-12 px-6 sm:px-20">
          <div className="max-w-7xl mx-auto text-center text-[#15342d] text-xl sm:text-2xl space-y-6">
            <p>
              SIRN gives you complete control over your store's inventory with AI-powered insights and intelligent stock redistribution suggestions.
              Say goodbye to stockouts and overstock — ensure every product reaches the right shelf, at the right time.
            </p>

            <p className="font-semibold">
              Login now to access your personalized dashboard and experience smarter inventory management.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="mt-4 bg-[#140c57] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#1f1691] transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
