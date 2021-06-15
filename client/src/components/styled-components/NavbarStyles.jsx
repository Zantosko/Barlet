import styled from 'styled-components';

export const Nav = styled.header`
  width: 100vw;
  height: 90px;
  background-color: #eee;
  opacity: 0.95;
  box-shadow: 0 3px 3px -2px rgba(0,0,0,.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
`;

export const LogoImg = styled.img`
  height: 60px;
  width: 120px;

  &:hover {
    cursor: pointer;
  }
`;

export const NavLeft = styled.div`
`;

export const NavRight = styled.div`
`;

export const NavLinkContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

export const NavLink = styled.li`
  margin-right: 1rem;
  font-size: 15.5px;
  color: #333;
  padding: 0.5rem 0.5rem;
`;

export const Special = styled.li`
  margin-right: 1rem;
  font-size: 15.5px;
  color: #333;
  border: solid 1px #08aeef;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #08aeef;
    color: #fff
  }
`;
