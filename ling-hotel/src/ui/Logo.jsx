import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  padding-top: 5px;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
