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
  
  
  // @ts-ignore
  const rollItems = items ? items?.products.filter((item) => item.CaseTypeID === null) : [];
  
  // Start animation right when component loads - to see what's happening with items
  useEffect(() => {
    if (items?.products?.length && rollItems.length > 0 && selectedItemId) {
      // Проверим список элементов и их расположение
      
      // Найдем выбранный элемент
      const targetItemId = Number(selectedItemId);
      // @ts-ignore
      const targetItemIndex = rollItems.findIndex(item => Number(item.ProductID) === targetItemId);
      
      // Отложим автоматический запуск, чтобы пользователь мог нажать на сундук
      setShowAnimation(true);
    }
  }, [items, rollItems, selectedItemId]);
  
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
      
      // САМОЕ ВАЖНОЕ ИСПРАВЛЕНИЕ - здесь точно определена логика отображения
      // Получаем целевой ID предмета
      const targetItemId = Number(selectedItemId);
      
      // Находим индекс в массиве данных
      // @ts-ignore
      const dataIndex = rollItems.findIndex(item => Number(item.ProductID) === targetItemId);
      
      
      // РЕШЕНИЕ: после анализа мы определили, что есть постоянный сдвиг между 
      // индексом в данных и визуальной позицией на рулетке: +2 позиции
      // Пример: Худи (ID 2) находится на позиции 6 в данных, но визуально должен быть на позиции 8
      
      // Применяем точную формулу коррекции с учетом сдвига на +2 позиции
      const visualIndex = (dataIndex + 2) % rollItems.length;
      
      // Вычисляем центр видимой области
      const viewportCenter = viewportCenterRef.current.offsetWidth / 2;
      
      // Убираем случайное смещение для точности
      const randomOffset = 0;
      
      // Вычисляем точное смещение в пикселях для попадания на центр нужного предмета
      const scrollDistance = (rollItems.length * ITEM_WIDTH * fullSpinsCount) +
                            (visualIndex * ITEM_WIDTH) - viewportCenter + (ITEM_WIDTH / 2) + randomOffset;
      
      
      // Выполняем анимацию прокрутки
      spinnerRef.current.style.transition = `transform ${5 + fullSpinsCount}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
      spinnerRef.current.style.transform = `translateX(-${scrollDistance}px)`;
      
      // Добавляем небольшую случайность к времени прокрутки
      const spinDuration = (5 + fullSpinsCount + Math.random()) * 1000;
      
      // После того, как анимация закончится, показываем выигрыш
      setTimeout(() => {
        setIsSpinning(false);
        
        // ВСЕГДА используем именно тот ID, который был передан в качестве пропса
        setWonItem(targetItemId);
        
        setTimeout(() => setCanSpin(true), 500);
      }, spinDuration);
    }, 50);
  }, [items, rollItems, selectedItemId]);
  
  // Определим рарити выигранного предмета
  // @ts-ignore
  const getItemRarity = (itemId) => {
      // @ts-ignore
    const item = items?.products?.find(item => item.ProductID === itemId);
    // Преобразуем числовую редкость в строковую
          // @ts-ignore
    if (item?.Rarity === 1) return 'common';
          // @ts-ignore
    if (item?.Rarity === 2) return 'uncommon';
          // @ts-ignore
    if (item?.Rarity === 3) return 'rare';
          // @ts-ignore
    if (item?.Rarity === 4) return 'epic';
          // @ts-ignore
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
            {/* @ts-ignore*/}
            const winItem = items?.products?.find(item => item.ProductID === wonItem);
            if (winItem) {
              const itemRarity = getItemRarity(wonItem);
              return (
                <div className="flex flex-col items-center">
                  <div className={`w-24 h-24 rounded-md flex items-center justify-center mb-2 ${rarityColors[itemRarity]}`}>
                                {/* @ts-ignore*/}
                    <img src={winItem.Image} alt={winItem.Name} className="w-20 h-20 object-contain" />
                  </div>
                              {/* @ts-ignore*/}
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