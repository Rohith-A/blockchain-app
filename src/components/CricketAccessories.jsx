/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { allExpenditures, getSavingsTarget, resetChartData } from '../actions/actions';
import {cricketData} from '../data/cricket'
// import * as Productimages from '../product-images/cricket'
// const images = require('../product-images/SG-ball.webp')
const CricketAccessories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const expendituresData = useSelector((state) => state.expenditures)
    const userDetails = useSelector((state) => state.user)
    const [sumofExpenses, setSumOfExpenses] = useState();

    //   const state = useSelector((state) => state)
    useEffect(() => {
        if (userDetails?.user) {
            dispatch(resetChartData())
            dispatch(getSavingsTarget({userName: userDetails.user.username}))
            dispatch(allExpenditures({userName: userDetails.user.username}))
        }
    }, [userDetails]);

    useEffect(() => {
        if(expendituresData && expendituresData.allExpenditure.length) {
        const totalExpens = expendituresData.allExpenditure.map((item) => Number(item.amount));
        const sum = totalExpens?.reduce((prev, next) => {
             return Number(prev) + Number(next)
            }
             );
             setSumOfExpenses(sum)
        }
    }, [expendituresData]);

    const setImage = (imgpath) => {
      try{
        const image = require(imgpath);
        return image;
      }catch(e) {
        console.log(e)
      }
    }
    return (
        <React.Fragment>
            <Grid container spacing={{ xs: 3, md: 5 }} columns={{ xs: 1, sm: 2, md: 9 }} >
            <Typography onClick={() => navigate('/')} variant="button" display="block"
            sx={{ cursor:'pointer', m:2, position:'absolute',float:'left', fontSize: '15px'}} gutterBottom>
           <Link >Home</Link> 
           </Typography>
            {cricketData.map((ele) => (
                <Grid item xs={1} sm={1} md={3} key={ele.name}>
                <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '100%' }} raised  onClick={() => navigate('/expenditures')}>
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
        sx={{
          width: '50%',
          color: 'white',
          background: '#dd812b',
          border: '0.5px solid grey'
        }}
        >
          Buy with cash
        </Button>
        <Button size="small" color="primary"  sx={{
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
        </React.Fragment>
    )
}

// To make those two function works register it using connect
export default CricketAccessories;