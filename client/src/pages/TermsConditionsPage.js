



export const TermsConditionsPage = () => {
    return (
        <div className='centered-box-v'>
        <div className='info-container'>
            <h1>Terms and Conditions</h1>
            <span>These terms are subject to change and SonicJuice will inform you of the updates each time your acceptance of them is required. Please make sure to read the below in its entirety.</span>
            
            <h3>Payment</h3>
            <span>VISA/Mastercard or PayPal are all acceptable methods of payment. SonicJuice uses services from Adyen for credit card payments. The credit card details are transferred using a secure SSL-connection. We support up to 256-bits encryption and guarantee that the process is secure. If no money has reached our account within 20 days, the order will be terminated. All goods remain the property of Elektron until paid for in full.</span>
            <span>For us to be able to process card payments, please note your card needs to be connected to Verified by VISA (for VISA cards) or SecureCode (Mastercard).</span>

            <h4>Shipment</h4>
            <span>Direct orders are normally shipped the same business day we receive the payment, given we receive the payment before 12:00 MSK. If the payment is received during a public holiday we will try to ship the order the first business day after the holiday. With online credit card payment, the transaction is instant. We reserve the right to delay shipments a few days due to unexpected inconveniences, unexpected stock shortages or heavy workload. If the order contains pre-order items, the order will be shipped when all items are in stock.</span>
            {/* <span>We ship all orders using UPS. This guarantees the quickest and safest possible delivery. Shipping within Europe is 2-4 business days, to North America 3-4 business days and to the rest of the world generally between 2-6 business days. When the order is shipped we will send you the tracking number by e-mail. It is also possible to log in to your Customer Account to access the tracking number.</span> */}
            <span>The tax authorities of countries outside the Russia sometimes add sales/import tax. If you are unsure of the regulations for your country, please check with the relevant public authority.</span>


            <h4>Return policy</h4>
            <span>SonicJuice offers a 14-day money-back guarantee for all physical items sold directly by us. The 14 days are counted from the arrival of the item. The item has to be in »as new« condition for us to accept refunding and you cannot return an item without contacting SonicJuice Support first. The customer covers the shipping back to SonicJuice. A copy of the original invoice or receipt must be supplied along with the item. The refund is transferred once we have received and inspected the returned item. For digital items, like Sound Packs, refunds cannot be issued.</span>

            <h4>Cancellation policy</h4>
            <span>Paid orders can be canceled and refunded if the order has not been shipped. If the order has been shipped the Return policy applies.</span>

            <h3>Privacy policy</h3>
            <span>SonicJuice complies with the EU-wide General Data Protection Regulation (GDPR). We store the bare minimum of personal data needed to fulfill our duties to our customers, such as handling orders, support and service of products. We encourage you to read and digest the SonicJuice Privacy Policy in its entirety.</span>
        </div>
    </div>
    )
}