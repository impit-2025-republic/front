import React from 'react';

interface WalletCardProps {
  balance: number;
  walletName?: string;
  onRefresh?: () => void;
  onWalletSelect?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance = 52,
}) => {
  return (
    <div className="bg-[#26282c] rounded-[32px] p-4 w-[326px]">
      {/* <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onRefresh}
          className="w-9 h-9 bg-[#3f3f46] rounded-full flex items-center justify-center hover:bg-[#4b4b52] transition-colors"
        >
          <img src="https://dashboard.codeparrot.ai/api/image/Z7-73THFtJnMrSZb/heroicon.png" alt="refresh" className="w-5 h-5" />
        </button>

        <button 
          onClick={onWalletSelect}
          className="flex items-center px-4 py-2 bg-[#3f3f46] rounded-3xl hover:bg-[#4b4b52] transition-colors"
        >
          <span className="text-white font-medium text-base mr-2">{walletName}</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7-73THFtJnMrSZb/heroicon-2.png" alt="dropdown" className="w-5 h-5" />
        </button>

        <button 
          onClick={onRefresh}
          className="w-9 h-9 bg-[#3f3f46] rounded-full flex items-center justify-center hover:bg-[#4b4b52] transition-colors"
        >
          <img src="https://dashboard.codeparrot.ai/api/image/Z7-73THFtJnMrSZb/heroicon-3.png" alt="refresh" className="w-5 h-5" />
        </button>
      </div> */}

      <div className="flex items-center justify-center gap-3">
        <div className="w-8 h-8 bg-[#f59e0b] rounded-full flex items-center justify-center">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7-73THFtJnMrSZb/elements.png" alt="star" className="w-[30px] h-9" />
        </div>
        <span className="text-white text-5xl font-medium">{balance}</span>
      </div>
    </div>
  );
}
