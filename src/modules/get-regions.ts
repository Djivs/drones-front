import {Region} from './ds'
import axios from 'axios';

export const getRegions = async (namePattern = '', status='') : Promise<Region[]> => {
    return axios.get('/api/regions?name_pattern=' + String(namePattern) + '&status=' + String(status))
        .then((response) => response.json())
        .catch(() => ([
            {
                "ID": 1,
                "District": "",
                "Name": "тест1",
                "Details": "",
                "Status": "Действует",
                "AreaKm": 0,
                "Population": 0,
                "HeadName": "",
                "HeadEmail": "",
                "HeadPhone": "",
                "AverageHeightM": 0,
                "Image": ""
            },
            {
                "ID": 2,
                "District": "",
                "Name": "тест2",
                "Details": "",
                "Status": "Действует",
                "AreaKm": 0,
                "Population": 0,
                "HeadName": "",
                "HeadEmail": "",
                "HeadPhone": "",
                "AverageHeightM": 0,
                "Image": ""
            },
            {
                "ID": 3,
                "District": "",
                "Name": "тест3",
                "Details": "",
                "Status": "Действует",
                "AreaKm": 0,
                "Population": 0,
                "HeadName": "",
                "HeadEmail": "",
                "HeadPhone": "",
                "AverageHeightM": 0,
                "Image": ""
            },
        ]));
}