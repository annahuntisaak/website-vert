import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Hotspot is at the tip (top-left of SVG), so no centering transform needed.
const Cursor = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  left: -50px;
  top: -50px;
  color: rgb(68, 33, 9);
  transition: color 0.25s ease;
  line-height: 0;
`;

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const contact = () => document.getElementById('contact');

    const onMove = (e) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const c = contact();
      el.style.color =
        c && target && c.contains(target) ? '#fff6f2' : 'rgb(68, 33, 9)';
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Cursor ref={cursorRef}>
      <svg
        viewBox="-0.5 -0.5 14 17"
        width="16"
        height="19"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* tip → left edge down → concave notch → right point → diagonal back to tip */}
        <path
          d="M0,0 L0,16 L5,11 L13,8 Z"
          fill="currentColor"
        />
      </svg>
    </Cursor>
  );
};

export default CustomCursor;
