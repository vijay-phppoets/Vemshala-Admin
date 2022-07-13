import cnf from '../config'
import axios from 'axios'

export const getSalesExport = async (params) => {

    return await axios({
        method  : 'post',
        url     : `${cnf.api.base_url}home/sales-export`,
        data    : params,
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
}

export default getSalesExport