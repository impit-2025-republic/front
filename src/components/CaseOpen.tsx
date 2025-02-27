import React, { useState, useRef } from 'react';
import CaseAnimation from './Case';

interface BronzeChestProps {
  onOpen?: () => void;
}
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


type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface Item {
  id: number;
  name: string;
  image: string;
  rarity: Rarity;
}

export const rarityColors: Record<Rarity, string> = {
  common: 'bg-gray-400',
  uncommon: 'bg-blue-500',
  rare: 'bg-purple-600',
  epic: 'bg-pink-600',
  legendary: 'bg-yellow-500'
};


const OpenCase: React.FC<BronzeChestProps> = () => {
  const [items] = useState<Item[]>(generateItems());
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  // // @ts-ignore
  // const [_, setSelectedItemId] = useState<number | null>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [canSpin, setCanSpin] = useState<boolean>(true);
  
  const ITEM_WIDTH = 96; // Ширина каждого элемента в пикселях (w-24 = 96px)
  

  
    // Функция для запуска анимации
  const startSpin = () => {
      if (!canSpin || !spinnerRef.current) return;
      
      setIsSpinning(true);
      // setSelectedItemId(null);
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
        // const fullItemsScrolled = Math.floor(scrollDistance / ITEM_WIDTH);
        
        // 2. Вычисляем, какой номер элемента окажется под индикатором
        // Берем остаток от деления на длину массива предметов
        // const finalItemIndex = fullItemsScrolled % items.length;
        
        // 3. Получаем итоговый предмет
        // const winningItem = items[finalItemIndex];
        
        // Выполняем анимацию прокрутки
        spinnerRef.current.style.transition = `transform ${5 + fullSpinsCount}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
        spinnerRef.current.style.transform = `translateX(-${scrollDistance}px)`;
        
        // Добавляем небольшую случайность к времени прокрутки
        const spinDuration = (5 + fullSpinsCount + Math.random()) * 1000;
        
        // После того, как анимация закончится, показываем выигрыш
        setTimeout(() => {
          setIsSpinning(false);
          // setSelectedItemId(winningItem.id);
          setTimeout(() => setCanSpin(true), 500);
        }, spinDuration);
      }, 50);
    };

  // const handleClick = () => {
  //   if (!isAnimating) {
  //     setIsAnimating(true);
  //     onOpen();
  //     // Reset animation state after animation duration
  //     setTimeout(() => setIsAnimating(false), 1000);
  //   }
  // };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#191b1f] p-6">
      <div className="flex flex-col items-center gap-2 mt-6">
        <h1 className="text-3xl font-medium text-white">Бронзовый сундук</h1>
        <p className="text-base text-[#757575]">Нажмите на сундук, чтобы открыть</p>
      </div>
      
      <div className="flex justify-center mt-16">
        <button 
          onClick={startSpin}
          className={`w-[170px] h-[200px] transition-transform duration-300 cursor-pointer
            ${isSpinning ? 'animate-bounce' : 'hover:scale-105'}`}
        >
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7_Hicjn7nbGWzhL/frame-20.png"
            alt="Bronze Chest"
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {isSpinning ? <CaseAnimation spinnerRef={spinnerRef} items={items} rarityColors={rarityColors}/> : <></>}
    </div>
  );
};

export default OpenCase;

