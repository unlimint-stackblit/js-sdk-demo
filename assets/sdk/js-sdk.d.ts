declare namespace Unlimint.JsSDK {
  interface Urls {
    generateMobileToken: string;
  }

  interface Callbacks {
    resolve?: (data: any) => void;
    reject?: (error: any) => void;
  }

  interface Props {
    urls: Urls;
    callbacks?: Callbacks;
  }

  interface CardFormData {
    merchantOrder?: {
      id?: string;
      description?: string;
    };
    recurringCurrency: string;
    billingAddress?: {
      country: string;
      state?: string;
      zip: string;
      city: string;
      addrLine1: string;
      addrLine2?: string;
    };
    customer: {
      email: string;
      id: string;
      ip?: string;
      locale?: string;
      phone?: string;
      homePhone?: string;
      workPhone?: string;
    };
    returnUrls?: {
      returnUrl?: string;
      successUrl?: string;
      declineUrl?: string;
      cancelUrl?: string;
      inprocessUrl?: string;
    };
  }

  interface PayFormData {
    merchantName: string;
    merchantOrder: {
      id: string;
      description: string;
      items?: Array<{
        name: string;
        description?: string;
        count?: string;
        price?: string;
      }>;
    };
    shippingAddress?: {
      country: string;
      state?: string;
      zip?: string;
      city?: string;
      phone?: string;
      addrLine1?: string;
      addrLine2?: string;
    };
    paymentMethod?: string;
    paymentData?: {
      amount: string;
      currency: string;
      note?: string;
      dynamicDescriptor?: string;
      transType?: string;
    };
    billingAddress?: {
      country: string;
      state?: string;
      zip: string;
      city: string;
      addrLine1: string;
      addrLine2?: string;
    };
    customer: {
      email: string;
      locale?: string;
      homePhone?: string;
      workPhone?: string;
    };
    returnUrls?: {
      returnUrl?: string;
      successUrl?: string;
      declineUrl?: string;
      cancelUrl?: string;
      inprocessUrl?: string;
    };
  }

  interface PayBySavedCardFormData {
    token: string;
    lastDigits: string;
  }

  interface CardFormCustomTexts {
    title?: string;
    'card-number.label'?: string; // eslint-disable-line
    'expiry-date.label'?: string; // eslint-disable-line
    'cvv2-cvc2.label'?: string; // eslint-disable-line
    submit?: string;
  }

  interface PayFormCustomTexts {
    total?: string;
    order?: string;
    'card-number.label'?: string; // eslint-disable-line
    'expiry-date.label'?: string; // eslint-disable-line
    'cvv2-cvc2.label'?: string; // eslint-disable-line
    'save-card.label'?: string; // eslint-disable-line
    submit?: string;
  }

  interface PayBySavedCardFormCustomTexts {
    total?: string;
    order?: string;
    'card-number.label'?: string; // eslint-disable-line
    'cvv2-cvc2.label'?: string; // eslint-disable-line
    submit?: string;
  }

  type StyleDeclarations = { [key: string]: string };

  type BaseFormCustomStyles = Partial<{
    $textInput: Partial<{
      container: StyleDeclarations;
      control: StyleDeclarations;
      rightSlot: StyleDeclarations;
      label: StyleDeclarations;
      input: StyleDeclarations;
      error: StyleDeclarations;
    }>;
    $checkbox?: Partial<{
      container: StyleDeclarations;
      label: StyleDeclarations;
    }>;
    $button: Partial<{
      container: StyleDeclarations;
      button: StyleDeclarations;
    }>;
    $loader: Partial<{
      container: StyleDeclarations;
      block: StyleDeclarations;
      spinner: StyleDeclarations;
      text: StyleDeclarations;
    }>;
    $footer: Partial<{
      container: StyleDeclarations;
    }>;
  }>;

  type CardFormCustomStyles = BaseFormCustomStyles & {
    $cardForm: Partial<{
      container: StyleDeclarations;
      body: StyleDeclarations;
      title: StyleDeclarations;
      textInput: StyleDeclarations;
      submit: StyleDeclarations;
      footer: StyleDeclarations;
    }>;
  };

  type PayFormCustomStyles = BaseFormCustomStyles & {
    $payForm: Partial<{
      container: StyleDeclarations;
      body: StyleDeclarations;
      title: StyleDeclarations;
      total: StyleDeclarations;
      order: StyleDeclarations;
      textInput: StyleDeclarations;
      checkbox: StyleDeclarations;
      submit: StyleDeclarations;
      footer: StyleDeclarations;
    }>;
  };

  type PayBySavedCardFormCustomStyles = BaseFormCustomStyles & {
    $payBySavedCard: Partial<{
      container: StyleDeclarations;
      body: StyleDeclarations;
      title: StyleDeclarations;
      total: StyleDeclarations;
      order: StyleDeclarations;
      textInput: StyleDeclarations;
      submit: StyleDeclarations;
      footer: StyleDeclarations;
    }>;
  };

  type BaseFormCustomClasses = Partial<{
    $textInput: Partial<{
      container: string;
      control: string;
      rightSlot: string;
      label: string;
      input: string;
      error: string;
    }>;
    $checkbox?: Partial<{
      container: string;
      label: string;
    }>;
    $button: Partial<{
      container: string;
      button: string;
    }>;
    $loader: Partial<{
      container: string;
      block: string;
      spinner: string;
      text: string;
    }>;
    $footer: Partial<{
      container: string;
    }>;
  }>;

  type CardFormCustomClasses = BaseFormCustomClasses & {
    $cardForm: Partial<{
      container: string;
      body: string;
      title: string;
      textInput: string;
      cardInput: string;
      dateInput: string;
      cvvInput: string;
      submit: string;
      footer: string;
    }>;
  };

  type PayFormCustomClasses = BaseFormCustomStyles & {
    $payForm: Partial<{
      container: string;
      body: string;
      title: string;
      total: string;
      order: string;
      textInput: string;
      cardInput: string;
      dateInput: string;
      cvvInput: string;
      checkbox: string;
      submit: string;
      footer: string;
    }>;
  };

  type PayBySavedCardFormCustomClasses = BaseFormCustomStyles & {
    $payBySavedCardForm: Partial<{
      container: string;
      body: string;
      title: string;
      total: string;
      order: string;
      textInput: string;
      cardInput: string;
      cvvInput: string;
      submit: string;
      footer: string;
    }>;
  };

  interface CardFormProps extends Props {
    data: CardFormData;
    customTexts?: CardFormCustomTexts;
    customStyles?: CardFormCustomStyles;
    customClasses?: CardFormCustomClasses;
  }

  interface PayFormProps extends Props {
    data: PayFormData;
    customTexts?: PayFormCustomTexts;
    customStyles?: PayFormCustomStyles;
    customClasses?: PayFormCustomClasses;
  }

  interface PayBySavedCardFormProps extends Props {
    data: PayFormProps & PayBySavedCardFormData;
    customTexts?: PayBySavedCardFormCustomTexts;
    customStyles?: PayBySavedCardFormCustomStyles;
    customClasses?: PayBySavedCardFormCustomClasses;
  }
}
