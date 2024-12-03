import React from 'react';
import FlyoutMenu from './FlyoutMenu';
import HoverButton from './HoverButton';
import IconGymnastics from './IconComponents/IconGymnastics';

interface NavbarProps {
  ime: string;
  priimek: string;
}

function Navbar({ ime, priimek }: NavbarProps) {
  return (
    <div className="p-4ex flex justify-between border-b-2 border-slate-300 bg-slate-100 py-4 text-slate-900">
      <div className="ml-3 flex flex-row">
        <div className="ml-1 mt-1">
          <IconGymnastics />
        </div>
        <h1>rain</h1>
        <div className="ml-3 mt-1">
          <IconGymnastics />
        </div>
        <h1>ogether</h1>
      </div>
      <div className="mr-3 mt-1.5 flex flex-row justify-between">
        <div className="mr-6 flex">
        </div>
        <HoverButton ime={ime} priimek={priimek} />
        <FlyoutMenu />
      </div>
    </div>
  );
}

export default Navbar;
