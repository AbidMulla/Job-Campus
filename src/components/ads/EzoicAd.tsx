'use client';
import { useEffect } from 'react';

interface EzoicAdProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function EzoicAd({ id, className = '', style = {} }: EzoicAdProps) {
  useEffect(() => {
    // Ensure Ezoic is loaded before placing ads
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd.push(function() {
        window.ezstandalone.defineSlot(id, []);
        window.ezstandalone.display(id);
      });
    }
  }, [id]);

  return (
    <div 
      id={id} 
      className={`ezoic-ad ${className}`}
      style={style}
    />
  );
}

// Declare global types for Ezoic
declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>;
      defineSlot: (id: string, sizes: number[][]) => void;
      display: (id: string) => void;
    };
  }
}
