const config = {
    url: {
        dev: "http://localhost:8080",
        prod: "http://api.dueto.it.dh-karlsruhe.de",
    }
}


export const url = process.env.NODE_ENV === 'development' ? config.url.dev : config.url.prod