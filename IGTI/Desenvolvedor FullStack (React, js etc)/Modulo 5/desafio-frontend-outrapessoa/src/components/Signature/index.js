import React from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

import { Container } from "./styles";

const Signature = () => (
  <Container>
    <p>
      developed by <strong>JessTo</strong>
    </p>
    <div>
      <a
        href='https://github.com/jesstoselli'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FiGithub />
      </a>
      <a
        href='https://www.linkedin.com/in/jessyca-toselli/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FiLinkedin />
      </a>
    </div>
  </Container>
);

export default Signature;
