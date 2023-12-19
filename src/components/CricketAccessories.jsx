/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allExpenditures, getSavingsTarget, resetChartData } from '../actions/actions';
import cricketData from '../data/cricket.json'

const images = require('../product-images/SG-ball.webp')
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
        const image = require(imgpath);
        return image;
    }
    return (
        <React.Fragment>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 9 }}>

            {cricketData.map((ele) => (
                <Grid item xs={1} sm={1} md={3}>
                <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '45vh' }} raised  onClick={() => navigate('/expenditures')}>
            <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={ele.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ele.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ele.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ele.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ele.ETHprice}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button size="small" color="primary">
          Buy
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