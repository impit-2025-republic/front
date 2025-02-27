import React, { useState, useRef, useCallback } from 'react';
import CaseAnimation from './Case';

// Типы
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Item {
  id: number;
  name: string;
  image: string;
  rarity: Rarity;
}

export interface RarityColors {
  [key: string]: string;
}

export const rarityColors: RarityColors = {
  common: 'bg-gray-400',
  uncommon: 'bg-blue-500',
  rare: 'bg-purple-600',
  epic: 'bg-pink-600',
  legendary: 'bg-yellow-500'
};

interface OpenCaseProps {
  onOpen?: () => void;
}

// Генерация тестовых предметов
const generateItems = (): Item[] => {
  const items: Item[] = [];
  const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
  
  for (let i = 1; i <= 30; i++) {
    const rarityIndex = Math.floor(Math.random() * 5);
    items.push({
      id: i,
      name: `Предмет ${i}`,
      image: `/api/placeholder/80/80`,
      rarity: rarities[rarityIndex]
    });
  }
  
  return items;
};

const OpenCase: React.FC<OpenCaseProps> = ({ onOpen }) => {
  const [items] = useState<Item[]>(generateItems());
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [canSpin, setCanSpin] = useState<boolean>(true);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  const ITEM_WIDTH = 96; // Ширина каждого элемента в пикселях (w-24 = 96px)
  
  // Функция для запуска анимации
  const startSpin = useCallback(() => {
    if (!canSpin) return;
    
    // Показываем анимацию прокрутки, если она еще не отображается
    if (!showAnimation) {
      setShowAnimation(true);
      // Даем время для рендеринга элементов прокрутки перед началом анимации
      setTimeout(() => {
        if (spinnerRef.current) startSpinAnimation();
      }, 100);
      return;
    }
    
    startSpinAnimation();
  }, [canSpin, showAnimation]);
  
  // Выделяем логику анимации в отдельную функцию
  const startSpinAnimation = useCallback(() => {
    if (!spinnerRef.current) return;
    
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
      
      // От 3 до 4 полных кругов
      const fullSpinsCount = 3 + Math.floor(Math.random() * 2);
      
      // Выбираем произвольный начальный индекс
      const randomStartIndex = Math.floor(Math.random() * items.length);
      
      // Добавляем случайное смещение (-40..+40 пикселей)
      const randomOffset = Math.floor(Math.random() * 81) - 40;
      
      // Вычисляем точное смещение в пикселях
      const scrollDistance = (items.length * ITEM_WIDTH * fullSpinsCount) + 
                           (randomStartIndex * ITEM_WIDTH) + randomOffset;
      
      // Вычисляем, какой предмет окажется под индикатором
      const fullItemsScrolled = Math.floor(scrollDistance / ITEM_WIDTH);
      const finalItemIndex = fullItemsScrolled % items.length;
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
        
        if (onOpen) {
          onOpen();
        }
        
        setTimeout(() => setCanSpin(true), 500);
      }, spinDuration);
    }, 50);
  }, [items, onOpen]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#191b1f] p-6">
      <div className="flex flex-col items-center gap-2 mt-6">
        <h1 className="text-3xl font-medium text-white">Бронзовый сундук</h1>
        <p className="text-base text-[#757575]">Нажмите на сундук, чтобы открыть</p>
      </div>
      
      <div className="flex justify-center mt-16">
        <button 
          onClick={startSpin}
          disabled={!canSpin && showAnimation}
          className={`w-40 h-48 transition-transform duration-300 cursor-pointer
            ${isSpinning ? 'animate-bounce' : 'hover:scale-105'}
            ${!canSpin && showAnimation ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7_Hicjn7nbGWzhL/frame-20.png"
            alt="Bronze Chest"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
      
      {showAnimation && !isSpinning && !selectedItemId && (
        <div className="mt-4 text-white text-lg">
          Нажмите на сундук ещё раз, чтобы начать прокрутку
        </div>
      )}
      
      {showAnimation && (
        <CaseAnimation 
          spinnerRef={spinnerRef} 
          items={items} 
          rarityColors={rarityColors} 
          isSpinning={isSpinning}
        />
      )}
      
      {/* Выигранный предмет */}
      {selectedItemId && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg flex flex-col items-center animate-bounce-small mt-6">
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
    </div>
  );
};

export default OpenCase;