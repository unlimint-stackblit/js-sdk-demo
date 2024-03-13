const modal = document.getElementById('demo-shop-modal');

function openModal() {
  modal.style.visibility = 'visible';
  modal.style.opacity = '1';
}

function hideModal() {
  modal.style.visibility = 'hidden';
  modal.style.opacity = '0';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    hideModal();
  }
};

function back() {
  document.getElementById('demo-item').style.display = 'flex';
  document.getElementById('result-status').style.display = 'none';
  hideForms();
  hideBackButton();
}

function hideForms() {
  const forms = document.getElementsByClassName('unl-form');

  for (let i = 0; i < forms.length; i++) {
    forms[i].innerHTML = '';
    forms[i].style.display = 'none';
  }
}

function hideBackButton() {
  document.getElementById('back-button').style.display = 'none';
}

function createPaymentDetail(title, value) {
  const paymentDetail = document.createElement('div');
  paymentDetail.className = 'payment-detail';

  const paymentTitle = document.createElement('div');
  paymentTitle.className = 'payment-detail__title';
  paymentTitle.innerText = title;

  const paymentValue = document.createElement('div');
  paymentValue.className = 'payment-detail__value';
  paymentValue.innerText = value;

  paymentDetail.appendChild(paymentTitle);
  paymentDetail.appendChild(paymentValue);

  return paymentDetail;
}

function openPayment(paymentType) {
  hideModal();

  document.getElementById('demo-item').style.display = 'none';
  document.getElementById('back-button').style.display = 'block';
  document.getElementById('success-label').style.display = 'none';
  document.getElementById('declined-label').style.display = 'none';
  document.getElementById('payment-info').innerHTML = '';
  const target = document.getElementById(paymentType);
  target.innerHTML = '';
  target.style.display = 'block';

  switch (paymentType) {
    case 'cardForm':
      openCardForm(target);
      break;
    case 'payForm':
      openPayForm(target);
      break;
    case 'payBySavedCardForm':
      openPayBySavedCardForm(target);
      break;
  }
}

function showCardFormResultPage(data) {
  hideForms();
  hideBackButton();
  document.getElementById('result-status-title').innerText = 'Add card';
  document.getElementById('result-status').style.display = 'flex';

  if (data?.status === 200) {
    document.getElementById('success-label').style.display = 'flex';
    document.getElementById('result-status-text').innerText =
      'Your card has been successfully linked';
  } else {
    document.getElementById('declined-label').style.display = 'flex';
    document.getElementById('result-status-text').innerText = 'Your card was not linked';
  }
}

function openCardForm(target) {
  const cardFromProps = {
    customClasses: {
      $cardForm: {
        container: 'unl-custom-container',
        body: 'unl-custom-body',
        footer: 'unl-custom-footer',
        title: 'unl-custom-card-form-title',
        submit: 'unl-custom-card-form-submit',
        dateInput: 'unl-custom-date-input',
        cvvInput: 'unl-custom-cvv-input',
      },
      $textInput: {
        container: 'unl-custom-label-container',
        control: 'unl-custom-label-control',
        label: 'unl-custom-label',
        rightSlot: 'unl-custom-right-slot',
        error: 'unl-custom-error',
      },
      $button: {
        container: 'unl-custom-button',
      },
    },
    urls: {
      generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
      cardBinding: 'https://sandbox.cardpay.com/api/mobile/cardbinding',
    },
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

        showCardFormResultPage(data);
      },
      reject: (error) => {
        console.log('reject callback, error:', error);

        showCardFormResultPage();
      },
    },
  };

  const cardForm = document.createElement('unlimint-ui-card-form');
  cardForm.props = cardFromProps;

  target.append(cardForm);
}

function showPayFormResultPage(data, payFormData) {
  hideForms();
  hideBackButton();
  document.getElementById('result-status-title').innerText = 'Merchant name';
  document.getElementById('result-status').style.display = 'flex';

  [
    { title: 'Order number', value: payFormData.merchantOrder.id },
    { title: 'Card number', value: '... 2568' },
    { title: 'Card type', value: 'Visa' },
    {
      title: 'Total amount',
      value: payFormData.paymentData.amount + ' ' + payFormData.paymentData.currency,
    },
  ].forEach((item) => {
    const newNode = createPaymentDetail(item.title, item.value);
    document.getElementById('payment-info').appendChild(newNode);
  });

  document.getElementById('result-status-text').innerText = 'Payment details';

  if (data?.status === 200) {
    document.getElementById('success-label').style.display = 'flex';
  } else {
    document.getElementById('declined-label').style.display = 'flex';
  }
}

function openPayForm(target) {
  const payFormData = {
    merchantName: 'Merchant Name',
    merchantOrder: {
      description: 'description',
      id: '21513-216',
    },
    paymentMethod: 'BANKCARD',
    paymentData: {
      amount: '352.00',
      currency: 'USD',
    },
    customer: {
      email: 'testEmail@cardpay.com',
    },
  };

  const payFormProps = {
    customClasses: {
      $payForm: {
        container: 'unl-custom-container',
        body: 'unl-custom-body',
        footer: 'unl-custom-footer',
        title: 'unl-custom-info-title',
        total: 'unl-custom-info-total',
        order: 'unl-custom-info-order',
        dateInput: 'unl-custom-date-input',
        cvvInput: 'unl-custom-cvv-input',
      },
      $textInput: {
        container: 'unl-custom-label-container',
        control: 'unl-custom-label-control',
        label: 'unl-custom-label',
        rightSlot: 'unl-custom-right-slot',
        error: 'unl-custom-error',
      },
      $button: {
        container: 'unl-custom-button',
      },
      $checkbox: {
        container: 'unl-custom-checkbox-container',
      },
    },
    customTexts: {
      total: 'Total: ',
    },
    urls: {
      generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
      payment: 'https://sandbox.cardpay.com/api/mobile/payment',
    },
    data: payFormData,
    callbacks: {
      resolve: (data) => {
        console.log('resolve callback, data:', data);

        showPayFormResultPage(data, payFormData);
      },
      reject: (error) => {
        console.log('reject callback, error:', error);

        showPayFormResultPage(null, payFormData);
      },
    },
  };

  const payForm = document.createElement('unlimint-ui-pay-form');
  payForm.props = payFormProps;

  target.append(payForm);
}

function showPayBySavedCardFormResultPage(data, payBySavedCardFormData) {
  hideForms();
  hideBackButton();
  document.getElementById('result-status-title').innerText = 'Merchant name';
  document.getElementById('result-status').style.display = 'flex';

  [
    { title: 'Order number', value: payBySavedCardFormData.merchantOrder.id },
    { title: 'Card number', value: '... ' + payBySavedCardFormData.lastDigits },
    { title: 'Card type', value: 'Visa ' },
    {
      title: 'Total amount',
      value:
        payBySavedCardFormData.paymentData.amount +
        ' ' +
        payBySavedCardFormData.paymentData.currency,
    },
  ].forEach((item) => {
    const newNode = createPaymentDetail(item.title, item.value);
    document.getElementById('payment-info').appendChild(newNode);
  });

  document.getElementById('result-status-text').innerText = 'Payment details';

  if (data?.status === 200) {
    document.getElementById('success-label').style.display = 'flex';
  } else {
    document.getElementById('declined-label').style.display = 'flex';
  }
}

function openPayBySavedCardForm(target) {
  const payBySavedCardFormData = {
    token: 'e51745bb-1865-5ceb-f20c-ade2c7a4f70e',
    lastDigits: '0002',
    merchantName: 'Merchant Name',
    merchantOrder: {
      description: 'description',
      id: '21513-216',
    },
    paymentMethod: 'BANKCARD',
    paymentData: {
      amount: '352.00',
      currency: 'USD',
    },
    customer: {
      email: 'testEmail@cardpay.com',
    },
  };

  const payBySavedCardProps = {
    customClasses: {
      $payBySavedCardForm: {
        container: 'unl-custom-container',
        body: 'unl-custom-body',
        footer: 'unl-custom-footer',
        title: 'unl-custom-info-title',
        total: 'unl-custom-info-total',
        order: 'unl-custom-info-order',
        cvvInput: 'unl-custom-pay-by-saved-card-input',
      },
      $textInput: {
        container: 'unl-custom-label-container',
        control: 'unl-custom-label-control',
        label: 'unl-custom-label',
        rightSlot: 'unl-custom-right-slot',
        error: 'unl-custom-error',
      },
      $button: {
        container: 'unl-custom-button',
      },
    },
    customTexts: {
      total: 'Total: ',
    },
    urls: {
      generateMobileToken: 'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
      payment: 'https://sandbox.cardpay.com/api/mobile/payment',
    },
    data: payBySavedCardFormData,
    callbacks: {
      resolve: (data) => {
        console.log('resolve callback, data:', data);

        showPayBySavedCardFormResultPage(data, payBySavedCardFormData);
      },
      reject: (error) => {
        console.log('reject callback, error:', error);

        showPayBySavedCardFormResultPage(null, payBySavedCardFormData);
      },
    },
  };

  const payBySavedCard = document.createElement('unlimint-ui-pay-token-form');
  payBySavedCard.props = payBySavedCardProps;

  target.append(payBySavedCard);
}

// This lines needs for npm example
window.back = back;
window.openModal = openModal;
window.openPayment = openPayment;
window.openCardForm = openCardForm;
window.openPayForm = openPayForm;
window.openPayBySavedCardForm = openPayBySavedCardForm;
