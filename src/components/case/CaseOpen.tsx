import { useState, useRef, useCallback, useEffect } from 'react';
import CaseAnimation from './Case';
import { useGetProducts } from '../../api/endpoints/b8st-api';

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

// Исправленное определение пропсов
interface OpenCaseProps {
  selectedItemId: number;
}

const OpenCase = ({ selectedItemId }: OpenCaseProps) => {
  const { data: items } = useGetProducts();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [canSpin, setCanSpin] = useState<boolean>(true);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [wonItem, setWonItem] = useState<number | null>(null);
  const viewportCenterRef = useRef<HTMLDivElement>(null);
  const ITEM_WIDTH = 96; // Ширина каждого элемента в пикселях (w-24 = 96px)
  
  console.log("OpenCase component received selectedItemId:", selectedItemId);
  
  // Получаем доступные предметы
  const rollItems = items ? items?.products.filter((item) => item.CaseTypeID === null) : [];
  
  // Убедимся, что selectedItemId существует в списке предметов
  useEffect(() => {
    if (selectedItemId && items?.products) {
      const itemExists = items.products.some(item => item.ProductID === selectedItemId);
      if (!itemExists) {
        console.warn(`Item with ID ${selectedItemId} not found in the products list`);
      } else {
        console.log(`Found item with ID ${selectedItemId} in products list`);
      }
    }
  }, [selectedItemId, items]);
  
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
    if (!spinnerRef.current || !items?.products?.length || !rollItems.length) return;
    
    setIsSpinning(true);
    setWonItem(null);
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
      if (!spinnerRef.current || !viewportCenterRef.current) return;
      
      // От 3 до 4 полных кругов
      const fullSpinsCount = 3 + Math.floor(Math.random() * 2);
      
      // Важно: получим корректный winningItemIndex
      const winningItemIndex = rollItems.findIndex(item => item.ProductID === selectedItemId);
      
      console.log("Looking for ID:", selectedItemId, "Found at index:", winningItemIndex);
      console.log("Roll items:", rollItems.map(item => item.ProductID));
      
      // Если предмет не найден, используем случайный индекс (fallback)
      let targetIndex;
      if (winningItemIndex >= 0) {
        targetIndex = winningItemIndex;
      } else {
        // Выбираем случайный предмет, если указанный не найден
        targetIndex = Math.floor(Math.random() * rollItems.length);
        console.warn(`Selected item ID ${selectedItemId} not found, using random item at index ${targetIndex}`);
      }
      
      // Вычисляем центр видимой области
      const viewportCenter = viewportCenterRef.current.offsetWidth / 2;
      
      // Уменьшим случайное смещение, чтобы точно попасть на нужный предмет
      const randomOffset = Math.floor(Math.random() * 21) - 10; // -10 до +10 вместо -20 до +20
      
      // Вычисляем точное смещение в пикселях для попадания на центр нужного предмета
      const scrollDistance = (rollItems.length * ITEM_WIDTH * fullSpinsCount) +
                             (targetIndex * ITEM_WIDTH) - viewportCenter + (ITEM_WIDTH / 2) + randomOffset;
      
      // Выполняем анимацию прокрутки
      spinnerRef.current.style.transition = `transform ${5 + fullSpinsCount}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
      spinnerRef.current.style.transform = `translateX(-${scrollDistance}px)`;
      
      // Добавляем небольшую случайность к времени прокрутки
      const spinDuration = (5 + fullSpinsCount + Math.random()) * 1000;
      
      // После того, как анимация закончится, показываем выигрыш
      setTimeout(() => {
        setIsSpinning(false);
        
        // Устанавливаем правильный ID предмета
        if (winningItemIndex >= 0) {
          setWonItem(selectedItemId);
        } else {
          // Если предмет не был найден, используем ID из случайного предмета
          const actualWonItemId = rollItems[targetIndex]?.ProductID;
          setWonItem(actualWonItemId);
        }
        
        setTimeout(() => setCanSpin(true), 500);
      }, spinDuration);
    }, 50);
  }, [items, rollItems, selectedItemId]);
  
  // Определим рарити выигранного предмета
  const getItemRarity = (itemId) => {
    const item = items?.products?.find(item => item.ProductID === itemId);
    // Преобразуем числовую редкость в строковую
    if (item?.Rarity === 1) return 'common';
    if (item?.Rarity === 2) return 'uncommon';
    if (item?.Rarity === 3) return 'rare';
    if (item?.Rarity === 4) return 'epic';
    if (item?.Rarity === 5) return 'legendary';
    return 'common'; // по умолчанию
  };
  
  return (
    <div className="flex flex-col items-center bg-[#191b1f] p-6">
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
      
      {showAnimation && !isSpinning && !wonItem && (
        <div className="mt-4 text-white text-lg">
          Нажмите на сундук ещё раз, чтобы начать прокрутку
        </div>
      )}
      
      {showAnimation && (
        <div 
          ref={viewportCenterRef} 
          className="relative w-full overflow-hidden mt-8"
        >
          <CaseAnimation 
            spinnerRef={spinnerRef} 
            items={rollItems} 
            rarityColors={rarityColors} 
            isSpinning={isSpinning}
          />
          
          {/* Индикатор центра (можно убрать в продакшене) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 opacity-50 z-10"></div>
        </div>
      )}
      
      {/* Выигранный предмет */}
      {wonItem && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg flex flex-col items-center animate-bounce-small mt-6">
          <h2 className="text-lg font-bold text-white mb-2">Ваш выигрыш:</h2>
          {(() => {
            const winItem = items?.products?.find(item => item.ProductID === wonItem);
            if (winItem) {
              const itemRarity = getItemRarity(wonItem);
              return (
                <div className="flex flex-col items-center">
                  <div className={`w-24 h-24 rounded-md flex items-center justify-center mb-2 ${rarityColors[itemRarity]}`}>
                    <img src={winItem.Image} alt={winItem.Name} className="w-20 h-20 object-contain" />
                  </div>
                  <p className="text-lg font-bold text-white">{winItem.Name}</p>
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