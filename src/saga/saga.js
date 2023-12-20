import {
  put,
  call,
  // takeLatest,
  takeEvery
} from 'redux-saga/effects'

import * as actionTypes from '../actionTypes/actionTypes'

import { deleteAxios, getAxios, postAxios } from '../api/api';

const apiHost = process.env.REACT_APP_API_HOST;
// const loaclapiHost = process.env.REACT_APP_LOCAL_API_HOST;
console.log(process.env)



export default function* rootSaga() {
}