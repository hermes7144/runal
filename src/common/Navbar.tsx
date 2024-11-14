import React from 'react';

 export default function Navbar() {
  
  return (
    <header className={`navbar justify-between font-semibold bg-white fixed top-0 left-0 right-0 z-10 border-b border-gray-300`}>
          <nav className='flex items-center gap-4'>
        {isAuthLoading ? '' : user ? <button onClick={logout}>로그아웃</button> : <button onClick={login}>로그인</button>}
      </nav>
  </header>
  )
  
  ;
}