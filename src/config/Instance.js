import axios from 'axios';


const Instance = axios.create(
    { 
        baseURL : 'http://virtualtechnology.in/medcare-admin/Api',
    }
)

export default Instance;