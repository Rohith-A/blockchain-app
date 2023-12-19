/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import Logout from '@mui/icons-material/Logout';
import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actionTypes from '../actionTypes/actionTypes';
import { addOrderSetup, approveSetup, contractConnect, getContractAccount, getOrderDetailsbyAddress } from '../utils/connectContract';
import NetworkConnection from '../utils/networkConnection';

const logo = require('../logo/main-logo.png')
const Header = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const state = useSelector((state) => state)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const isWalletConnected = true;
    const { connectNetwork, logout } = NetworkConnection();
    const walletData = 0;

    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(() => {
      // contractConnect();
    })
    useEffect(() => {
      
      // getContractAccount();
      // getBalanceApple()
      // addOrderSetup( 'metamask', '0x56927Cb02919Ad5BB6dE10caC32619BB3AE5b3c9', 1, 'test_product', 'ball', 1, 'TEST123').then(v => console.log(v))
      // dispatch({
      //       type: actionTypes.TEST_API
      //   })
    }, [])
    // useEffect(() => {
    //     dispatch({
    //         type: actionTypes.USER_DETAILS,
    //         payload: props.user
    //     })
    // }, [props.user])

    const submit = () =>{
      addOrderSetup( 'metamask', '0x56927Cb02919Ad5BB6dE10caC32619BB3AE5b3c9', 1, 'test_product', 'ball', 1).then(v => console.log(v))
    }
    const readData = () =>{
      getOrderDetailsbyAddress( 'metamask', '0x56927Cb02919Ad5BB6dE10caC32619BB3AE5b3c9').then(v => console.log(v))
    }
    const approve = () =>{
      const spender_address = process.env.REACT_APP_ORDER_CONTRACT
      approveSetup( 'metamask', '0x56927Cb02919Ad5BB6dE10caC32619BB3AE5b3c9', spender_address, 1).then(v => console.log(v))
    }
    return (  <React.Fragment>
        <Box sx={{
        width: '100%',
        // background: 'color(rec2020 0.32 0.43 0.62)',
        background: '#dc812a',
        height: '65px',
        // position: 'fixed',
        position: 'sticky',
        top: 0,
        zIndex: 9999
    }}>
        
       {/**
      <img src={logo} style={{ float:'left',  marginLeft: '20px', marginTop: '5px', cursor: 'pointer' }} 
        onClick={() => connectNetwork()} height={'60px'} width={'120px'}></img>
      */} 

      
      <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            sx={{
                margin: '15px',
                float: 'right',
                background: 'none',
                boxShadow: 'none'
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
          <Typography sx={{color: 'white', mr: 2}}>{props.user.user.username}</Typography>
            <Avatar sx={{ width: 32, height: 32 }}>{`${props.user.user.username[0]}`.toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            zIndex: 9999,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
            handleClose()
            props.user.signOut()
        }} sx={{
            zIndex: 9999
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Button variant="contained" onClick={submit} style={{width:"15%",height:'60%', position:'absolute',top:'1rem',right:'15rem', background:'none', boxShadow:'none', fontWeight:'600'}}>Connect Wallet</Button>
    </Box>
    {  /* <Box sx={{ flexGrow: 1 }} className="nav-bar-box" >
      <AppBar position="static" style={{ backgroundColor: "#A3EEFF", padding: '10px'  }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
       <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div className="header-logo">
                 
                    <Button variant="contained" onClick={submit} style={{width:"15%",height:'60%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>Connect Wallet</Button>
                    <Button variant="contained" onClick={readData} style={{width:"15%",height:'60%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>READ</Button>
                    <Button variant="contained" onClick={approve} style={{width:"15%",height:'60%', position:'absolute',top:'1rem',right:'1rem', fontWeight:'600'}}>Approve</Button>
            </div>
          </Box> 
        </Toolbar>
      </AppBar>
    </Box>*/} 
    </React.Fragment>
    )
}

// To make those two function works register it using connect
export default Header;