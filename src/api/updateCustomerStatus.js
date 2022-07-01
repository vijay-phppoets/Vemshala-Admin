import cnf from '../config'
import axios from 'axios'

export const updateStatus = async (params) => {

    return await axios({
        method  : 'post',
        url     : `${cnf.api.base_url}customer/update-status`,
        data    : params,
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
}

export default updateStatus