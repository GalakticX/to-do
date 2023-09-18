import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tasks">Tasks</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
