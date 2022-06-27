import cnf from '../src/config'

export const isLogin = () => {
    const PikyUserToken = localStorage.getItem('PikyUserToken')

    if (PikyUserToken) return true
    else return false
}

export const validateImageFile = (file) => {
    let ext
    if (file.type == "image/jpeg") ext = "jpeg"
    if (file.type == "image/png") ext = "png"
    if (file.type == "image/jpg") ext = "jpg"
    if (file.type == "image/webp") ext = "webp"

    if (ext) {
        return { status: true, ext: ext }
    } else {
        return { status: false }
    }
}

export const getUserToken = () => {
    return localStorage.getItem('PikyUserToken') || null
}

export const getS3SingedUrl = async (filename, ext, file) => {
    return new Promise((resolve, reject) => {
        fetch(`${cnf.api.base_url}get-singed-url-for-put?filename=${filename}&ext=${ext}`, {
            method: 'get',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${getUserToken()}`
            }
        }).then(res => {
            const result = res.json();
            return Promise.all([result]);
        }).then((result) => {
            resolve({ ['url']: result[0].url, ['filename']: `${filename}.${ext}` })
        }).catch(console.log)
    })
}