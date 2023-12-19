import { Button, Card, CardContent, CardHeader, LinearProgress, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../actionTypes/actionTypes';
import { addNewSavingsTarget, loader } from '../actions/actions';


const ChangeSavingsTarget = (props) => {
    const showloader = useSelector((state) => state.loader)
    const userDetails = props.userDetails
    const dispatch = useDispatch();
    const [newSavingsTarget, setNewSavingsTarget] = useState({

        income: '',
        targetSavings: ''
    })

    useEffect(() => {
        dispatch({
            type: actionTypes.GET_CATGORIES_API
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [error, setError] = useState({});

    const validate = () => {
        const errObj = {}
        if (!newSavingsTarget.income) {
          errObj.income = true;
        }
        if (!newSavingsTarget.targetSavings) {
          errObj.target = true;
        }
        setError(errObj);
        return errObj;
      };

    const addNewSavings = () => {
        if (!Object.keys(validate()).length) {
        dispatch(loader(true))
        let payload = { ...newSavingsTarget, userName: userDetails?.user?.username }
        dispatch(addNewSavingsTarget(payload))
        }
    }
    return (
        <React.Fragment>
            <Grid item xs={1} sm={1} md={3}>
                <Card sx={{ width: '100%', mt: 1, cursor: 'pointer', height: 'auto' }} raised  >

                    <CardHeader title={<Typography variant="button" display="block" gutterBottom>
                        Change Savings Target
                    </Typography>} />
                    {!showloader ? (<CardContent>

                        <Typography variant="button" display="block" gutterBottom>
                            Income
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            type='number'
                            size='small'
                            {...(error.income && ( {
                                error,
                                helperText: "Please fill this field"
                              }))}
                            onChange={(e) => setNewSavingsTarget({ ...newSavingsTarget, income: e.target.value })}
                            id="outlined-required"
                            label="Required"
                        />
                        <Typography variant="button" display="block" sx={{ margin: '10px 10px 10px 0px' }} gutterBottom>
                            Savings Target
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            type='number'

                            size='small'
                            {...(error.target && ( {
                                error,
                                helperText: "Please fill this field"
                              }))}
                            onChange={(e) => setNewSavingsTarget({ ...newSavingsTarget, targetSavings: e.target.value })}
                            id="outlined-required"
                            label="Required"
                        />
                        <Button variant="contained"
                            fullWidth
                            onClick={() => addNewSavings()}
                            sx={{ mt: 2, background: 'color(rec2020 0.32 0.43 0.62)' }}>SAVE TARGET</Button>
                    </CardContent>) : (
                        <LinearProgress />
                    )}
                </Card>
            </Grid>
        </React.Fragment>
    )
}

// To make those two function works register it using connect
export default ChangeSavingsTarget;