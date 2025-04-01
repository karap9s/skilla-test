import { CallArrowIconProps } from '@/components/shared/icons/types/types';
import { cn } from '@/lib/utils';
import { JSX } from 'react';

const CallArrow = ({
  type,
  className,
}: {
  type: CallArrowIconProps;
  className?: string;
}): JSX.Element => {
  const handleColor: Record<CallArrowIconProps, string> = {
    incoming: '#002CFB',
    outgoing: '#28A879',
    missed: '#EA1A4F',
    notAnswered: '#EA1A4F',
  };

  const handleRotate: Record<CallArrowIconProps, string> = {
    incoming: '',
    outgoing: 'rotate-180',
    missed: '',
    notAnswered: 'rotate-180',
  };

  return (
    <div className={cn('w-fit', handleRotate[type], className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18.5217 7.17704L17.3447 6L7.66957 15.6751V10.1739H6V18.5217H14.3478C14.3478 18.5217 14.5372 17.4761 14.3478 16.8522C13.7239 14.7964 8.84661 16.8522 8.84661 16.8522L18.5217 7.17704Z"
          fill={handleColor[type]}
        />
      </svg>
    </div>
  );
};

export default CallArrow;
