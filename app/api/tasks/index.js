import baseUrl from '../baseUrl';
import axios from 'axios';

export default api = {
  getCount : async (expertId) => {
    let formdata = new FormData();
    const data = {expertId};
    const keys = Object.keys(data);
    keys.map(key => formdata.append(key, data[key]));

    let apiUrl = baseUrl + 'DailyOperations/GetCount.php';

    return await axios.post(apiUrl, 
      formdata
    );
  },

  getTasks : async (expertId) => {
    let formdata = new FormData();
    const data = {expertId};
    const keys = Object.keys(data);
    keys.map(key => formdata.append(key, data[key]));

    let apiUrl = baseUrl + 'DailyOperations/GetTasks.php';

    return await axios.post(apiUrl, 
      formdata
    );
  },

  getOptions : async (termId) => {
    // let formdata = new FormData();
    const data = {ID:termId};
    // const keys = Object.keys(data);
    // keys.map(key => formdata.append(key, data[key]));

    let apiUrl = baseUrl + 'DailyOperations/GetOptions.php';

    return await axios.get(apiUrl, {params: data});
  },

  submitDecesion : async (expertId, conflictId, choice, comment) => {
    let formdata = new FormData();
    const data = {expertId, conflictId, choice, writtenComment: comment, mVoiceComment: ''};
    const keys = Object.keys(data);
    keys.map(key => formdata.append(key, data[key]));

    let apiUrl = baseUrl + 'DailyOperations/ProcessDecision.php';

    return await axios.post(apiUrl, 
      formdata
    );
  }
}