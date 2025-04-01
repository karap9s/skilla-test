import AvatarPlaceholder from '@/components/shared/icons/AvatarPlaceholder';
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { FC } from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  alt = '',
  fallback = '',
  className,
}) => {
  return (
    <ShadcnAvatar className={className}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>
        <AvatarPlaceholder />
      </AvatarFallback>
    </ShadcnAvatar>
  );
};

export default Avatar;
