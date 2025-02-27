import React from 'react';

interface TaskCardProps {
  title?: string;
  description?: string;
  date?: string | Date;
  endDate?: string | Date;
  status?: 'active' | 'remaining' | string;
  statusText?: string;
  coins?: number;
  onClick?: () => void;
  is_registered?:boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title = 'Субботник',
  description = 'Убрать мусор на кабинете 308',
  date = new Date(),
  status = 'active',
  statusText = 'Идет',
  coins = 15,
}) => {
  // Функция для форматирования даты на русском языке
  const formatDate = (dateInput: string | Date): string => {
    // Преобразуем входные данные в объект Date
    let date: Date;
    try {
      date = typeof dateInput === 'string' 
        ? new Date(dateInput) // Обрабатываем ISO формат (2025-02-27T02:58:41.505Z)
        : dateInput;
    } catch (e) {
      return 'Некорректная дата';
    }
    
    // Проверяем валидность даты
    if (isNaN(date.getTime())) {
      return 'Некорректная дата';
    }
    
    const now = new Date();
    
    // Разница в миллисекундах
    const diff = date.getTime() - now.getTime();
    
    // Разница в минутах
    const diffMinutes = Math.floor(diff / (1000 * 60));
    
    // Разница в часах
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    
    // Разница в днях
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Если дата уже прошла
    if (diff < 0) return 'Просрочено';
    
    // Если осталось меньше часа
    if (diffMinutes < 60) {
      if (diffMinutes <= 1) return 'Через минуту';
      if (diffMinutes < 5) return 'Через несколько минут';
      return `Через ${diffMinutes} минут`;
    }
    
    // Если осталось меньше суток
    if (diffHours < 24) {
      if (diffHours === 1) return 'Через час';
      return `Через ${diffHours} часов`;
    }
    
    // Если осталось меньше недели
    if (diffDays < 7) {
      if (diffDays === 1) return 'Завтра';
      if (diffDays === 2) return 'Послезавтра';
      return `Через ${diffDays} дней`;
    }
    
    // Для более отдаленных дат показываем в человекочитаемом формате
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    const currentYear = now.getFullYear();
    const dateYear = date.getFullYear();
    
    // Если в текущем году, то показываем только день и месяц
    if (dateYear === currentYear) {
      return `${date.getDate()} ${months[date.getMonth()]}`;
    }
    
    // Иначе с годом
    return `${date.getDate()} ${months[date.getMonth()]} ${dateYear}г.`;
  };
  return (
    <div className="flex flex-col bg-[#26282C] rounded-3xl p-3 w-full h-fit">
      {/* Top section with coins */}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-row">
          <div className="flex flex-row items-center gap-1 px-3 py-2 bg-[#3F3F46] rounded-2xl">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7-5IjHFtJnMrSZV/subtract.png" 
              alt="coin"
              className="w-4 h-4"
            />
            <span className="text-white text-sm font-medium">{coins}</span>
          </div>
        </div>

        {/* Title and description */}
        <div className="flex flex-col gap-2 overflow-hidden">
          <h3 className="text-white text-xl font-medium line-clamp-1">{title}</h3>
          <p className="text-[#757575] text-base line-clamp-2 overflow-ellipsis">{description}</p>
        </div>
      </div>

      {/* Bottom section with status and button */}
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex flex-row justify-between items-center">
          <div className={`flex flex-row items-center gap-2 px-2 py-1 rounded-xl ${
            status.toLowerCase() === 'active' || status.toLowerCase() === 'в работе' ? 'bg-[#22C55E]' : 
            status.toLowerCase() === 'remaining' || status.toLowerCase() === 'open' ? 'bg-[#3B82F6]' : 'bg-[#3F3F46]'
          }`}>
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-white text-xs">
              {statusText || status}
            </span>
          </div>
          <span className="text-[#757575] text-xs">{formatDate(date)}</span>
        </div>

        {/* <button 
          disabled={is_registered}
          onClick={onClick}
          className="w-full py-4 px-4 bg-[#3F3F46] rounded-3xl text-white text-base font-medium hover:bg-[#4B4B52] transition-colors"
        >
          {is_registered === false ? "Участвовать" : "Вы участвуете"}
          
        </button> */}
      </div>
    </div>
  );
};

export default TaskCard;