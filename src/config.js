const cnf = {
    api: {
        base_url: "http://localhost:9000/",
    },
    s3_base_url: "https://piky.s3.ap-south-1.amazonaws.com/",
    domain: "http://vemastore.com/",
    tinyKey: "ttsmwue3os1saqfv35rgby36y5c207v31hpuyqtbpoffrm0l"
}

if (process.env.REACT_APP_ENV === "production") {
    cnf.api.base_url = "http://api.vemastore.com/"
}
export default cnf;