import React, { useState } from 'react';

const DataTableCell = ({ value }) => {
  const [isHovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`cell ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {isHovered && <div className="content">{value}</div>}
      {!isHovered && <div className="truncated-content">{value}</div>}
    </div>
  );
};

export default DataTableCell;