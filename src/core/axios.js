import axios from 'axios'

const endpoint = "http://localhost:8000/api/v1/blockvid/";

const axiosClient = axios.create({
    baseURL: endpoint
});

export default axiosClient