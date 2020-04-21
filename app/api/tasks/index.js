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
    const data = {ID:termId};

    let apiUrl = baseUrl + 'DailyOperations/GetOptions.php';

    return await axios.get(apiUrl, {params: data});
  },

  submitDecesion : async (expertId, termId, choice, comment) => {
    let formdata = new FormData();
    const data = {expertId, termId, choice, writtenComment: comment, voiceComment: ''};
    const keys = Object.keys(data);
    keys.map(key => formdata.append(key, data[key]));

    let apiUrl = baseUrl + 'DailyOperations/ProcessDecision.php';

    return await axios.post(apiUrl, 
      formdata
    );
  },

  getApproveOptions : async (termId, expertId) => {
    const data = {termId, expertId};

    let apiUrl = baseUrl + 'DailyOperations/GetApproveOptions.php';

    return await axios.get(apiUrl, {params: data});
  },

  setDefinition : async (expertId, sentenceIds, definitionIds) => {
    const data = { expertId, sentenceIds, definitionIds };

    let apiUrl = baseUrl + 'DailyOperations/SetDefinition.php';

    return await axios.get(apiUrl, {params: data});
  },

  addDefinition : async (termId, expertId, definition) => {
    const data = {termId, expertId, definition};

    let apiUrl = baseUrl + 'DailyOperations/AddDefinition.php';

    return await axios.get(apiUrl, {params: data});
  }
}