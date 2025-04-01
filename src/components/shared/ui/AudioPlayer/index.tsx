import { FC, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface AudioPlayerProps {
  src: string;
  className?: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ src, className }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    if (src) {
      const link = document.createElement('a');
      link.href = src;
      link.download = 'audio';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        audio.currentTime = 0;
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <audio ref={audioRef} src={src} className="hidden" />

      <button
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      <div className="flex-1">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <span className="text-xs text-gray-500">
        {formatTime(duration * (progress / 100))}
      </span>

      <button onClick={handleDownload} className="text-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
    </div>
  );
};

export default AudioPlayer;
