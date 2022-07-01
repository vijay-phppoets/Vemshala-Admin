import cnf from '../config'
import axios from 'axios'

export const sendEmail = async (params) => {

    return await axios({
        method  : 'post',
        url     : `${cnf.api.base_url}customer/send-email`,
        data    : params,
        headers : {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
}

export default sendEmail