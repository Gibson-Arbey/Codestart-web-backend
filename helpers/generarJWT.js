const jwt = require('jsonwebtoken');


const generarJWT = async ( uid = '', exp_time = '168h' ) => {    
    return new Promise( (resolve, reject) => {
        const payload = {
            uid,

        };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: exp_time
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = {
    generarJWT,
}

