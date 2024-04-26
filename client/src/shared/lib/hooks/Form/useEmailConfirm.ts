import axios from 'axios';

interface IData {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    input5: string;
}

export async function useEmailConfirm(data: IData): Promise<void | string> {
    try {
        const response = await axios.post('https://spark-admin-production.up.railway.app/api/auth/verify', data);
        console.log('Data created:', response.data);
        window.location.href = '/websites';


    } catch (error: unknown | any) {
        console.error('Failed to create data:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
