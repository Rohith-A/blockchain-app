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

function* getCategory() {
  const url = `${apiHost}category`
  const categoriesData = yield call(getAxios, url)
  const options = categoriesData.data.Items.map((v) => ({
    label: v.name, value: v.name
  }))
  yield put({ type: actionTypes.GET_CATGORIES, payload: { categories: categoriesData.data.Items, categoryOptions: options } });
  yield put({ type: actionTypes.LOADER, payload: false });
}
// fetch all the instructions
function* getAllExpenditures(action) {
  const url = `${apiHost}expenditure/`
  const data = action.payload;
  const expenditureData = yield call(postAxios, url, data)
  yield put({ type: actionTypes.GET_ALL_EXPENDITURES, payload: expenditureData.data });
  yield put({ type: actionTypes.LOADER, payload: false });
}
function* getChartData(action) {
  const url = `${apiHost}expenditure/chartData`
  const data = action.payload;
  const chartData = yield call(postAxios, url, data)
  yield put({ type: actionTypes.CHART_DATA, payload: chartData.data });
  yield put({ type: actionTypes.LOADER, payload: false });
}

function* getTarget(action) {
  const url = `${apiHost}savingsTarget/`
  const data = action.payload;
  const targetData = yield call(postAxios, url, data)
  yield put({ type: actionTypes.SAVINGS_TARGET, payload: targetData.data?.Item });
  yield put({ type: actionTypes.LOADER, payload: false });
}

function* addExpenditure(action) {
  const url = `${apiHost}expenditure/addExpenditure`
  const data = action.payload;
  const newExpenditureData = yield call(postAxios, url, data)
  yield put({ type: actionTypes.ADD_EXPENDITURES, payload: newExpenditureData.data });
  yield put({ type: actionTypes.LOADER, payload: false });
}

function* addNewSavingsTarget(action) {
  const url = `${apiHost}savingsTarget/addSavingTarget`
  const data = action.payload;
  const newSavingsTargetData = yield call(postAxios, url, data)
  yield put({ type: actionTypes.ADD_NEW_SAVINGS_TARGET, payload: newSavingsTargetData.data?.Item })
  yield put({ type: actionTypes.LOADER, payload: false })
}

function* deletExpenditures(action) {
  const url = `${apiHost}expenditure/${action.payload.id}/${action.payload.userName}`
  yield call(deleteAxios, url)
  yield call(getAllExpenditures, action);
  yield put({ type: actionTypes.LOADER, payload: false })
}

function* addNewCategory(action) {
  const url = `${apiHost}category/addCategory/`
  const data = action.payload;
  const categoriesData = yield call(postAxios, url, data)
  const options = categoriesData.data.Items.map((v) => ({
    label: v.name, value: v.name
  }))
  yield put({
    type: actionTypes.GET_CATGORIES,
    payload: { categories: categoriesData.data.Items, categoryOptions: options }
  });
  yield put({ type: actionTypes.LOADER, payload: false });
  yield put({ type: actionTypes.CATEGORY_LOADER, payload: false });
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.GET_ALL_EXPENDITURES_API, getAllExpenditures)
  yield takeEvery(actionTypes.ADD_CATEGORY_API, addNewCategory)
  yield takeEvery(actionTypes.GET_CATGORIES_API, getCategory)
  yield takeEvery(actionTypes.ADD_EXPENDITURES_API, addExpenditure)
  yield takeEvery(actionTypes.ADD_NEW_SAVINGS_TARGET_API, addNewSavingsTarget)
  yield takeEvery(actionTypes.DELETE_EXPENDITURE_API, deletExpenditures)
  yield takeEvery(actionTypes.GET_SAVINGS_TARGET, getTarget)
  yield takeEvery(actionTypes.CHART_DATA_API, getChartData)
}