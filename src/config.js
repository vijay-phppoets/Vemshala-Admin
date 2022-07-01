const cnf = {
    api: {
        base_url: "http://65.1.76.185/api/",
    },
    // s3_base_url: "https://piky.s3.ap-south-1.amazonaws.com/",
    s3_base_url: "https://vemshala-gallery.s3.ap-south-1.amazonaws.com/", // new s3 bucket
    domain: "http://vemastore.com/",
    tinyKey: "ttsmwue3os1saqfv35rgby36y5c207v31hpuyqtbpoffrm0l"
}

if (process.env.REACT_APP_ENV === "production") {
    cnf.api.base_url = "http://api.vemastore.com/"
}
export default cnf;