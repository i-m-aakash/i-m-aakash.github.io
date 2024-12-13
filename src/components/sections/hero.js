import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .medium-link{
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 5px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Aakash Mudigonda</h2>;
  const three = <h2>Enumerate Thoroughly, Exploit Simply.</h2>;
  const four = (
    <>
      <p>
      I’m Aakash Mudigonda, a Cybersecurity Master’s student at University of Maryland with a focus on{' '}
        <a href="#" rel="noreferrer">
        Offensive security - all things Red Teaming and AppSec
        </a>
        
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:aakashmudigonda@gmail.com"
      target="_blank"
      rel="noreferrer">
      Contact me!
    </a>
  );

  const six = (
    <a
      className="medium-link"
      href="https://aakashmudigonda.medium.com/"
      target="_blank"
      rel="noreferrer"
      style={{ marginLeft: '10px' }}>
      My Blogs!
    </a>
  );

  const buttonContainer = (
    <div className="button-container">
      {five}
      {six}
    </div>
  );
  
  const items = [one, two, three, four, buttonContainer];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
