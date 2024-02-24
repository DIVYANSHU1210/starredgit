import {call, put, takeEvery} from 'redux-saga/effects';
import { getRepoFailure, getRepoSucces } from './repoState';

function* workGetReposFetch(action){
    try{
        const repos = yield call(()=> fetch(`https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc&page=${action.payload}`));
        const formattedRepos = yield repos.json();
        yield put(getRepoSucces(formattedRepos));
    }
    catch (error){
        yield put (getRepoFailure());
    }

}

function* repoSaga(){
    yield takeEvery('repos/getReposFetch', workGetReposFetch);
}

export default repoSaga;