const awsconfig = {
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//        identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        
        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
//        identityPoolRegion: 'eu-west-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-2_iY09Irg1E',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '2rqriamrfr66plh7l7arbs3bob',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'd3ml0ura1sl5yw.cloudfront.net' ,
//            domain: domain,
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: false
        },

        // OPTIONAL - customized storage object
//        storage: new MyStorage(),
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
} ;

module.exports = awsconfig ;
