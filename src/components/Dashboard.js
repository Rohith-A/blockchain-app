/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allExpenditures, getSavingsTarget, resetChartData } from '../actions/actions';

const cricket = require('../product-images/cricket-clipart-xl.png')
const football = require('../product-images/football.png')
const rugby = require('../product-images/american-football-clipart-xl.png')
const turf = require('../product-images/turf.avif')
const footBallturf = require('../product-images/football-turf.jpeg')
const Dashboard = () => {
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

    return (
        <React.Fragment>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 9 }}>
                <Grid item xs={1} sm={1} md={3}>
                <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '45vh' }} raised  onClick={() => navigate('/CricketAccessories')}>
            <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={cricket}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cricket
          </Typography>
          <Typography variant="body2" color="text.secondary">
            click view to Purchase Cricket accessories
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
            </Card>
            </Grid>
            <Grid item xs={1} sm={1} md={3}>
            <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '45vh' }} raised  onClick={() => navigate('/expenditures')}>
            <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={football}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Football
          </Typography>
          <Typography variant="body2" color="text.secondary">
          click view to Purchase Football accessories
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
            </Card>
        </Grid>
            <Grid item xs={1} sm={1} md={3}>
            <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '45vh' }} raised  onClick={() => navigate('/expenditures')}>
            <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          width="50"
          image={rugby}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Rugby
          </Typography>
          <Typography variant="body2" color="text.secondary">
          click view to Purchase Rugby accessories
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
            </Card>
        </Grid>
            <Grid item xs={1} sm={1} md={3}>
            <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '45vh' }} raised  onClick={() => navigate('/expenditures')}>
            <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          width="50"
          image={turf}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Book cricket Turf
          </Typography>
          <Typography variant="body2" color="text.secondary">
          click view to Book Cricket turf accessories
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
            </Card>
        </Grid>
            <Grid item xs={1} sm={1} md={3}>
            <Card sx={{ width: '100%', mt: 2, mb: 1, cursor: 'pointer', height: '45vh' }} raised  onClick={() => navigate('/expenditures')}>
            <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          width="50"
          image={footBallturf}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Book football Turf
          </Typography>
          <Typography variant="body2" color="text.secondary">
          click view to Book Football turf accessories
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
            </Card>
        </Grid>
            </Grid>
        </React.Fragment>
    )
}

// To make those two function works register it using connect
export default Dashboard;