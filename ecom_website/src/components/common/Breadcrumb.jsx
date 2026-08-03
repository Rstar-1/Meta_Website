import React from 'react';
import { NavLink } from 'react-router-dom';

const Breadcrumb = ({ items = [], className = "", colorClass = "text-white" }) => 
  items?.length ? (
    <nav aria-label="breadcrumb" className={`flex items-center gap-10 w-full flex-wrap small-text ${colorClass} ${className}`}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="mx-4">&gt;</span>}
          {item.path ? (
            <NavLink to={item.path} className={colorClass}>
              {item.label}
            </NavLink>
          ) : (
            <span className={`${colorClass} font-500`}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  ) : null;

export default Breadcrumb;
