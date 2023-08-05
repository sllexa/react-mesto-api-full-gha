import React from 'react';

const Loader = ({isOpen}) => {
  return (
    <div className={`modal modal_type_loader ${isOpen && 'modal_open'}`}>
      <div className="modal__loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default Loader;