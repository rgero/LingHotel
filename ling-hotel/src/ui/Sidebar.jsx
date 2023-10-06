import Logo from "./Logo"
import Navigation from "./Navigation"
import styled from "styled-components"

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2 rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    
    grid-row: 1 / -1;
`

const Sidebar = () => {
    return (
        <StyledSidebar>
            <Logo/>
            <Navigation/>
        </StyledSidebar>
    )
}

export default Sidebar
