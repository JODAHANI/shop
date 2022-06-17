import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class MyApp extends React.Component {
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
                    this.props.transactionSuccess(payment)
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = this.props.sum; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'AWof1jt7WOkWogWvsPSaS4xB5029VLJmmp8txkf1Kb7N0QmGjOLZSs9M-8pwRquS6S_ABJ1Sk10t96CJ',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalExpressBtn 
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={{size : 'large', color : 'blue'}}
            />
        );
    }
}
// import React, { useEffect, useState } from 'react'

// function Pay() {
//     const [N, setN] = useState(false)
//     useEffect(() => {
//         if (!document.getElementById('script')) {
//             const script = document.createElement('script');
//             script.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
//             document.body.appendChild(script);
//         }
//         setN(true)
//     }, [])
//     function naverPay() {
//         let oPay = window.Naver.Pay.create({
//             "mode": "production", // development or production
//             "clientId": "ncp_1o1in5_01" // clientId
//         });
//         oPay.open({
//             "merchantUserKey": "가맹점 사용자 식별키",
//             "merchantPayKey": "가맹점 주문 번호",
//             "productName": "상품명을 입력하세요",
//             "totalPayAmount": "1000",
//             "taxScopeAmount": "1000",
//             "taxExScopeAmount": "0",
//             "returnUrl": "사용자 결제 완료 후 결제 결과를 받을 URL"
//         });
//     }
//     return (
//         <div>
//             {
//                 N ? <button onClick={naverPay}>전송</button>
//                     : null
//             }
//         </div>
//     )
// }

// export default Pay