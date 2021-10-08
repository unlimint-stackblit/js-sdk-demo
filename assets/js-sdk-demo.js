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

function openCardForm(target) {
  new CardForm({
    target,
    props: {
      customClasses: {
        $cardForm: {
          container: 'unl-custom-container',
          body: 'unl-custom-body',
          title: 'unl-custom-card-form-title',
          submit: 'unl-custom-card-form-submit',
          dateInput: 'unl-custom-date-input',
          cvvInput: 'unl-custom-cvv-input'
        },
        $textInput: {
          container: 'unl-custom-label-container',
          control: 'unl-custom-label-control',
          label: 'unl-custom-label',
          rightSlot: 'unl-custom-right-slot',
          error: 'unl-custom-error'
        },
        $button: {
          button: 'unl-custom-button'
        }
      },
      urls: {
        generateMobileToken:
          'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
        cardBinding: 'https://sandbox.cardpay.com/api/mobile/cardbinding'
      },
      data: {
        recurringCurrency: 'USD',
        customer: {
          id: 'DfVg56Gvx',
          email: 'test@test.test'
        },
        returnUrls: {
          successUrl: 'https://example.com/success',
          declineUrl: 'https://example.com/decline'
        }
      },
      callbacks: {
        resolve: data => {
          console.log('resolve callback, data:', data);

          hideForms();
          hideBackButton();
          document.getElementById('result-status').style.display = 'flex';

          if (data?.code === 200) {
            document.getElementById('success-label').style.display = 'flex';
            document.getElementById('result-status-text').innerText =
              'Your card has been successfully linked';
          } else {
            document.getElementById('declined-label').style.display = 'flex';
            document.getElementById('result-status-text').innerText =
              'Your card was not linked';
          }
        }
      }
    }
  });
}

function openPayForm(target) {
  const payFormData = {
    merchantName: 'Merchant Name',
    merchantOrder: {
      description: 'description',
      id: '21513-216'
    },
    paymentMethod: 'BANKCARD',
    paymentData: {
      amount: '9700.00',
      currency: 'USD'
    },
    customer: {
      email: 'testEmail@cardpay.com'
    }
  };

  new PayForm({
    target,
    props: {
      customClasses: {
        $payForm: {
          container: 'unl-custom-container',
          body: 'unl-custom-body',
          title: 'unl-custom-info-title',
          total: 'unl-custom-info-total',
          order: 'unl-custom-info-order',
          dateInput: 'unl-custom-date-input',
          cvvInput: 'unl-custom-cvv-input'
        },
        $textInput: {
          container: 'unl-custom-label-container',
          control: 'unl-custom-label-control',
          label: 'unl-custom-label',
          rightSlot: 'unl-custom-right-slot',
          error: 'unl-custom-error'
        },
        $button: {
          button: 'unl-custom-button'
        },
        $checkbox: {
          container: 'unl-custom-checkbox-container'
        }
      },
      urls: {
        generateMobileToken:
          'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
        payment: 'https://sandbox.cardpay.com/api/mobile/payment'
      },
      data: payFormData,
      callbacks: {
        resolve: data => {
          console.log('resolve callback, data:', data);

          hideForms();
          hideBackButton();
          document.getElementById('result-status').style.display = 'flex';

          [
            { title: 'Order number', value: payFormData.merchantOrder.id },
            {
              title: 'Total amount',
              value:
                payFormData.paymentData.amount +
                ' ' +
                payFormData.paymentData.currency
            }
          ].forEach(item => {
            const newNode = createPaymentDetail(item.title, item.value);
            document.getElementById('payment-info').appendChild(newNode);
          });

          document.getElementById('result-status-text').innerText =
            'Payment details';

          if (data?.status === 200) {
            document.getElementById('success-label').style.display = 'flex';
          } else {
            document.getElementById('declined-label').style.display = 'flex';
          }
        }
      }
    }
  });
}

function openPayBySavedCardForm(target) {
  const payBySavedCardForm = {
    token: 'a3d85ac0-4268-bb12-a628-f1e13a4988d8',
    lastDigits: '0002',
    merchantName: 'Merchant Name',
    merchantOrder: {
      description: 'description',
      id: '21513-216'
    },
    paymentMethod: 'BANKCARD',
    paymentData: {
      amount: '9700.00',
      currency: 'USD'
    },
    customer: {
      email: 'testEmail@cardpay.com'
    }
  };

  new PayBySavedCardForm({
    target,
    props: {
      customClasses: {
        $payBySavedCardForm: {
          container: 'unl-custom-container',
          body: 'unl-custom-body',
          title: 'unl-custom-info-title',
          total: 'unl-custom-info-total',
          order: 'unl-custom-info-order'
        },
        $textInput: {
          container: 'unl-custom-label-container',
          control: 'unl-custom-label-control',
          label: 'unl-custom-label',
          rightSlot: 'unl-custom-right-slot',
          error: 'unl-custom-error'
        },
        $button: {
          button: 'unl-custom-button'
        }
      },
      urls: {
        generateMobileToken:
          'https://sandbox.cardpay.com/demo-merchant/mobile/generate_token',
        payment: 'https://sandbox.cardpay.com/api/mobile/payment'
      },
      data: {
        token: 'a3d85ac0-4268-bb12-a628-f1e13a4988d8',
        lastDigits: '0002',
        merchantName: 'Merchant Name',
        merchantOrder: {
          description: 'description',
          id: '21513-216'
        },
        paymentMethod: 'BANKCARD',
        paymentData: {
          amount: '9700.00',
          currency: 'USD'
        },
        customer: {
          email: 'testEmail@cardpay.com'
        }
      },
      callbacks: {
        resolve: data => {
          console.log('resolve callback, data:', data);

          hideForms();
          hideBackButton();
          document.getElementById('result-status').style.display = 'flex';

          [
            {
              title: 'Order number',
              value: payBySavedCardForm.merchantOrder.id
            },
            {
              title: 'Card number',
              value: '... ' + payBySavedCardForm.lastDigits
            },
            {
              title: 'Total amount',
              value:
                payBySavedCardForm.paymentData.amount +
                ' ' +
                payBySavedCardForm.paymentData.currency
            }
          ].forEach(item => {
            const newNode = createPaymentDetail(item.title, item.value);
            document.getElementById('payment-info').appendChild(newNode);
          });

          document.getElementById('result-status-text').innerText =
            'Payment details';

          if (data?.status === 200) {
            document.getElementById('success-label').style.display = 'flex';
          } else {
            document.getElementById('declined-label').style.display = 'flex';
          }
        }
      }
    }
  });
}

// This lines needs for npm example
window.back = back;
window.openPayment = openPayment;
window.openCardForm = openCardForm;
window.openPayForm = openPayForm;
window.openPayBySavedCardForm = openPayBySavedCardForm;
