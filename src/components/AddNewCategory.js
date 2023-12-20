/* eslint-disable react-hooks/exhaustive-deps */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, LinearProgress, TextField, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../actionTypes/actionTypes';
import { addNewCategory, categoryloader } from '../actions/actions';


const AddnewCategory = () => {
  // const userDetails = props.user
  const dispatch = useDispatch();
  // const [category, setCategory] = useState({
  // })
  const [newCategory, setnewCategory] = useState({
    name: ''
  })
  // const state = useSelector((state) => state)
  const showCategoryLoader = useSelector((state) => state.categoryLoader)
  const [error, setError] = useState(false);
  useEffect(() => {
    dispatch({
      type: actionTypes.GET_CATGORIES_API
    })
  }, [])

  const addCategory = () => {
    // dispatch(categoryloader(true));
    setError(false);
    dispatch(addNewCategory(
        newCategory
   ))
  }
  return (
    <React.Fragment>
      <Card sx={{ width: '100%', mt: 3, mb: 8 }} raised >
      
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          sx={{borderBottom: '1px solid #c1c1c1'}}
        >
        <Typography >Add new category</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{mt: 1}}>
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }}>
          {showCategoryLoader ? (<Box sx={{width: '100%', m: 2}}><LinearProgress /></Box>) :
          (<React.Fragment>
            <Grid item xs={1} sm={1} md={3}>
                <Typography variant="button" display="block" sx={{ margin: '10px 10px 10px 0px' }} gutterBottom>
                  Category
                </Typography>        </Grid>
              <Grid item xs={1} sm={1} md={8}>
                <TextField
                  required
                  fullWidth
                  size='small'
                  {...(error && ( {
                    error,
                    helperText: "Please fill this field"
                  }))}
                  onChange={(e) => setnewCategory({ ...newCategory, name: e.target.value })}
                  id="outlined-required"
                  label="Required"
                />
              </Grid>

              <Grid item xs={1} sm={1} md={3}></Grid>
                <Grid item xs={1} sm={1} md={7}>
              <Button variant="contained"
                fullWidth
                onClick={() => {
                    if(newCategory && newCategory.name) {
                    addCategory()
                    } else {
                        setError(true)
                    }
                }}
                sx={{ mt: 1, mb: 2, background: 'color(rec2020 0.32 0.43 0.62)' }}>ADD CATEGORY</Button>
                </Grid>
            </React.Fragment>)}
              
            </Grid>
        </AccordionDetails>
        </Accordion>
      </Card>
    </React.Fragment>
  )
}

// To make those two function works register it using connect
export default AddnewCategory;