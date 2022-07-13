import cnf from '../config'
import axios from 'axios'

export const saveCouponsApi = async (params) => {

    return await axios({
        method  : 'post',
        url     : `${cnf.api.base_url}coupons/save`,
        data    : params,
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
}

export default saveCouponsApi