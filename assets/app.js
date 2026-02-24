(async () => {
    const signingKey = "taketwo1234567890"

    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '120px' });

    const { currentAccount } = await client.get('currentAccount');
    console.log("account : ", currentAccount)

    const { currentUser } = await client.get('currentUser');
    console.log("current user : ", currentUser)

    /*
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
    */

    const auth = `Bearer ` + btoa(JSON.stringify({
        algorithm: "HS256",
        secret_key: "{{setting.shared_secret}}",
        expiry: 3600,
        claims: {
            jti: Math.random().toString(36).substring(2), // Unique identifier for the token
            iss: currentAccount.subdomain,
            userName: currentUser.name,
            userEmail: currentUser.email
        },
    }));
    console.log("auth : ", auth)
    const auth2 = `Bearer ` + btoa(JSON.stringify({
        algorithm: "HS256",
        secret_key: signingKey,
        expiry: 3600,
        claims: {
            jti: Math.random().toString(36).substring(2), // Unique identifier for the token
            iss: currentAccount.subdomain,
            userName: currentUser.name,
            userEmail: currentUser.email
        },
    }));
    console.log("auth2 : ", auth2)

    const options = {
        url: "https://z3najo.ngrok.dev/demos/taketwo",
        type: "POST",
        headers: {
            Authorization: auth,
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

    const option2 = {
        url: "https://z3najo.ngrok.dev/demos/taketwo",
        type: "POST",
        headers: {
            Authorization: auth,
            auth2: auth2
            //CustomHeader2: currentUser.name + " - " + currentUser.email
        }
    };

    console.log("options : ", options)
    client.request(options).then((response) => {
        console.log("options1", response);
    })

    client.request(option2).then((response) => {
        console.log("options2", response);
    })
})();