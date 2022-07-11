import cnf from '../config'
import axios from 'axios'

export const getDashboardDetails = async (params) => {

    return await axios({
        method  : 'post',
        url     : `${cnf.api.base_url}home/dashboard-details`,
        data    : params,
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
}

export default getDashboardDetails