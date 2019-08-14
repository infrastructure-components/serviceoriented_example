import * as React from 'react';
import "@babel/polyfill";
import {
    callService,
    Environment,
    Middleware,
    Route,
    Service,
    ServiceOrientedApp
} from "infrastructure-components";



async function callMyService () {

    await callService(
        "myservice",
        {
            some: "data"
        },
        (data: any) => {
            console.log("received data: ", data);

        },
        (error) => {
            console.log("error: " , error)
        }

    );


}

export default (
    <ServiceOrientedApp
        stackName = "soa-exampleb"
        buildPath = 'build'
        region='eu-west-1'>

        <Environment
            name="dev"
        />

        <Route
            path='/'
            name='Infrastructure-Components'
            render={()=><div>
                <button onClick={callMyService}>Hello Infrastructure-Components!</button>
            </div>}
        />

        <Service
            id="myservice"
            path="/myservice"
            method="POST">

            <Middleware
                callback={ function (req, res, next) {
                    const parsedBody = JSON.parse(req.body);

                    console.log("this is the service: ", parsedBody);

                    res.status(200).set({
                        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                    }).send("ok");


            }}/>

        </Service>


    </ServiceOrientedApp>);