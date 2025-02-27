import React from 'react';
import TaskCard from './TaskCard';

const CollectionCardLayout: React.FC = () => {
  return (
    <div className="flex overflow-x-auto w-full max-w-[896px] space-x-4 p-4">
      <div className="flex-shrink-0">
        <TaskCard 
          title="Субботник" 
          description="Убрать мусор на кабинете 308" 
          date="25.02.2025" 
          status="active" 
          statusText="Идет" 
          coins={15} 
        />
      </div>
      <div className="flex-shrink-0">
        <TaskCard 
          title="Ген уборка на офисе" 
          description="Ген уборка на офисе" 
          date="25.02.2025" 
          status="remaining" 
          statusText="Осталось 2ч" 
          coins={15} 
        />
      </div>
      <div className="flex-shrink-0">
        <TaskCard 
          title="Субботник" 
          description="Убрать мусор на кабинете 308" 
          date="25.02.2025" 
          status="active" 
          statusText="Идет" 
          coins={15} 
        />
      </div>
      <div className="flex-shrink-0">
        <TaskCard 
          title="Ген уборка на офисе" 
          description="Ген уборка на офисе" 
          date="25.02.2025" 
          status="remaining" 
          statusText="Осталось 2ч" 
          coins={15} 
        />
      </div>
    </div>
  );
};

export default CollectionCardLayout;
