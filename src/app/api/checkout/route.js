import { NextResponse } from "next/server"
const paypal = require('@paypal/checkout-server-sdk');

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const clientSecret = process.env.PAYPAL_CLIENT_SECRET
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypal.core.PayPalHttpClient(environment)


export async function POST() {

    const request = new paypal.orders.OrdersCreateRequest()
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: "USD",
                value: "100.00", 
                breakdown: {
                    item_total: {
                        currency_code: "USD",
                        value: "100.00"
                    }
                }
            },
            items: [{
                name: "item1",
                unit_amount: {
                    currency_code: "USD",
                    value: "100.00"
                },
                quantity: "1"
            }]
        }]
    })

    try {
        const createResponse = await client.execute(request);
        console.log("Order created with ID:", createResponse.result.id);

        // Optionally check order details before capture
        const captureRequest = new paypal.orders.OrdersCaptureRequest(createResponse.result.id);
        const captureResponse = await client.execute(captureRequest);
        console.log("Capture response:", captureResponse);
        return captureResponse;
    }  catch (error) {
        console.error('Failed to create PayPal order:', error);
        return new Response(JSON.stringify({ error: "Failed to create order" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}