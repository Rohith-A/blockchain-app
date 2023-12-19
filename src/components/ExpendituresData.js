/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../actionTypes/actionTypes'
import { Box, Button, Card, CardContent, CardHeader, Grid, LinearProgress, Link, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddExpenditures from './AddExpenditures'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AddnewCategory from './AddNewCategory';
import { deleteExpenditure, loader } from '../actions/actions';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
    display: 'none'
  },
  "& .MuiDataGrid-columnHeaderCheckbox": {
    backgroundColor: '#0f8ded30'
  },
  '& .header-column': {
    backgroundColor: '#0f8ded30'
  },
  '& .deleteButton:hover': {
    background: '#db6565'
  }
}));

const AllExpenditures = () => {
  const navigate = useNavigate();
  const columns = [
    { field: 'category', headerName: 'CATEGORY', width: 230, headerClassName: 'header-column', flex: 1 },
    {
      field: 'amount',
      headerName: 'AMOUNT',
      width: 150,
      headerClassName: 'header-column',
      editable: true,
      flex: 1
    },
    {
      field: 'date',
      headerName: 'SPENT DATE',
      headerClassName: 'header-column',
      width: 200,
      editable: true,
      flex: 1
    }
  ];
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const userDetails = useSelector((state) => state.user)
  const [allExpendituresData, setAllExpendituresData] = useState();
  const [selectionModel, setSelectionModel] = useState(); //added line
  const deleteRow = () => {
    dispatch(loader(true))
    dispatch(deleteExpenditure({id: selectionModel?.id, userName: userDetails.user.username}))
    setSelectionModel();
  }
  useEffect(() => {
    if (userDetails?.user) {
      dispatch({
        type: actionTypes.GET_ALL_EXPENDITURES_API,
        payload: {
          userName: userDetails.user.username
        }
      })
    }
  }, [userDetails]);
  const showloader = useSelector((state) => state.loader)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    setAllExpendituresData(state.expenditures?.allExpenditure)
  }, [state.expenditures])
  return (<React.Fragment>
    <React.Fragment>
    
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }}>
      
        <Grid item xs={1} sm={1} md={7}>
       
          <Card sx={{ width: '100%' }} raised>
          <Typography onClick={() => navigate('/')} variant="button" display="block"
           sx={{ cursor:'pointer', m:2, position:'absolute',float:'left', fontSize: '15px'}} gutterBottom>
          <Link >Home</Link> 
          </Typography>
            <CardHeader
              titleTypographyProps={{
                fontSize: 15,
              }}
              title="All Expenditures"
            >
            </CardHeader>

            <CardContent>
           
              {showloader && (<Box sx={{ width: '100%', m: 2 }}><LinearProgress /></Box>)}
              <StyledDataGrid
                rows={allExpendituresData || []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                sx={{
                  height: '60vh'
                }}
                selectionModel={selectionModel}
                // checkboxSelection
                pageSizeOptions={[5]}
                onRowClick={(ids) => {
                  console.log(ids)
                  setSelectionModel(ids.row)
                }
                }
              // onSelectionModelChange={(ids) => console.log(ids)}
              />
            </CardContent>
            {(selectionModel && selectionModel.id) && (<Box>
              <Button variant="contained"
              className='deleteButton'
                onClick={() => deleteRow()}
                sx={{ mt: 1, mb: 2, mr: 2, float: 'right', background: '#db6565', padding: '5px' }} color='error'>DELETE EXPENSE</Button>
            </Box>)}
          </Card>
        </Grid>
        <Grid item xs={5}>
          <AddExpenditures user={userDetails} />
          <AddnewCategory />
        </Grid>
      </Grid>
    </React.Fragment>

  </React.Fragment>)
}
export default AllExpenditures;