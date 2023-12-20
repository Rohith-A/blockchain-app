/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductForBuying, showLoader } from '../actions/actions';
import { cricketData } from '../data/cricket';
import { addOrderSetup, approveSetup } from '../utils/connectContract';
// import * as Productimages from '../product-images/cricket'
// const images = require('../product-images/SG-ball.webp')
const CricketAccessories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const walletData = useSelector(state => state.wallet)
  const loader = useSelector(state => state.showLoader)
  const [progress, setProgress] = useState(false);
  const [product, setProduct] = useState({});
  //   const state = useSelector((state) => state)
  const handleClickOpen = (prd) => {
    setOpen(true);
    setProduct(prd)
  };
  const submit = (product) => {
    addOrderSetup('metamask', walletData, product.id, product.name, product.desc, product.price).then(v => {
      console.log(v)
      showLoader(false)
      setProgress(false)
      alert(`Your booking for ${product.name} is successful`)
    }
    )
  }
  useEffect(() => {
    setProgress(loader)
  }, [loader])
  const handleClose = () => {
    setOpen(false);
  };
  const approve = (product) => {
    showLoader(true)
    setProgress(true)
    const spender_address = process.env.REACT_APP_ORDER_CONTRACT
    approveSetup('metamask', walletData, spender_address, product.price).then(v =>
      submit(product)
    )
  }
  return (
    <React.Fragment>
      {progress && (<Box sx={{ width: '100%', m: 6 }}><LinearProgress /></Box>)}
      <Grid container spacing={{ xs: 3, md: 5 }} columns={{ xs: 1, sm: 2, md: 9 }} >

        {cricketData.map((ele) => (
          <Grid item xs={1} sm={1} md={3} key={ele.name}>
            <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '100%' }} raised  >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="400"
                  image={ele.img}
                  // image={images}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {ele.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {ele.description}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Price: {ele.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Price ETH: {ele.ETHprice}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{
                width: '100%',
                // background: '#e6791440',
                float: 'right',
                padding: '20px'
              }}>
                <Button size="small" color="primary"
                  onClick={() => {
                    dispatch(setProductForBuying({
                      image: ele.img,
                      price: ele.price.split('€')[1], name: ele.name, desc: ele.description
                    }))
                    navigate('/cashCheckout')
                  }
                  }
                  sx={{
                    width: '50%',
                    color: 'white',
                    background: '#dd812b',
                    border: '0.5px solid grey'
                  }}
                >
                  Buy with cash
                </Button>
                <Button size="small" color="primary"
                  onClick={() => { handleClickOpen(ele) }}
                  sx={{
                    width: '50%',
                    color: 'white',
                    background: '#477ac6',
                    border: '0.5px solid grey'
                  }}>
                  Buy with ETH
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Pay with Ether"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be redirected to wallet for payment. Would you like to proceed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button onClick={() => {
            approve({
              name: product.name,
              desc: product.description,
              id: Math.floor(Math.random() * 10000),
              price: product.ETHprice
            })
            handleClose()
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

// To make those two function works register it using connect
export default CricketAccessories;