import React from 'react';
import { RarityColors } from './type';

interface CaseAnimationProps {
  // @ts-ignore
  spinnerRef: any;
    // @ts-ignore
  items: any[];
  rarityColors: RarityColors;
  isSpinning: boolean;
}
//@ts-nocheck
export const CaseAnimation: React.FC<CaseAnimationProps> = ({
  spinnerRef, 
  items, 
  // isSpinning
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 rounded-lg">
      {/* Контейнер для прокрутки с центральным индикатором */}
      <div className="relative w-full mb-6">
        <div className="relative w-full overflow-hidden h-24 bg-gray-800 rounded-lg">
          {/* Центральный индикатор */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-red-600 z-20"/>
          
          {/* Контейнер со всеми предметами */}
          <div 
            ref={spinnerRef} 
            className="absolute top-0 flex"
            style={{ 
              left: '50%',
              willChange: 'transform'
            }}
          >
            {/* Дублируем предметы для создания иллюзии бесконечной прокрутки */}
            {Array(5).fill(null).map((_, outerIndex) => (
              <React.Fragment key={`itemgroup-${outerIndex}`}>
                {items.map((item, index) => (
                  <div 
                    key={`${item.productID}-${outerIndex}-${index}`}
                    className="flex flex-col items-center justify-center p-2 w-24 h-24 border border-gray-700"
                    data-item-id={item.id}
                  >
                    <div className={`w-16 h-16 rounded-md flex items-center justify-center`}>
                      <img src={item.Image} alt={item.Name} className="w-14 h-14 object-contain" />
                    </div>
                    <p className="text-xs text-white truncate mt-1">{item.Name}</p>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      {/* @ts-ignore */}
      <style jsx>{`
        @keyframes bounce-small {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-small {
          animation: bounce-small 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default CaseAnimation;