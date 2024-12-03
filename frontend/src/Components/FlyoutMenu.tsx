import React from 'react';
import { motion } from 'motion/react';

function FlyoutMenu() {
  const [isClicked, setClicked] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setClicked(!isClicked)}
        className="relative ml-2 flex z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="h-25 absolute -right-1 top-6 w-48 rounded-md bg-slate-100"
          >
            <div className="m-1 flex justify-center rounded-md border-2 border-slate-900 text-slate-900 transition duration-100 hover:border-slate-100 hover:bg-slate-100">
              <h1>Enter Foods</h1>
            </div>
            <div className="m-1 flex justify-center rounded-md border-2 border-slate-900 text-slate-900 transition duration-100 hover:border-slate-100 hover:bg-slate-100">
              <h1>Your Calorie Log</h1>
            </div>
            <div className="m-1 flex justify-center rounded-md border-2 border-slate-900 text-slate-900 transition duration-100 hover:border-slate-100 hover:bg-slate-100">
              <h1>Enter Workouts</h1>
            </div>
            <div className="m-1 flex justify-center rounded-md border-2 border-slate-900 text-slate-900 transition duration-100 hover:border-slate-100 hover:bg-slate-100">
              <h1>Your Workouts</h1>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default FlyoutMenu;
