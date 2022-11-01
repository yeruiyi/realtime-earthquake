import { useState,useRef } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import React from 'react';
import styled from 'styled-components';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import { styled as muiStyle } from '@mui/material/styles';
import { autoPlayTypeChanged } from '../../Navbar/actions';
import { useSelector } from 'react-redux';
import { RooState } from '../../store';
import { useEffect } from 'react';

const options = ['0.5x', '1x', '1.5x'];
export default function AutoPlay() {
  const { clusterEnabled } = useSelector(({ navbar }: RooState) => navbar);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    if (clusterEnabled) {
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
    }
  },[clusterEnabled])

  const handleClick = () => {
    dispatch(autoPlayTypeChanged(true,options[selectedIndex]));
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };


  return(
    <DropdownContainer>
      <CustomButtonGroup variant="contained"  aria-label="outlined primary button group">
        <Button disabled={btnDisabled} onClick={handleClick}>AutoPlay By Time {options[selectedIndex]}</Button>
        <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            disabled={btnDisabled}
          >
            <ArrowDropDownIcon />
        </Button>
      </CustomButtonGroup>
      <CustomPopper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </CustomPopper>
    </DropdownContainer>
    
  )
}

const DropdownContainer = styled.div`
    position: absolute;
    bottom: 130px;
    z-index: 314159;
    margin:auto;
    width:20%;
    margin-left:15%;
`;

const CustomPopper = muiStyle(Popper)({
  top:"unset !important",
  left:"unset !important",
  width:"fit-content"
});

const CustomButtonGroup = muiStyle(ButtonGroup)({
  '& .MuiButtonGroup-grouped': {    
    background: "#42a5f5",
  },
});
