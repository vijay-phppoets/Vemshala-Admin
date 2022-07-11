const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    mobileXL: '500px',
    tablet: '768px',
    laptopS: '930px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const theme = {
    device: {
        mobileS: `(max-width: ${size.mobileS})`,
        mobileM: `(max-width: ${size.mobileM})`,
        mobileL: `(max-width: ${size.mobileL})`,
        mobileXL: `(max-width: ${size.mobileXL})`,
        tablet: `(max-width: ${size.tablet})`,
        laptopS: `(max-width: ${size.laptopS})`,
        laptop: `(max-width: ${size.laptop})`,
        laptopL: `(max-width: ${size.laptopL})`,
        desktop: `(max-width: ${size.desktop})`,
        desktopL: `(max-width: ${size.desktop})`
    },
    colors: {
        primary: "#5b0c1c",
        black: "#000"
    },

}

export default theme