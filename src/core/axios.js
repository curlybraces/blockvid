import axios from 'axios'

const endpoint = "http://matness.it/api/v1/blockvid/";

const axiosClient = axios.create({
    baseURL: endpoint
});

export default axiosClient