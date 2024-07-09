import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../../styles/component/animatedBackground.css';

const AnimatedBackground = () => {
  const props = useSpring({
    loop: true,
    to: async (next) => {
      while (true) {
        await next({ backgroundPosition: '0% 50%' });
        await next({ backgroundPosition: '100% 50%' });
      }
    },
    from: { backgroundPosition: '0% 50%' },
    config: { duration: 8000, tension: 120, friction: 14 },
  });

  return (
    <animated.div className="animated-background" style={props}></animated.div>
  );
};

export default AnimatedBackground;