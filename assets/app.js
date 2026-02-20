(async () => {
    const signingKey = "taketwo1234567890"

    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '120px' });

    const { currentAccount } = await client.get('currentAccount');
    console.log("account : ", currentAccount)

    const { currentUser } = await client.get('currentUser');
    console.log("current user : ", currentUser)

    const options = {
        url: "https://z3najo.ngrok.dev/demos/taketwo",
        type: "POST",
        headers: {
            Authorization: "Bearer {{jwt.token}}",
            //CustomHeader: "test1234567890",
            //CustomHeader2: currentUser.name + " - " + currentUser.email
        },
        jwt: {
            algorithm: "HS256",
            secret_key: "{{setting.shared_secret}}",
            expiry: 3600,
            claims: {
                jti: Math.random().toString(36).substring(2), // Unique identifier for the token
                iss: currentAccount.subdomain,
                userName: currentUser.name,
                userEmail: currentUser.email
            },
        },
        secure: true,
    };

    console.log("options : ", options)
    client.request(options).then((response) => {
        console.log(response);
    })
})();