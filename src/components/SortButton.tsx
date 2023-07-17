import React from 'react';

interface SortButtonProps {
  onClick: () => void;
  ascending: boolean;
}

const SortButton: React.FC<SortButtonProps> = ({ onClick, ascending }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 whitespace-nowrap bg-blue-500 text-white rounded-md"
    >
      Sort by Year {ascending ? '↓' : '↑'}
    </button>
  );
};

export default SortButton;
