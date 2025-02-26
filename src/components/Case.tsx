import React, { useState, useRef } from 'react';

// Типы для предметов
type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface Item {
  id: number;
  name: string;
  image: string;
  rarity: Rarity;
}

// Цвета для разных редкостей предметов
const rarityColors: Record<Rarity, string> = {
  common: 'bg-gray-400',
  uncommon: 'bg-blue-500',
  rare: 'bg-purple-600',
  epic: 'bg-pink-600',
  legendary: 'bg-yellow-500'
};

// Создаем некоторые тестовые предметы
const generateItems = (): Item[] => {
  const items: Item[] = [];
  const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
  
  for (let i = 1; i <= 30; i++) {
    const rarityIndex = Math.floor(Math.random() * 5);
    items.push({
      id: i,
      name: `Предмет ${i}`,
      image: `/api/placeholder/80/80`, // Используем плейсхолдеры для изображений
      rarity: rarities[rarityIndex]
    });
  }
  
  return items;
};

export const CaseAnimation = () => {
  const [items] = useState<Item[]>(generateItems());
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [canSpin, setCanSpin] = useState<boolean>(true);
  
  const ITEM_WIDTH = 96; // Ширина каждого элемента в пикселях (w-24 = 96px)
  
  // Функция для запуска анимации
  const startSpin = () => {
    if (!canSpin || !spinnerRef.current) return;
    
    setIsSpinning(true);
    setSelectedItemId(null);
    setCanSpin(false);
    
    // Сбрасываем позицию прокрутки
    if (spinnerRef.current) {
      spinnerRef.current.style.transition = 'none';
      spinnerRef.current.style.transform = 'translateX(0)';
      
      // Заставляем браузер применить изменения перед продолжением
      void spinnerRef.current.offsetWidth;
    }
    
    // Начинаем анимацию после короткой задержки
    setTimeout(() => {
      if (!spinnerRef.current) return;
      
      // Множитель, чтобы гарантировать, что мы пройдем несколько полных кругов
      const fullSpinsCount = 3 + Math.floor(Math.random() * 2); // От 3 до 4 полных кругов
      
      // Выбираем произвольный начальный индекс
      const randomStartIndex = Math.floor(Math.random() * items.length);
      
      // Добавляем случайное смещение (-40..+40 пикселей)
      // Это даст эффект случайной остановки вокруг центрального индикатора
      const randomOffset = Math.floor(Math.random() * 81) - 40;
      
      // Вычисляем точное смещение в пикселях
      const scrollDistance = (items.length * ITEM_WIDTH * fullSpinsCount) + 
                            (randomStartIndex * ITEM_WIDTH) + randomOffset;
      
      // Теперь вычисляем, какой предмет окажется под индикатором с учетом смещения
      // 1. Вычисляем, сколько полных эле ментов мы прокрутили
      const fullItemsScrolled = Math.floor(scrollDistance / ITEM_WIDTH);
      
      // 2. Вычисляем, какой номер элемента окажется под индикатором
      // Берем остаток от деления на длину массива предметов
      const finalItemIndex = fullItemsScrolled % items.length;
      
      // 3. Получаем итоговый предмет
      const winningItem = items[finalItemIndex];
      
      // Выполняем анимацию прокрутки
      spinnerRef.current.style.transition = `transform ${5 + fullSpinsCount}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
      spinnerRef.current.style.transform = `translateX(-${scrollDistance}px)`;
      
      // Добавляем небольшую случайность к времени прокрутки
      const spinDuration = (5 + fullSpinsCount + Math.random()) * 1000;
      
      // После того, как анимация закончится, показываем выигрыш
      setTimeout(() => {
        setIsSpinning(false);
        setSelectedItemId(winningItem.id);
        setTimeout(() => setCanSpin(true), 500);
      }, spinDuration);
    }, 50);
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 bg-gray-900 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Открытие кейса</h1>
      
      {/* Контейнер для прокрутки с центральным индикатором */}
      <div className="relative w-full mb-6">
        <div className="relative w-full overflow-hidden h-24 bg-gray-800 rounded-lg">
          {/* Центральный индикатор */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-red-600 z-20"></div>
          
          {/* Подсветка выбора */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 border-2 border-yellow-400 border-opacity-70 z-10"></div>
          
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
              // Используем React.Fragment и key для правильного рендеринга массива
              <React.Fragment key={`itemgroup-${outerIndex}`}>
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
      {selectedItemId && (
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
      )}
      
      {/* Статистика редкости предметов */}
      <div className="w-full mt-4 mb-4 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-white text-lg font-bold mb-2">Шансы выпадения:</h3>
        <div className="flex flex-wrap justify-between">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-gray-400 rounded-sm mr-2"></div>
            <span className="text-gray-300">Обычный: 20%</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
            <span className="text-gray-300">Необычный: 20%</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-purple-600 rounded-sm mr-2"></div>
            <span className="text-gray-300">Редкий: 20%</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-pink-600 rounded-sm mr-2"></div>
            <span className="text-gray-300">Эпический: 20%</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
            <span className="text-gray-300">Легендарный: 20%</span>
          </div>
        </div>
      </div>
      
      {/* Кнопка для запуска */}
      <button
        onClick={startSpin}
        disabled={!canSpin}
        className={`px-6 py-3 rounded-full font-bold text-white ${
          canSpin
            ? 'bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 cursor-pointer transform transition hover:scale-105'
            : 'bg-gray-700 cursor-not-allowed'
        }`}
      >
        {isSpinning ? 'Открывается...' : canSpin ? 'Открыть кейс' : 'Пожалуйста, подождите'}
      </button>
      
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