import FlyoutMenu from './FlyoutMenu';
import HoverButton from './HoverButton';
import IconGymnastics from './IconComponents/IconGymnastics';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="p-4ex flex justify-between border-b-2 border-slate-300 bg-slate-100 py-4 text-slate-900">
      <Link to="/">
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
      </Link>
      <div className="mr-3 mt-1.5 flex flex-row justify-between">
        <div className="mr-6 flex">
        </div>
        {user ? (
          <>
            <Link to="/"><HoverButton text="Log out" onClick='logout'/></Link>
            <Link to={`/user/${user.name}`}><HoverButton text={user.name}/></Link>
          </>
        ) : (
          <>
            <Link to="/login"><HoverButton text="Log in" /></Link>
            <Link to="/register"><HoverButton text="Register" /></Link>
          </>
        )}
        <FlyoutMenu />
      </div>
    </div>
  );
}

export default Navbar;
