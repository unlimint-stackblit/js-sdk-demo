# JavaScript SDK

JavaScript SDK provides integration-ready widgets suit for embedding into your application.

Kit contains a pre-made customizable UI featuring bank cards binding and payments acceptance form.

- [Getting started](#getting-started)
  - [CardForm widget](#cardform-widget)
  - [PayForm widget](#payform-widget)
  - [PayBySavedCardForm widget](#paybysavedcardform-widget)
- [Entry data](#entry-data)
  - [CardForm data](#cardform-data)
  - [PayForm data](#payform-data)
  - [PayBySavedCard data](#paybysavedcard-data)
- [Callbacks](#callbacks)
- [Customization](#customization)
  - [CSS classes](#css-classes)
  - [Inline styles](#inline-styles)
    - [Elements reference](#elements-reference)
  - [Texts](#texts)
    - [CardForm elements](#cardform-elements)
    - [PayForm elements](#payform-elements)
    - [PayBySavedCardForm elements](#paybysavedcardform-elements)

## Getting started

Widget is a component that is embedded in application; refer to examples below.

1. Include needed web-component.
2. Setup `props` for a form.

- Important: `props` must be setup prior to JS script inclusion.

3. Include data in form.
4. Include needed JS script directly (or via npm).

- You can download npm from:

```
npm i @unlimint/client-js-sdk
```

- Import one of the 3 available widgets form in code of your project:

```
import '@unlimint/client-js-sdk/unlimint-card-form.js'
import '@unlimint/client-js-sdk/unlimint-pay-form.js'
import '@unlimint/client-js-sdk/unlimint-pay-token-form.js'
```

The default styling in JS SDK is made via **Inter** font. If you do not plan applying customizations with another font, then you have to include **Inter** separately:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

If your application contains **TypeScript** you can include **js-sdk.d.ts** annotations file to enable types checking into widget creation process.

TypeScript compiler includes these annotations into widget's data.

---

Widgets require URL addresses to receive requests. URLs must be pointed in `props` -> `urls` property.

The supported URLs:

- `generateMobileToken` - endpoint for mobile token generation, used in widget for authorization
- `cardBinding` - endpoint for card binding
- `payment` - endpoint for payment transaction

Mobile token endpoint addresses:

- demo https://sandbox.cardpay.com/demo-merchant/mobile/generate_token
- sandbox environment https://sandbox.cardpay.com/api/mobile/token
- production environment https://cardpay.com/api/mobile/token

Processing endpoint addresses:

- sandbox card binding request https://sandbox.cardpay.com/api/mobile/cardbinding
- sandbox card payment request https://sandbox.cardpay.com/api/mobile/payment
- production card binding request https://cardpay.com/api/mobile/cardbinding
- production card payment request https://cardpay.com/api/mobile/payment

---

Widgets allow to setup `enableRedirect` property having `true`/`false` value; false by default:

- `true` - after widget's form submitting user is redirected on the next step of flow via URL provided by processing backend, but `callbacks` -> `resolve` property will be ignored

---

### CardForm widget

CardForm widget contains a form for bank card binding feature.

The form allows customer to fill in card's data and save (bind) it for further payments in order to make the purchasing process quick and simple.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/1_CardForm_sequence.png)

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/2_CardForm_widget.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <unlimint-ui-card-form></unlimint-ui-card-form>

    <script>
      const props = {
        urls: {
          generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
          cardBinding: 'https://sandbox.cardpay.com/api/mobile/cardbinding',
        },
        enableRedirect: false,
        data: {
          recurringCurrency: 'USD',
          customer: {
            id: 'DfVg56Gvx',
            email: 'test@test.test',
          },
          returnUrls: {
            successUrl: 'https://example.com/success',
            declineUrl: 'https://example.com/decline',
          },
        },
        callbacks: {
          resolve: (data) => {
            console.log('resolve callback, data:', data);
          },
          reject: (error) => {
            console.log('reject callback, error:', error);
          },
        },
      };
      const cardForm = document.querySelector('unlimint-ui-card-form');
      cardForm.props = props;
    </script>
    <script src="unlimint-card-form.js"></script>
  </body>
</html>
```

### PayForm widget

PayForm widget contains a form for bank card payment feature. Form allows customer to fill in card's data and confirm payment. The card binding option is included too.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/3_PayForm_sequence.png)

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/4_PayForm_widget.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <unlimint-ui-pay-form></unlimint-ui-pay-form>

    <script>
      const props = {
        urls: {
          generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
          payment: 'https://sandbox.cardpay.com/api/mobile/payment',
        },
        enableRedirect: false,
        data: {
          merchantName: 'Merchant Name',
          merchantOrder: {
            description: 'description',
            id: '21513-216',
          },
          paymentMethod: 'BANKCARD',
          paymentData: {
            amount: '9700.00',
            currency: 'USD',
          },
          customer: {
            email: 'test@test.test',
          },
          returnUrls: {
            successUrl: 'https://example.com/success',
            declineUrl: 'https://example.com/decline',
          },
        },
        callbacks: {
          resolve: (data) => {
            console.log('resolve callback, data:', data);
          },
          reject: (error) => {
            console.log('reject callback, error:', error);
          },
        },
      };
      const cardForm = document.querySelector('unlimint-ui-pay-form');
      cardForm.props = props;
    </script>
    <script src="unlimint-pay-form.js"></script>
  </body>
</html>
```

### PayBySavedCardForm widget

PayBySavedCardForm widget contains a form for payment by saved card. Form allows customer to fill in CVV2/CVC2 code only and confirm payment.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/5_PayBySavedCard_widget.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <unlimint-ui-pay-token-form></unlimint-ui-pay-token-form>

    <script>
      const props = {
        urls: {
          generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
          payment: 'https://sandbox.cardpay.com/api/mobile/payment',
        },
        enableRedirect: false,
        data: {
          token: 'e51745bb-1865-5ceb-f20c-ade2c7a4f70e',
          lastDigits: '0002',
          merchantName: 'Merchant Name',
          merchantOrder: {
            description: 'description',
            id: '21513-216',
          },
          paymentMethod: 'BANKCARD',
          paymentData: {
            amount: '9700.00',
            currency: 'USD',
          },
          customer: {
            email: 'test@test.test',
          },
          returnUrls: {
            successUrl: 'https://example.com/success',
            declineUrl: 'https://example.com/decline',
          },
        },
        callbacks: {
          resolve: (data) => {
            console.log('resolve callback, data:', data);
          },
          reject: (error) => {
            console.log('reject callback, error:', error);
          },
        },
      };
      const cardForm = document.querySelector('unlimint-ui-pay-token-form');
      cardForm.props = props;
    </script>
    <script src="unlimint-pay-token-form.js"></script>
  </body>
</html>
```

## Entry data

Widgets accept entry data required for successful card binding or payment operation.

The entry data must be included during widget creation in `props` -> `data` property.

### CardForm data

CardForm widget accepts the following parameters:

| Field                 | Subfield 1    | Subfield 2 | Type    | Min. length | Max. length | Is mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ------------- | ---------- | ------- | ----------- | ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| merchantOrder         |               |            |         |             |             | No           | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | id            |            | String  |             | 50          | No           | Order ID used by the merchant’s shopping cart.                                                                                                                                                                                                                                                                                                                                                                                               |
|                       | description   |            | String  |             | 200         | No           | Description of product/service being sold.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **recurringCurrency** |               |            | String  |             | 3           | Yes          | ISO 4217 currency code (optional if paymentData is declared)                                                                                                                                                                                                                                                                                                                                                                                 |
| paymentData           |               |            |         |             |             |              | Is mandatory if recurringCurrency is not declared.                                                                                                                                                                                                                                                                                                                                                                                           |
|                       | generateToken |            | Boolean |             |             | No           | If set to "true", token will be generated and returned in the response. Token can be generated only for successful transactions (not for declined transactions).                                                                                                                                                                                                                                                                             |
|                       | **currency**  |            | String  |             | 3           | Yes          | ISO 4217 currency code.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| billingAddress        |               |            |         |             |             | No           | Address for billing.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | **country**   |            | String  | 2           | 3           | Yes          | ISO 3166-1 code of billing country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                    |
|                       | state         |            | String  |             | 40          | No           | The state or province of the billing address associated with the card being used for this purchase.<br>It's recommended to sent in following format: The country subdivision code defined in ISO 3166-2.<br>May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                  |
|                       | **zip**       |            | String  |             | 12          | Yes          | Billing postal code.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | **city**      |            | String  |             | 50          | Yes          | Billing city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                |
|                       | **addrLine1** |            | String  |             | 50          | Yes          | First line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase.<br>May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.<br>Required (if available) unless market or regional mandate restricts sending this information.                                                                                             |
|                       | addrLine2     |            | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase. Required (if available) unless market or regional mandate restricts sending this information.                                                                                                                                                                                               |
| **customer**          |               |            |         |             |             | Yes          | Customer data.                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                       | **email**     |            | String  |             | 256         | Yes          | Customer’s e-mail address.<br>Optional for wallets where setting in PM "May omit customer email" is enabled.                                                                                                                                                                                                                                                                                                                                 |
|                       | **id**        |            | String  |             | 15          | Yes          | Customer ID is a unique identifier of a cardholder at the Recurring payments service. Each card used by a cardholder within the service is linked to Customer ID and Filing ID.                                                                                                                                                                                                                                                              |
|                       | ip            |            | String  |             | 15          | No           | Customer’s IPv4. Mandatory only for S2S mode.                                                                                                                                                                                                                                                                                                                                                                                                |
|                       | locale        |            | String  |             | 2           | No           | Preferred locale for the payment page (ISO 639-1 language code).<br>The default locale (en or other locale if it's set as default in Merchant account) will be applied if the selected locale (received in request) is not supported.<br>Supported locales are: ar, az, bg, cs, de, el, en, es, fr, hu, hy, id, it, ja, ka, ko, ms, nl, pl, pt, ro, ru, sr, sv, th, tr, uk, vi, zh.                                                          |
|                       | phone         |            | String  | 8           | 18          | No           | Customer’s phone number.<br>Recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length.<br>Mandatory for wallets where setting in PM "May omit customer email" is enabled and customer.email isn't presented in request.          |
|                       | homePhone     |            | String  | 8           | 18          | No           | The home phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length. |
|                       | workPhone     |            | String  | 8           | 18          | No           | The work phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length. |
| returnUrls            |               |            |         |             |             | No           | Return URLs are the URLs where customer returns by pressing “Back to the shop” or “Cancel” button in Payment Page mode and redirected automatically in Gateway mode.                                                                                                                                                                                                                                                                         |
|                       | returnUrl     |            | String  |             | 512         | No           | Overrides default success URL, decline URL, cancel URL (only in Payment page mode), inprocess URL.<br>return URL can be used separately or together with other url parameters.                                                                                                                                                                                                                                                               |
|                       | successUrl    |            | String  |             | 512         | No           | Overrides default success URL only.                                                                                                                                                                                                                                                                                                                                                                                                          |
|                       | declineUrl    |            | String  |             | 512         | No           | Overrides default decline URL only.                                                                                                                                                                                                                                                                                                                                                                                                          |
|                       | cancelUrl     |            | String  |             | 512         | No           | Overrides default cancel URL only.                                                                                                                                                                                                                                                                                                                                                                                                           |
|                       | inprocessUrl  |            | String  |             | 512         | No           | Special URL for In process status of transaction.                                                                                                                                                                                                                                                                                                                                                                                            |
| settings              |               |            |         |             |             | No           | Settings parameters.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                       | cardholder    |            |         |             |             | No           | Defines the cardholder name input field element on the form.                                                                                                                                                                                                                                                                                                                                                                                 |
|                       |               | required   | Boolean |             |             | No           | Supported values:<br>• true - customer must enter a valid cardholder name<br>• false - cardholder name is an optional field                                                                                                                                                                                                                                                                                                                  |

### PayForm data

PayForm widget accepts the following parameters:

| Field             | Subfield 1        | Subfield 2  | Type    | Min. length | Max. length | Is mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ----------------- | ----------- | ------- | ----------- | ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| merchantName      |                   |             | String  | 1           | 50          | No           | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **merchantOrder** |                   |             |         |             |             | Yes          | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   | **id**            |             | String  |             | 50          | Yes          | Order ID used by the merchant’s shopping cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                   | **description**   |             | String  |             | 200         | Yes          | Description of product/service being sold.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | items             |             |         |             |             | No           | Array of items (in the shopping cart).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                   |                   | **name**    | String  |             | 50          | Yes          | The name of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                   |                   | description | String  |             | 200         | No           | The description of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   |                   | count       | Integer |             |             | No           | The count of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   |                   | price       | Decimal |             |             | No           | Price of product / service with dot as a decimal separator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| shippingAddress   |                   |             |         |             |             | No           | Shipping Address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | **country**       |             | String  | 2           | 3           | Yes          | ISO 3166-1 code of delivery country: 2 or 3 latin letters or numeric code                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   | state             |             | String  |             | 40          | No           | The state or province of the shipping address associated with the card being used for this purchase.<br>It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br>May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                      |
|                   | zip               |             | String  |             | 12          | No           | Delivery postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                   | city              |             | String  |             | 50          | No           | Delivery city. May include whitespaces, hyphens, apostrophes, commas and dots                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | phone             |             | String  | 5           | 20          | No           | Valid customer phone number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | addrLine1         |             | String  |             | 50          | No           | First line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase. May include street and house number.                                                                                                                                                                                                                                                                                                                                                             |
|                   | addrLine2         |             | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase.                                                                                                                                                                                                                                                                                                                                                                                                 |
| **paymentMethod** |                   |             | String  |             | 50          | Yes          | Payment method type name; insert `BANKCARD` value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **paymentData**   |                   |             |         |             |             |              | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | **amount**        |             | Decimal |             |             | Yes          | The total transaction amount in selected currency with dot as a decimal separator, must be less than 100 millions.                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | **currency**      |             | String  |             | 3           | Yes          | ISO 4217 currency code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                   | preauth           |             | Boolean |             |             | No           | Option allows to hold on customer funds before providing a service; supported values:<br>• true - enable holding<br>• false - skip holding                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | note              |             | String  |             | 100         | No           | Note about the transaction that will not be displayed to customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | dynamicDescriptor |             | String  |             | 25          | No           | Short description of the service or product, must be enabled by your manager to be used.<br>For Visa cards: maximum length 25 symbols, for MasterCard cards - 22 symbols.                                                                                                                                                                                                                                                                                                                                                                         |
|                   | transType         |             | String  | 2           | 2           | No           | Identifies the type of transaction being authenticated.<br>Supported values:<br>• 01 = Goods / Service Purchase<br>• 03 = Check Acceptance<br>• 10 = Account Funding • 11 = Quasi-Cash Transaction<br>• 28 = Prepaid Activation and Load Note: Values derived from the 8583 ISO Standard.                                                                                                                                                                                                                                                         |
| billingAddress    |                   |             |         |             |             | No           | Billing Address.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | **country**       |             | String  | 2           | 3           | Yes          | ISO 3166-1 code of billing country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   | state             |             | String  |             | 40          | No           | The state or province of the billing address associated with the card being used for this purchase.<br>It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br>May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                       |
|                   | **zip**           |             | String  |             | 12          | Yes          | Billing postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   | **city**          |             | String  |             | 50          | Yes          | Billing city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | **addrLine1**     |             | String  |             | 50          | Yes          | First line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase.<br>May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.<br>Required (if available) unless market or regional mandate restricts sending this information.<br>1-PA: Required unless market or regional mandate restricts sending this information.<br>02-NPA: Required (if available) unless market or regional mandate restricts sending this information. |
|                   | addrLine2         |             | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase. Required (if available) unless market or regional mandate restricts sending this information.                                                                                                                                                                                                                                                                                                    |
| **customer**      |                   |             |         |             |             | Yes          | Customer data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                   | **email**         |             | String  |             | 256         | Yes          | Email address of the customer.<br>Field is Optional for wallets where setting in PM "May omit customer email" is enabled.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   | device            |             |         |             |             | No           | Customer's device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   |                   | fingerprint | String  |             | 256         | No           | The fingerprint of device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | locale            |             | String  |             | 2           | No           | Preferred locale for the payment page (ISO 639-1 language code).<br>The default locale (en or other locale if it's set as default in Merchant account) will be applied if the selected locale (received in request) is not supported. Supported locales are: ar, az, bg, cs, de, el, en, es, fr, hu, hy, id, it, ja, ka, ko, ms, nl, pl, pt, ro, ru, sr, sv, th, tr, uk, vi, zh.                                                                                                                                                                  |
|                   | homePhone         |             | String  | 8           | 18          | No           | The home phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length.                                                                                                      |
|                   | workPhone         |             | String  | 8           | 18          | No           | The work phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length.                                                                                                      |
| returnUrls        |                   |             |         |             |             | No           | Return URLs are the URLs where customer returns by pressing “Back to the shop” or “Cancel” button in Payment Page mode and redirected automatically in Gateway mode.                                                                                                                                                                                                                                                                                                                                                                              |
|                   | returnUrl         |             | String  |             | 512         | No           | Overrides default success URL, decline URL, cancel URL (only in Payment page mode), inprocess URL.<br>Return URL can be used separately or together with other url parameters.                                                                                                                                                                                                                                                                                                                                                                    |
|                   | successUrl        |             | String  |             | 512         | No           | Overrides default success URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | declineUrl        |             | String  |             | 512         | No           | Overrides default decline URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | cancelUrl         |             | String  |             | 512         | No           | Overrides default cancel URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | inprocessUrl      |             | String  |             | 512         | No           | Special URL for In process status of transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| settings          |                   |             |         |             |             | No           | Settings parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   | cardholder        |             |         |             |             | No           | Defines the cardholder name input field element on the form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                   |                   | required    | Boolean |             |             | No           | Supported values:<br>• true - customer must enter a valid cardholder name<br>• false - cardholder name is an optional field                                                                                                                                                                                                                                                                                                                                                                                                                       |

### PayBySavedCard data

PayBySavedCard widget accepts the following parameters:

| Field             | Subfield 1        | Subfield 2  | Type    | Min. length | Max. length | Is mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ----------------- | ----------- | ------- | ----------- | ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **token**         |                   |             | String  |             | 128         | Yes          | Saved card token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **lastDigits**    |                   |             | String  | 4           | 4           | Yes          | The 4 last digits of saved card.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| merchantName      |                   |             | String  | 1           | 50          | No           | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **merchantOrder** |                   |             |         |             |             | Yes          | Merchant order data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   | **id**            |             | String  |             | 50          | Yes          | Order ID used by the merchant’s shopping cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                   | **description**   |             | String  |             | 200         | Yes          | Description of product/service being sold.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|                   | items             |             |         |             |             | No           | Array of items (in the shopping cart).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                   |                   | **name**    | String  |             | 50          | Yes          | The name of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                   |                   | description | String  |             | 200         | No           | The description of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                   |                   | count       | Integer |             |             | No           | The count of product / service, provided to the customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   |                   | price       | Decimal |             |             | No           | Price of product / service with dot as a decimal separator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| shippingAddress   |                   |             |         |             |             | No           | Shipping Address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | **country**       |             | String  | 2           | 3           | Yes          | ISO 3166-1 code of delivery country: 2 or 3 latin letters or numeric code                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   | state             |             | String  |             | 40          | No           | The state or province of the shipping address associated with the card being used for this purchase.<br>It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br>May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                      |
|                   | zip               |             | String  |             | 12          | No           | Delivery postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                   | city              |             | String  |             | 50          | No           | Delivery city. May include whitespaces, hyphens, apostrophes, commas and dots                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | phone             |             | String  | 5           | 20          | No           | Valid customer phone number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                   | addrLine1         |             | String  |             | 50          | No           | First line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase. May include street and house number.                                                                                                                                                                                                                                                                                                                                                             |
|                   | addrLine2         |             | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder shipping address associated with the card used for this purchase.                                                                                                                                                                                                                                                                                                                                                                                                 |
| **paymentMethod** |                   |             | String  |             | 50          | Yes          | Payment method type name; insert `BANKCARD` value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **paymentData**   |                   |             |         |             |             |              | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | **amount**        |             | Decimal |             |             | Yes          | The total transaction amount in selected currency with dot as a decimal separator, must be less than 100 millions.                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | **currency**      |             | String  |             | 3           | Yes          | ISO 4217 currency code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                   | note              |             | String  |             | 100         | No           | Note about the transaction that will not be displayed to customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | dynamicDescriptor |             | String  |             | 25          | No           | Short description of the service or product, must be enabled by your manager to be used.<br>For Visa cards: maximum length 25 symbols, for MasterCard cards - 22 symbols.                                                                                                                                                                                                                                                                                                                                                                         |
|                   | transType         |             | String  | 2           | 2           | No           | Identifies the type of transaction being authenticated.<br>Supported values:<br>• 01 = Goods / Service Purchase<br>• 03 = Check Acceptance<br>• 10 = Account Funding • 11 = Quasi-Cash Transaction<br>• 28 = Prepaid Activation and Load Note: Values derived from the 8583 ISO Standard.                                                                                                                                                                                                                                                         |
| billingAddress    |                   |             |         |             |             | No           | Billing Address.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                   | **country**       |             | String  | 2           | 3           | Yes          | ISO 3166-1 code of billing country: 2 or 3 latin letters or numeric code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   | state             |             | String  |             | 40          | No           | The state or province of the billing address associated with the card being used for this purchase.<br>It's recommended to send in following format: The country subdivision code defined in ISO 3166-2.<br>May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                       |
|                   | **zip**           |             | String  |             | 12          | Yes          | Billing postal code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                   | **city**          |             | String  |             | 50          | Yes          | Billing city. May include whitespaces, hyphens, apostrophes, commas and dots.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                   | **addrLine1**     |             | String  |             | 50          | Yes          | First line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase.<br>May include whitespaces, hyphens, apostrophes, commas, quotes, dots, slashes and semicolons.<br>Required (if available) unless market or regional mandate restricts sending this information.<br>1-PA: Required unless market or regional mandate restricts sending this information.<br>02-NPA: Required (if available) unless market or regional mandate restricts sending this information. |
|                   | addrLine2         |             | String  |             | 50          | No           | Second line of the street address or equivalent local portion of the Cardholder billing address associated with the card used for this purchase. Required (if available) unless market or regional mandate restricts sending this information.                                                                                                                                                                                                                                                                                                    |
| **customer**      |                   |             |         |             |             | Yes          | Customer data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                   | **email**         |             | String  |             | 256         | Yes          | Email address of the customer.<br>field is Optional for wallets where setting in PM "May omit customer email" is enabled.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                   | locale            |             | String  |             | 2           | No           | Preferred locale for the payment page (ISO 639-1 language code).<br>The default locale (en or other locale if it's set as default in Merchant account) will be applied if the selected locale (received in request) is not supported. Supported locales are: ar, az, bg, cs, de, el, en, es, fr, hu, hy, id, it, ja, ka, ko, ms, nl, pl, pt, ro, ru, sr, sv, th, tr, uk, vi, zh.                                                                                                                                                                  |
|                   | homePhone         |             | String  | 8           | 18          | No           | The home phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length.                                                                                                      |
|                   | workPhone         |             | String  | 8           | 18          | No           | The work phone number provided by the Cardholder. Required (if available) unless market or regional mandate restricts sending this information.<br>Characters format: recommended to send phone number in following format "+1 111111111" with country code and subscriber sections (only digits are accepted) of the number, "+" as prefix and "space" as delimiter.<br>Refer to ITU-E.164 for additional information on format and length.                                                                                                      |
| returnUrls        |                   |             |         |             |             | No           | Return URLs are the URLs where customer returns by pressing “Back to the shop” or “Cancel” button in Payment Page mode and redirected automatically in Gateway mode.                                                                                                                                                                                                                                                                                                                                                                              |
|                   | returnUrl         |             | String  |             | 512         | No           | Overrides default success URL, decline URL, cancel URL (only in Payment page mode), inprocess URL.<br>Return URL can be used separately or together with other url parameters.                                                                                                                                                                                                                                                                                                                                                                    |
|                   | successUrl        |             | String  |             | 512         | No           | Overrides default success URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | declineUrl        |             | String  |             | 512         | No           | Overrides default decline URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|                   | cancelUrl         |             | String  |             | 512         | No           | Overrides default cancel URL only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                   | inprocessUrl      |             | String  |             | 512         | No           | Special URL for In process status of transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## Callbacks

Widgets allow to react on result of initiated operation via `props` -> `callbacks` property; it is a key-value object; key - defines event name, value - defines processor-function.

At the moment only callback `resolve` is supported. It is initiated after operation complete.

Callback is an object of the following type:

```javascript
{ status: 200, data: { /* data from backend API */ } }
```

## Customization

Widgets support UI customization for labels, styles. Customization parameters are applied to widget's instance upon creation via `props`.

Widgets consist of components set that includes elements. CSS-class or style-object can be assigned to an element in order to override the default one.

Name of widget's component starts with prefix `$`; name of element has no prefix.

Elements can have a set of states: field focus, input validation notice etc.

State naming template is `${elementName}_${stateName}`.

State customization must be performed via `customClasses` property only.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/6_Style_customization.png)

### CSS classes

CSS-class name for its elements and states can be customized via `customClasses` property.

```javascript
props: {
  customClasses: {
    $payForm: {
      container: 'custom-pay-form',
    },
    $textInput: {
      label: 'custom-label',
    },
    $button: {
      button: 'custom-button',
    },
    $footer: {
      container: 'custom-footer',
    },
  },
  ...
}
// CSS
.custom-pay-form {
  background-color: #F1F2C2;
}
.custom-label {
  color: #F58A58;
}
.custom-button {
  background-color: #D1F555;
  border: 2px solid #000;
}
.custom-footer {
  background-color: #F1F2C2;
}
```

### Inline styles

Customized inline styles for elements can be assigned via `customStyles` property. CSS styles must be pointed in snake-case.

```javascript
props: {
  customStyles: {
    $payForm: {
      container: {
        'background-color': '#F1F2C2',
      },
    },
    $textInput: {
      label: {
        'color': '#F58A58',
      },
    },
    $button: {
      button: {
        'background-color': '#D1F555',
        'border': '2px solid #000',
      },
    },
    $footer: {
      container: {
        'background-color': '#F1F2C2',
      },
    },
  },
  ...
}
```

#### Elements reference

| Component          | Element   | State   | Description                                                                    |
| ------------------ | --------- | ------- | ------------------------------------------------------------------------------ |
| textInput          |           |         | Text field input component                                                     |
|                    | container |         | Container-element for the rest of elements                                     |
|                    | control   |         | Defines input-field border and inner elements layout                           |
|                    |           | focused | Focused field                                                                  |
|                    |           | invalid | Input value is invalid                                                         |
|                    | rightSlot |         | Right-sided block element that displays additional data, i.e. card brand icon  |
|                    | label     |         | Text field input label                                                         |
|                    |           | focused | Focused field                                                                  |
|                    |           | invalid | Input value is invalid                                                         |
|                    | input     |         | HTML input element                                                             |
|                    |           | focused | Focused field                                                                  |
|                    |           | invalid | Input value is invalid                                                         |
|                    | error     |         | Input error message                                                            |
| checkbox           |           |         | Checkbox component                                                             |
|                    | container |         | Container-element for the rest of elements                                     |
|                    | label     |         | Text input-field label                                                         |
| button             |           |         | Button component                                                               |
|                    | container |         | Container-element for button                                                   |
| loader             |           |         | Loader-component that indicates request sending                                |
|                    | container |         | Container-element for the rest of elements; overlaps displayed form            |
|                    | block     |         | Loader and text component; placed in the center of container element           |
|                    | spinner   |         | Animated loader SVG-icon                                                       |
|                    | text      |         | Text label                                                                     |
| footer             |           |         | Footer component                                                               |
|                    | container |         | Container-element for SVG-icons                                                |
| cardForm           |           |         | Card form component                                                            |
|                    | container |         | Container-element for the rest of elements                                     |
|                    | body      |         | Container-element of the form                                                  |
|                    | title     |         | Form's title text                                                              |
|                    | textInput |         | The same as $textInput.container, but for inline-styles it has higher priority |
|                    | cardInput |         | Card input container style                                                     |
|                    | dateInput |         | Date input container style                                                     |
|                    | cvvInput  |         | CVV2/CVC2 code input container style                                           |
|                    | submit    |         | The same as $button.container, but for inline-styles it has higher priority    |
|                    | footer    |         | The same as $footer.container, but for inline-styles it has higher priority    |
| payForm            |           |         | Payment form component                                                         |
|                    | container |         | Container-element for the rest of elements                                     |
|                    | body      |         | Container-element for the form                                                 |
|                    | title     |         | Form's title text                                                              |
|                    | total     |         | Total amount displayed                                                         |
|                    | order     |         | Order ID displayed                                                             |
|                    | textInput |         | The same as $textInput.container, but for inline-styles it has higher priority |
|                    | cardInput |         | Card input container style                                                     |
|                    | dateInput |         | Date input container style                                                     |
|                    | cvvInput  |         | CVV2/CVC2 code input container style                                           |
|                    | checkbox  |         | The same as $checkbox.container, but for inline-styles it has higher priority  |
|                    | submit    |         | The same as $button.container, but for inline-styles it has higher priority    |
|                    | footer    |         | The same as $footer.container, but for inline styles it has higher priority    |
| payBySavedCardForm |           |         | Payment by saved card form component                                           |
|                    | container |         | Container-element for the rest of elements                                     |
|                    | body      |         | Container-element for the form                                                 |
|                    | title     |         | Form's title text                                                              |
|                    | total     |         | Total amount displayed                                                         |
|                    | order     |         | Order ID displayed                                                             |
|                    | textInput |         | The same as $textInput.container, but for inline-styles it has higher priority |
|                    | cardInput |         | Card input container style                                                     |
|                    | cvvInput  |         | CVV2/CVC2 code input container style                                           |
|                    | submit    |         | The same as $button.container, but for inline-styles it has higher priority    |
|                    | footer    |         | The same as $footer.container, but for inline styles it has higher priority    |

### Texts

Texts customization can be applied via `customTexts` property.

![](https://raw.githubusercontent.com/unlimint-stackblit/js-sdk-public-assets/main/7_Text_customization.png)

```javascript
props: {
  customTexts: {
    'save-card.label': 'Add this card',
    submit: 'Confirm payment',
  },
  ...
}
```

#### CardForm elements

| Text              | Description                         |
| ----------------- | ----------------------------------- |
| title             | Form's title text                   |
| card-number.label | Card number input-field description |
| expiry-date.label | Expiry date input-field description |
| cvv2-cvc2.label   | CVV2/CVC2 input-field description   |
| submit            | Submit-control label                |

#### PayForm elements

| Text              | Description                              |
| ----------------- | ---------------------------------------- |
| total             | Label-text before total amount.          |
| order             | Order value label                        |
| card-number.label | Card number input-field description      |
| expiry-date.label | Expiry date input-field description      |
| cvv2-cvc2.label   | CVV2/CVC2 input-field description        |
| save-card.label   | Card binding option checkbox description |
| submit            | Submit-control label                     |

#### PayBySavedCardForm elements

| Text                    | Description                                |
| ----------------------- | ------------------------------------------ |
| total                   | Label-text before total amount.            |
| order                   | Order value label                          |
| saved-card-number.label | Masked 4-last cards's digits element label |
| cvv2-cvc2.label         | CVV2/CVC2 input-field description          |
| submit                  | Submit-control label                       |
