import React, { useState } from 'react';
import CaseAnimation from './Case';

interface BronzeChestProps {
  onOpen?: () => void;
}

const OpenCase: React.FC<BronzeChestProps> = ({ onOpen = () => {} }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      onOpen();
      // Reset animation state after animation duration
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#191b1f] p-6">
      <div className="flex flex-col items-center gap-2 mt-6">
        <h1 className="text-3xl font-medium text-white">Бронзовый сундук</h1>
        <p className="text-base text-[#757575]">Нажмите на сундук, чтобы открыть</p>
      </div>
      
      <div className="flex justify-center mt-16">
        <button 
          onClick={handleClick}
          className={`w-[170px] h-[200px] transition-transform duration-300 cursor-pointer
            ${isAnimating ? 'animate-bounce' : 'hover:scale-105'}`}
        >
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7_Hicjn7nbGWzhL/frame-20.png"
            alt="Bronze Chest"
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {isAnimating ? <CaseAnimation /> : <></>}
    </div>
  );
};

export default OpenCase;

