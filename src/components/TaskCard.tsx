import React from 'react';

interface TaskCardProps {
  title?: string;
  description?: string;
  date?: string;
  status?: 'active' | 'remaining';
  statusText?: string;
  coins?: number;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title = 'Субботник',
  description = 'Убрать мусор на кабинете 308',
  date = '25.02.2025',
  status = 'active',
  statusText = 'Идет',
  coins = 15,
  onClick
}) => {
  return (
    <div className="flex flex-col bg-[#26282C] rounded-3xl p-3 w-full max-w-[212px] min-h-[260px]">
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
        <div className="flex flex-col gap-2">
          <h3 className="text-white text-xl font-medium">{title}</h3>
          <p className="text-[#757575] text-base">{description}</p>
        </div>
      </div>

      {/* Bottom section with status and button */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <div className={`flex flex-row items-center gap-2 px-2 py-1 rounded-xl ${
            status === 'active' ? 'bg-[#22C55E]' : 'bg-[#3B82F6]'
          }`}>
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-white text-xs">
              {status === 'active' ? statusText : 'Осталось 2ч'}
            </span>
          </div>
          <span className="text-[#757575] text-xs">{date}</span>
        </div>

        <button 
          onClick={onClick}
          className="w-full py-4 px-4 bg-[#3F3F46] rounded-3xl text-white text-base font-medium hover:bg-[#4B4B52] transition-colors"
        >
          Участвовать
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

