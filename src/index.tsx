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

const SERVICE_ID = "myservice";

async function callMyService () {

    await callService(
        SERVICE_ID,
        { some: "data" },
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
        stackName = "soa-example"
        buildPath = 'build'
        region='eu-west-1'>

        <Environment name="dev"/>

        <Route
            path='/'
            name='My Service-Oriented React App'
            render={()=><div>
                <button onClick={callMyService}>Hello Infrastructure-Components!</button>
            </div>}
        />

        <Service
            id={ SERVICE_ID }
            path="/myservice"
            method="POST">

            <Middleware
                callback={ function (req, res, next) {
                    const parsedBody = JSON.parse(req.body);

                    console.log("this is the service: ", parsedBody);

                    res.status(200).set({
                        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    }).send("ok");

            }}/>

        </Service>
    </ServiceOrientedApp>);