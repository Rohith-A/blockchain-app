/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, CardHeader, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import { cheerfulFiestaPaletteLight } from '@mui/x-charts/colorPalettes';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchChartData, getSavingsTarget, loader } from '../actions/actions';

const Analytics = (props) => {
    const dispatch = useDispatch();
    const chartData = useSelector((state) => state.chartData);
    const userDetails = useSelector((state) => state.user)
    const savingsTargetInfo = useSelector((state) => state.savingsTargetInfo)
    const [showAllData, setShowAllData] = useState();
    const [parsedChartData, setparsedChartData] = useState();
    const showloader = useSelector((state) => state.loader)
    const navigate = useNavigate();

    useEffect(() => {
        if(userDetails && userDetails.user) {
        dispatch(fetchChartData({userName: userDetails.user.username}));
        dispatch(getSavingsTarget({userName: userDetails.user.username}))
        }
    }, [userDetails])
    useEffect(() => {            dispatch(loader(true))
    }, [])
    useEffect(() => {
        if(chartData) {
            const data = chartData;
            const chartKeys = Object.keys(data || {});
            const parsedData = [];
            const tableData = [];
            chartKeys.forEach((key) => {
                const {id, value, name: label} = data[key] 
                parsedData.push({
                   id,
                   value: Number(value),
                   label
                })
                tableData.push({
                    id,
                    category: label,
                    amount: Number(value)
                })
            })
            setShowAllData([{id: parsedData?.length+1, amount: Number(savingsTargetInfo?.income), category: 'Income'}, ...tableData]);
            setparsedChartData([...parsedData, {id: parsedData?.length+1, value: Number(savingsTargetInfo?.income), label: 'Income'}]);
        }
    }, [chartData, savingsTargetInfo?.income])

    return (
        <React.Fragment>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 12 }}>

                          
                <Grid item xs={1} sm={1} md={6}>
                    <Card sx={{ width: '100%', mt: 3, cursor: 'pointer',  height:"70vh"}} raised >
                    <Typography onClick={() => navigate('/')} variant="button" display="block"
           sx={{ cursor:'pointer', m:2, position:'absolute',float:'left', fontSize: '15px'}} gutterBottom>
          <Link >Home</Link> 
          </Typography>
                        <CardHeader title="Analysis" sx={{borderBottom: '1px solid #c1c1c1'}}/>
                        {!showloader ? (<CardContent sx={{display: 'flex'}}>
                       
                        <PieChart
                        margin={{  left: 50}}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 1,
                            itemMarkWidth: 3,
                            itemMarkHeight:10,
                            labelStyle: {
                                fontSize: '10px'
                            }
                          },
                        }}
                        colors={cheerfulFiestaPaletteLight}
                          series={[
                            {
                              data: parsedChartData || [],
                              innerRadius: 50,
                        //   outerRadius: 100,
                          paddingAngle: 0,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 360,
                          highlightScope: { faded: 'global', highlighted: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                          ]}
                          
                          width={400}
                          height={400}
                        />
                        </CardContent>) : 
                        ( <CircularProgress sx={{width: '100%', m:15}} />)}
                    </Card>

                </Grid>

                <Grid item xs={1} sm={1} md={6}>
                <Card sx={{ width: '100%', mt: 3, mb: 5, cursor: 'pointer', height:"70vh" }} raised >
                    <CardHeader title="Details" sx={{borderBottom: '1px solid #c1c1c1'}} />
                    {!showloader ? (
                    <CardContent>
                    <DataGrid
                rows={showAllData || []}
                columns={[
                    { field: 'category', headerName: 'CATEGORY', width: 200, headerClassName: 'header-column', flex: 1 },
                    { field: 'amount', headerName: 'AMOUNT', width: 200, headerClassName: 'header-column', flex: 1 }
                
                ]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                sx={{
                  height: '60vh'
                }}
                // checkboxSelection
                pageSizeOptions={[5]}
              />
                </CardContent>) :(<CircularProgress sx={{width: '100%', m:15}} />)}
                </Card>
            </Grid>
            </Grid>
        </React.Fragment>
    )
}

// To make those two function works register it using connect
export default Analytics;