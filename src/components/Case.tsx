import React from 'react';

// Типы для предметов


// Цвета для разных редкостей предметов


// Создаем некоторые тестовые предметы


// @ts-ignore
export const CaseAnimation = ({spinnerRef, items, rarityColors, isSpinning} : any) => {

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4rounded-lg">
      {/* <h1 className="text-2xl font-bold mb-4 text-white">Открытие кейса</h1> */}
      
      {/* Контейнер для прокрутки с центральным индикатором */}
      <div className="relative w-full mb-6">
        <div className="relative w-full overflow-hidden h-24 bg-gray-800 rounded-lg">
          {/* Центральный индикатор */}
          {isSpinning ||   <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-red-600 z-20"/>}
        
          
          {/* Подсветка выбора */}
          {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 border-2 border-yellow-400 border-opacity-70 z-10"></div>
           */}
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
            {isSpinning || Array(5).fill(null).map((_, outerIndex) => (
              // Используем React.Fragment и key для правильного рендеринга массива
              <React.Fragment key={`itemgroup-${outerIndex}`}>
                {/*@ts-ignore*/}
                {items.map((item, index) => (
                  <div 
                    key={`${item.id}-${outerIndex}-${index}`}
                    className="flex flex-col items-center justify-center p-2 w-24 h-24 border border-gray-700"
                    data-item-id={item.id}
                  >
                    <div className={`w-16 h-16 ${rarityColors[item.rarity]} rounded-md flex items-center justify-center`}>
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
                    </div>
                    <p className="text-xs text-white truncate mt-1">{item.name}</p>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      {/* Выигранный предмет */}
      {/* {selectedItemId && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg flex flex-col items-center animate-bounce-small">
          <h2 className="text-lg font-bold text-white mb-2">Ваш выигрыш:</h2>
          {(() => {
            const winItem = items.find(item => item.id === selectedItemId);
            if (winItem) {
              return (
                <div className="flex flex-col items-center">
                  <div className={`w-24 h-24 ${rarityColors[winItem.rarity]} rounded-md flex items-center justify-center mb-2`}>
                    <img src={winItem.image} alt={winItem.name} className="w-20 h-20 object-contain" />
                  </div>
                  <p className="text-lg font-bold text-white">{winItem.name}</p>
                  <p className={`text-sm ${
                    winItem.rarity === 'legendary' ? 'text-yellow-400' :
                    winItem.rarity === 'epic' ? 'text-pink-400' :
                    winItem.rarity === 'rare' ? 'text-purple-400' :
                    winItem.rarity === 'uncommon' ? 'text-blue-400' :
                    'text-gray-400'
                  }`}>
                    {winItem.rarity.charAt(0).toUpperCase() + winItem.rarity.slice(1)}
                  </p>
                </div>
              );
            }
            return null;
          })()}
        </div>
      )} */}
      
      {/* Кнопка для запуска */}
      {/* <button
        onClick={startSpin}
        disabled={!canSpin}
        className={`px-6 py-3 rounded-full font-bold text-white ${
          canSpin
            ? 'bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 cursor-pointer transform transition hover:scale-105'
            : 'bg-gray-700 cursor-not-allowed'
        }`}
      >
        {isSpinning ? 'Открывается...' : canSpin ? 'Открыть кейс' : 'Пожалуйста, подождите'}
      </button> */}
      
      {/* Стили для легкой анимации подпрыгивания выигрыша */}
      {/*@ts-ignore*/}
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