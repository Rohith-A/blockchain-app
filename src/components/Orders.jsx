import { Box, Card, CardContent, CardHeader, Divider, LinearProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ordersByAddressData } from '../actions/actions';
import { getOrderDetailsbyAddress } from '../utils/connectContract';


const OrdersDetails = (props) => {
  const dispatch = useDispatch();
  const walletData = useSelector(state => state.wallet)
  const ordersDetailsByAddress = useSelector(state => state.orders)
  const showloader = useSelector((state) => state.loader)
  const showCategoryLoader = useSelector((state) => state.categoryLoader)
  const [error, setError] = useState({})
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    if(walletData) {
      getOrderDetailsbyAddress( 'metamask', walletData).then(v => {
        console.log(v)
        dispatch(ordersByAddressData(v))
      })
    }
  }, [walletData]);
  useEffect(() => {
    if(ordersDetailsByAddress?.length) {
      const paypalOrder = localStorage.getItem('paypalOrder')
      if(paypalOrder) {
        setAllOrders([...ordersDetailsByAddress, ...JSON.parse(localStorage.paypalOrder)])
      }
    }
  }, [ordersDetailsByAddress]);

  const setOrderData = () => {

  }
  return (
    <React.Fragment>
      <Card sx={{ width: '100%' }} raised >
        <CardHeader
          titleTypographyProps={{
            fontSize: 26,
            fontWeight: 600
          }}
          title="Order Details"
        >

        </CardHeader>
        <CardContent>

          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }}>
            {(showloader || showCategoryLoader) ? (<Box sx={{ width: '100%', m: 2 }}><LinearProgress /></Box>) : (
              allOrders?.map((v) => 
                (
                  <React.Fragment>
                  <Grid item xs={1} sm={1} md={4}>
                  <Typography variant="h6" display="block" sx={{textAlign: 'right'}} gutterBottom>
                    Order Id :
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={8}>
                <Typography variant="h6" display="block" sx={{}} gutterBottom>
                {v.id}
              </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={4}>
                  <Typography variant="h6" display="block" sx={{textAlign: 'right'}} gutterBottom>
                    Product :
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={8}>
                <Typography variant="h6" display="block" sx={{}} gutterBottom>
                {v.name}
              </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={4}>
                  <Typography variant="h6" display="block" sx={{textAlign: 'right'}} gutterBottom>
                    Price :
                  </Typography>        
                  </Grid>
                <Grid item xs={1} sm={1} md={8}>
                <Typography variant="h6" display="block" sx={{}} gutterBottom>
                €{v.price}
              </Typography>   
                </Grid>

                <Grid item xs={1} sm={1} md={4}>
                  <Typography variant="h6" display="block" gutterBottom sx={{textAlign: 'right'}}>
                    Description :
                  </Typography>   
                  </Grid>
                <Grid item xs={1} sm={1} md={8}>
                <Typography variant="h6" display="block" gutterBottom >
                {v.desc}
              </Typography> 

                </Grid>
                <Divider variant="middle" sx={{width: '100%', mb: 10}}/>
              </React.Fragment>
  ))
            )}

          </Grid>

        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default OrdersDetails;