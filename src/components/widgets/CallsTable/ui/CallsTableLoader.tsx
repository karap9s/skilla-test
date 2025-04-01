import { FC } from 'react';

interface CallsTableLoaderProps {
  showOverlay?: boolean;
}

const CallsTableLoader: FC<CallsTableLoaderProps> = ({ showOverlay }) => {
  if (showOverlay) {
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-secondary font-medium">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center h-60 w-full max-w-[1440px] mx-auto bg-white rounded-xl mb-30"
      style={{ boxShadow: '0px 4px 5px 0px #e9edf3' }}
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-secondary">Загрузка данных...</p>
      </div>
    </div>
  );
};

export default CallsTableLoader;
