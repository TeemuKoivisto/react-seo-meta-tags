import * as React from 'react'
import { MdMenu, MdClose } from 'react-icons/md'
import { Link } from 'gatsby'
import styled from 'styled-components'

export interface IDropdownOption {
  key: string
  title: React.ReactNode
}
interface IProps {
  className?: string
  options: IDropdownOption[]
}
interface IState {
  isOpen: boolean
  targetElement: HTMLElement | null
}

class DropdownClass extends React.PureComponent<IProps, IState> {
  readonly state: IState = {
    isOpen: false,
    targetElement: null
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      targetElement: document.querySelector('html')
    })
  }
  componentWillUnmount() {
    this.setScrollLock(false)
  }
  setScrollLock(disable: boolean) {
    if (disable) {
      this.state.targetElement!.classList.add('scroll-lock')
    } else {
      this.state.targetElement!.classList.remove('scroll-lock')
    }
  }
  private toggleMenu = () => {
    if (!this.state.isOpen) {
      this.setState({ ...this.state, isOpen: true })
      this.setScrollLock(true)
    } else {
      this.setState({ ...this.state, isOpen: false })
      this.setScrollLock(false)
    }
  }
  render() {
    const { className, options } = this.props
    return (
      <div className={className}>
        {this.state.isOpen ? (
          <FixedCloseIcon>
            <SvgWrapper onClick={this.toggleMenu}>
              <MdClose size={32} />
            </SvgWrapper>
          </FixedCloseIcon>
        ) : (
          <SvgWrapper onClick={this.toggleMenu}>
            <MdMenu size={32} />
          </SvgWrapper>
        )}
        <MobileNav className={this.state.isOpen && 'visible'}>
          <DropdownList>
            {options.map(option => (
              <DropdownOption key={option.key}>
                <Link to={option.key}>{option.title}</Link>
              </DropdownOption>
            ))}
          </DropdownList>
        </MobileNav>
      </div>
    )
  }
}
export const NavDropdown = styled(DropdownClass)``
// Keeps svgs from resizing themselves into oblivion
const SvgWrapper = styled.div`
  color: #fff;
  cursor: pointer;
  display: flex;
  margin-right: 10px;
`
const FixedCloseIcon = styled.div`
  color: #fff;
  right: 20px;
  top: 20px;
  position: fixed;
  z-index: 501;
`
const MobileNav = styled.nav`
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 60px 0 0 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100%;
  z-index: 500;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
`
const DropdownList = styled.ul`
  margin: 20px 0 0 0;
`
const DropdownOption = styled.li`
  align-items: flex-start;
  cursor: pointer;
  display: flex;
  justify-content: left;
  margin: 0;
  text-transform: uppercase;
  padding: 15px 30px;
  width: 100%;
  &.icon-links {
    cursor: default;
  }
  &:not(.icon-links):hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  > a {
    color: #fff;
    height: 100%;
    width: 100%;
  }
`
