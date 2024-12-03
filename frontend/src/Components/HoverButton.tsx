import { useState } from 'react';

interface HoverButtonProps {
  ime: string;
  priimek: string;
}

function HoverButton({ ime, priimek }: HoverButtonProps) {
  const [isHovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative ml-2 mr-5 flex rounded-md pl-1 pr-1 transition duration-300 hover:border-slate-400"
    >
      {ime === '' && priimek === '' && <h1>Sign in</h1>}
      {ime !== '' && priimek !== '' && (
        <h1>
          {ime} {priimek}
        </h1>
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
