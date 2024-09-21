import axios from "axios";
import City from 'models/City';
import * as apiData from './apiData'

export const fetchCities = async () => {
    try {
        var response = await axios.get<City[]>(`${apiData.baseUrl}/cities/getall`);
        return response.data;
    } catch (e) {
        console.error(e);
    }    
}

export const addCity = async (city: City) => {
    try {
        var response = await axios.post(`${apiData.baseUrl}/cities/create`, city);           
        return response.status;
    } catch (e) {
        console.error(e);
    }    
}