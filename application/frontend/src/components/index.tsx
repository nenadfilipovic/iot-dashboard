import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const Layout = () => {
  const [nav, setNav] = useState(false);
  return (
    <>
      <Header onNavOpen={() => setNav(true)} />
      <Sidebar open={nav} onNavClose={() => setNav(false)} />
    </>
  );
};

export { Layout };
