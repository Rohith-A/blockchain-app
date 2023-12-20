/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductForBuying, showLoader } from '../actions/actions';
import { addOrderSetup, approveSetup } from '../utils/connectContract';

const cricket = require('../product-images/cricket-clipart-xl.png')
const football = require('../product-images/football.png')
// const rugby = require('../product-images/american-football-clipart-xl.png')
const turf = require('../product-images/turf.avif')
const footBallturf = require('../product-images/football-turf.jpeg')
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const walletData = useSelector(state => state.wallet)
  const loader = useSelector(state => state.showLoader)
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState({});
  const handleClickOpen = (prd) => {
    setOpen(true);
    setProduct(prd)
  };
  const submit = (product) => {
    addOrderSetup('metamask', walletData, product.id, product.name, product.desc, product.price).then(v => {
      console.log(v)
      showLoader(false)
      alert(`Your booking for ${product.name} is successful`)
      setProgress(false)
    }
    )
  }
  useEffect(() => {
    setProgress(loader)
  }, [loader])
  const approve = (product) => {
    if(walletData) {
    showLoader(true)
    setProgress(true)
    const spender_address = process.env.REACT_APP_ORDER_CONTRACT
    approveSetup('metamask', walletData, spender_address, product.price).then(v =>
      submit(product)
    )
    } else {
      alert('Please connect to wallet')
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  // useEffect(() => {readData()}, [])
  return (
    <React.Fragment>
      <Grid container spacing={{ xs: 3, md: 10 }} columns={{ xs: 1, sm: 2, md: 6 }}>
        {progress && (<Box sx={{ width: '100%', m: 5 }}><LinearProgress /></Box>)}

        <Grid item xs={1} sm={1} md={3}>
          <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '100%' }} raised  >
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image={cricket}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cricket
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  click view to Purchase Cricket accessories
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
                onClick={() => navigate('/CricketAccessories')}
                sx={{
                  width: '100%',
                  color: 'white',
                  background: '#dd812b',
                  border: '0.5px solid grey'
                }}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={1} sm={1} md={3}>
          <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '100%' }} raised  >
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image={football}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Football
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  click view to Purchase Football accessories
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
                onClick={() => navigate('/FootBallAccessories')}
                sx={{
                  width: '100%',
                  color: 'white',
                  background: '#dd812b',
                  border: '0.5px solid grey'
                }}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={1} sm={1} md={3}>
          <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '100%' }} raised  >
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                width="50"
                image={footBallturf}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Book football Turf
                </Typography>
                <Typography variant="bod12" color="text.secondary">
                  click view to Book Football turf accessories
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Price: €10
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Price ETH: 1
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
                sx={{
                  width: '50%',
                  color: 'white',
                  background: '#dd812b',
                  border: '0.5px solid grey'
                }}
                onClick={() => {
                  dispatch(setProductForBuying({ image: footBallturf, price: 10, name: 'Football Turf', desc: 'Football Turf' }))
                  navigate('/cashCheckout')
                }
                }
              >
                Book with cash
              </Button>
              <Button size="small" color="primary"
                onClick={() => {
                  handleClickOpen({
                    name: "Football Turf",
                    desc: "Football Turf",
                    id: Math.floor(Math.random() * 10000),
                    price: 1
                  })
                }}
                sx={{
                  width: '50%',
                  color: 'white',
                  background: '#477ac6',
                  border: '0.5px solid grey'
                }}>
                Book with ETH
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={1} sm={1} md={3}>
          <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '100%' }} raised >
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                width="50"
                image={turf}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Book cricket Turf
                </Typography>
                <Typography variant="bod12" color="text.secondary">
                  click view to Book Cricket turf accessories
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Price: €10
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Price ETH: 1
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
                  dispatch(setProductForBuying({ image: turf, price: 10, name: 'cricket Turf', desc: 'cricket Turf' }))
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
                Book with cash
              </Button>
              <Button size="small"
                onClick={() => {
                  handleClickOpen({
                    name: "Cricket Turf",
                    desc: "Cricket Turf",
                    id: Math.floor(Math.random() * 10000),
                    price: 1
                  })
                }}
                color="primary" sx={{
                  width: '50%',
                  color: 'white',
                  background: '#477ac6',
                  border: '0.5px solid grey'
                }}>
                Book with ETH
              </Button>
            </CardActions>
          </Card>
        </Grid>
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
              desc: product.desc,
              id: Math.floor(Math.random() * 10000),
              price: product.price
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
export default Dashboard;