import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['Application Security', 'Red Teaming', 'Product Security', 'Offensive Security', 'AI/ML Security', 'Secure Coding', 'Malware Anaylsis',  'GRC' ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
            Hello World! I’m Aakash Mudigonda, a Master’s student in Cybersecurity at the {' '}<a href="https://www.umd.edu">University of Maryland</a>, and I’m just as excited about reinforcing digital defenses as I am about pulling them apart to see what’s inside. From strengthening enterprise applications against threats to reverse engineering malware deep at the assembly level, my work spans both defending networks and simulating attacks, giving me hands-on experience with all sides of security. 
            </p>
            <p>I've walked both sides of the security landscape: setting up robust Active Directory labs, dismantling command-and-control servers, and hunting down hidden malicious code.
            </p>
            <p>
            My approach is turning complexity into clarity. I believe complex security findings should be crystal clear to everyone, from seasoned IT professionals to curious newcomers. Whether I’m fine-tuning web application security controls, reinforcing codebases against common vulnerabilities, or ensuring that software meets industry standards, I'm driven by one core mission: practical solutions with real impact.
            </p>

            <p>
              I’ve had the privilege of working at{' '}
              <a href="https://underarmour.com/">Under Armour</a>, {' '}
              <a href="https://qure.ai/">a Health AI Company - Qure.Ai</a>, and at {' '}
              <a href="https://www.umd.edu/">University of Maryland</a>, and{' '}
              <a href="https://binary10.tech/">a startup - Binary10.Tech</a>
            </p>
            <p> 
              My main focus these days is diving deeper into offensive security and working towards my{' '}<a href='https://www.stationx.net/oscp-exam-guide/#what-is-the-offsec-certified-professional-oscp-certification'>OSCP+ certification</a>.
            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;