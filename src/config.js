const cnf = {
    api: {
        base_url: "http://65.1.76.185/api/",
    },
    // s3_base_url: "https://piky.s3.ap-south-1.amazonaws.com/",
    s3_base_url: "https://vemshala-gallery.s3.ap-south-1.amazonaws.com/", // new s3 bucket
    domain: "http://65.1.76.185/",
    tinyKey: "B5KlIHhZw/Exk4PZpgt9kA/CNeyQ25eImjnlpia0"
}

if (process.env.REACT_APP_ENV === "production") {
    cnf.api.base_url = "http://65.1.76.185/api/"
}
export default cnf;