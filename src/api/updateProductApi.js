import cnf from '../config'
import axios from 'axios'

export const updateProductApi = async (params) => {

    console.log("params", params);

    const response = await axios({
        method: 'post',
        url: `${cnf.api.base_url}product/update`,
        data: params,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    return response
}

export default updateProductApi