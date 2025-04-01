import { FC, JSX } from 'react';

const AvatarPlaceholder: FC = (): JSX.Element => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <rect width="32" height="32" rx="16" fill="#EAF0FA" />
        <path
          d="M16.0001 16.0001C17.4734 16.0001 18.6667 14.8067 18.6667 13.3334C18.6667 11.8601 17.4734 10.6667 16.0001 10.6667C14.5267 10.6667 13.3334 11.8601 13.3334 13.3334C13.3334 14.8067 14.5267 16.0001 16.0001 16.0001ZM16.0001 17.3334C14.2201 17.3334 10.6667 18.2267 10.6667 20.0001V21.3334H21.3334V20.0001C21.3334 18.2267 17.7801 17.3334 16.0001 17.3334Z"
          fill="#ADBFDF"
        />
      </svg>
    </div>
  );
};

export default AvatarPlaceholder;
