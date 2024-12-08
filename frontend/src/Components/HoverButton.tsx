import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface HoverButtonProps {
  text: string;
  onClick?: string;
}

function HoverButton({ text, onClick}: HoverButtonProps) {
  const [isHovered, setHovered] = useState(false);
  const { logout } = useAuth();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative ml-2 mr-5 flex rounded-md pl-1 pr-1 transition duration-300 hover:border-slate-400"
    >
        {onClick=="logout" && (
          <button onClick={logout}>
          {text} 
          </button>
        )}
        {onClick!="logout" && (
          <button>
          {text} 
          </button>
        )}

      <span
        style={{
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
        className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-slate-600 transition-transform duration-300 ease-out"
      />
    </div>
  );
}

export default HoverButton;
