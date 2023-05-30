//handle việc call API

import axios from 'axios';

export const getPostData = () => {
    return axios.post('https://8ebe-222-252-17-200.ngrok-free.app/api/auth/login');
}

// Sử dụng một HTTP client dựa trên promise để call API đó là Axios