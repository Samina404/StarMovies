import { Menu, X, SearchIcon, UserRoundSearch, TicketPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user}= useUser();
  const {openSignIn}=useClerk();

  const navigate= useNavigate()

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between text-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-wide">
        ★ <span className="text-primary">STAR</span>Movie<span className="text-white"></span>
      </div>

      {/* Desktop Links */}
      <div className=" hidden md:flex items-center space-x-6 text-lg">
        <Link to="/" onClick={handleLinkClick} className="hover:text-pink-400">Home</Link>
        <Link to="/movies" onClick={handleLinkClick} className="hover:text-pink-400">Movies</Link>
        <Link to="/movies/1" onClick={handleLinkClick} className="hover:text-pink-400">Movie Details</Link>
        <Link to="/favorite" onClick={handleLinkClick} className="hover:text-pink-400">Favourite</Link>
      </div>

      {/* Right Side: Search + Login + Menu */}
      <div className="flex items-center space-x-4">
        {/* Search Icon - always visible */}
        <SearchIcon className="cursor-pointer" />

{
  !user ?(
     <button onClick={openSignIn} className="bg-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 transition text-sm md:text-base">
          Login
        </button>

  ) :(
    <UserButton>
<UserButton.MenuItems>
  <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/my-bookings')}/>
</UserButton.MenuItems>
    </UserButton>
 
  )
}
        {/* Login Button */}
       
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col space-y-4 p-4 md:hidden shadow-lg">
          <Link to="/" onClick={handleLinkClick} className="hover:text-pink-400">Home</Link>
          <Link to="/movies" onClick={handleLinkClick} className="hover:text-pink-400">Movies</Link>
          <Link to="/movies/1" onClick={handleLinkClick} className="hover:text-pink-400">Movie Details</Link>
          <Link to="/favorite" onClick={handleLinkClick} className="hover:text-pink-400">Favourite</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
