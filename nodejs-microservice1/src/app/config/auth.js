export default {

    jwt: {
        secret: process.env.APP_SECRET || 'abcabc',
        expiresIn: '1d'
    }

}
