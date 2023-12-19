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
            <Grid container spacing={{ xs: 3, md: 10 }} columns={{ xs: 1, sm: 2, md: 6 }}>
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
          <Typography variant="body1" color="text.secondary">
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
          <Typography variant="bod12" color="text.secondary">
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
            Price ETH: 0.22
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
      Book with cash
      </Button>
      <Button size="small" color="primary"  sx={{
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
            Price ETH: 0.22
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
        Book with cash
      </Button>
      <Button size="small" color="primary"  sx={{
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
        </React.Fragment>
    )
}

// To make those two function works register it using connect
export default Dashboard;