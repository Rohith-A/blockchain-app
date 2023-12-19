import { Autocomplete, Box, Button, Card, CardContent, CardHeader, LinearProgress, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../actionTypes/actionTypes';
import { loader } from '../actions/actions';


const AddExpenditures = (props) => {
  const userDetails = props.user
  const dispatch = useDispatch();
  const [, setCategory] = useState({
  })
  const [expenditureDetails, setExpenditureDetails] = useState({
    category: '',
    amount: '',
    date: '',
  })
  const state = useSelector((state) => state)
  const showloader = useSelector((state) => state.loader)
  const showCategoryLoader = useSelector((state) => state.categoryLoader)


  const [error, setError] = useState({})

  const validate = () => {
    const errObj = {}
    if (!expenditureDetails.category) {
      errObj.category = true;
    }
    if (!expenditureDetails.amount) {
      errObj.amount = true;
    }
    if (!expenditureDetails.date) {
      errObj.date = true;
    }
    setError(errObj);
    return errObj;
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_CATGORIES_API
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addExpenditure = () => {
    if (!Object.keys(validate()).length) {
      dispatch(loader(true))
      const payload = expenditureDetails;
      payload.userName = userDetails.user.username
      dispatch({
        type: actionTypes.ADD_EXPENDITURES_API,
        payload: payload
      })
    }
  }
  return (
    <React.Fragment>
      <Card sx={{ width: '100%' }} raised >
        <CardHeader
          titleTypographyProps={{
            fontSize: 17,
          }}
          title="Add expenditure"
        >

        </CardHeader>
        <CardContent>

          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }}>
            {(showloader || showCategoryLoader) ? (<Box sx={{ width: '100%', m: 2 }}><LinearProgress /></Box>) : (
              <React.Fragment>
                <Grid item xs={1} sm={1} md={3}>
                  <Typography variant="button" display="block" sx={{}} gutterBottom>
                    Category:
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={8}>
                  {state.categories && state.categories.categoryOptions && (
                    <Autocomplete
                      disablePortal
                      size='small'
                      options={state.categories.categoryOptions || []}
                      getOptionLabel={(option) => option?.label || ''}

                      onChange={(e, value) => {
                        setExpenditureDetails({ ...expenditureDetails, category: value?.value })
                        setCategory(value);
                      }
                      }
                      renderInput={(params) => <TextField  {...(error.category && ({
                        error: true,
                        helperText: "Please fill this field"
                      }))} {...params} label="Category" />}
                    />
                  )}

                </Grid>
                <Grid item xs={1} sm={1} md={3}>
                  <Typography variant="button" display="block" sx={{}} gutterBottom>
                    Amount
                  </Typography>        </Grid>
                <Grid item xs={1} sm={1} md={8}>
                  <TextField
                    required
                    type='number'
                    size='small'
                    fullWidth
                    {...(error.amount && ({
                      error,
                      helperText: "Please fill this field"
                    }))}
                    value={expenditureDetails.empId}
                    onChange={(e) => setExpenditureDetails({ ...expenditureDetails, amount: e.target.value })}
                    id="outlined-required"
                    label="Required"
                  />
                </Grid>

                <Grid item xs={1} sm={1} md={3}>
                  <Typography variant="button" display="block" gutterBottom >
                    Date
                  </Typography>        </Grid>
                <Grid item xs={1} sm={1} md={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{
                      width: '100%'
                    }}
                      slotProps={{
                        textField: {
                          ...(error.date && ({
                            error,
                            helperText: "Please fill this field"
                          }))
                        },
                      }}
                      onChange={(e) => setExpenditureDetails({ ...expenditureDetails, date: new Date(e.$d).toLocaleDateString() })} />
                  </LocalizationProvider>

                </Grid>
                <Grid item xs={1} sm={1} md={3}></Grid>
                <Grid item xs={1} sm={1} md={7}>
                  <Button variant="contained"
                    fullWidth
                    onClick={() => addExpenditure()}
                    sx={{ mt: 1, background: 'color(rec2020 0.32 0.43 0.62)' }}>ADD EXPENDITURE</Button>
                </Grid>
              </React.Fragment>
            )}

          </Grid>

        </CardContent>
      </Card>
    </React.Fragment>
  )
}

// To make those two function works register it using connect
export default AddExpenditures;