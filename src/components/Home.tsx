import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import this
import { ArrowUpRight } from 'lucide-react';
import retailLeft from '../assets/retail-left.jpg';
import warehouseRight from '../assets/warehouse-right.jpg';
import logo from '../assets/logo.jpg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate(); // <-- initialize navigate

  const handleLogin = () => {
    navigate('/login'); // <-- your login route
  };

  return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-[1.2fr_1.0fr] font-inter bg-white">
      
      {/* Top-left logo + SIRN */}
      <div className="absolute top-[60px] left-20 flex items-center">
        <img src={logo} alt="Logo" className="w-6 h-6 object-cover" />
        <h1 className="border-2 border-white px-2 py-1 text-lg rounded-full font-bold bg-white text-black">
          SIRN
        </h1>
      </div>

      {/* Left Side - Images and Tagline */}
      <div className="flex flex-col items-center justify-center px-6 py-12 space-y-6">
        <div className="flex space-x-4">
          <img
            src={retailLeft}
            alt="Retail Display"
            className="rounded-xl w-80 h-70 object-cover mt-40"
          />
          <div className="flex flex-col items-center">
            <img
              src={warehouseRight}
              alt="Warehouse"
              className="rounded-xl w-80 h-70 object-cover mb-2"
            />
            <div className="text-left bg-gray-100 text-gray-700 rounded-lg px-2 py-2 text-sm shadow-sm mr-[130px] mt-4">
              Balancing Inventory. <br /> Powering Performance.
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Title + CTA */}
      <div className="flex flex-col items-start justify-center px-10 py-12 bg-[#043980] text-white space-y-24">
        <button
          onClick={handleLogin}
          className="ml-auto mb-4 border-2 border-white px-10 py-2 text-sm rounded-full hover:bg-white hover:text-[#043980] transition ease-in-out duration-300"
        >
          LOGIN
        </button>

        <div className="pl-4">
          <h1 className="text-[120px] font-medium leading-[0.9]">
            <span className="block">Retail</span>
            <span className="block">Intelligence</span>
          </h1>

          <p className="text-3xl mt-4 text-[#d0c8c8] pt-4">
            <i>Smart Inventory Redistribution Network</i>
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="flex items-center space-x-2 border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#043980] transition text-white ease-in-out duration-300"
        >
          <span>Get Started</span>
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
