import { cn } from '@/lib/utils';
import { JSX } from 'react';

interface FilterArrowProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const FilterArrow = ({
  className,
  width = 24,
  height = 24,
  color = '#ADBFDF',
}: FilterArrowProps): JSX.Element => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clipPath="url(#clip0_1_866)">
          <path
            d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_1_866">
            <rect width={width} height={height} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default FilterArrow;
