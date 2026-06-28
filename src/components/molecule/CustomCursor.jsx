import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Dot = styled.div`
  position: fixed;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: background-color 0.25s ease;
  background-color: rgb(68, 33, 9);
  left: -50px;
  top: -50px;
`;

const CustomCursor = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const contact = () => document.getElementById('contact');

    const onMove = (e) => {
      const dot = dotRef.current;
      if (!dot) return;
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const c = contact();
      dot.style.backgroundColor =
        c && el && c.contains(el) ? '#fff6f2' : 'rgb(68, 33, 9)';
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <Dot ref={dotRef} />;
};

export default CustomCursor;
