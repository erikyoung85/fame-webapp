type PaymentTabConfig = {
  [step in PaymentTab]: {
    title: string;
    step: step;
    data?: Object;
  };
};

export enum PaymentTab {
  CreatePayment = 'CreatePayment',
  ConfirmPayment = 'ConfirmPayment',
  PaymentSuccess = 'PaymentSuccess',
}

export const paymentTabsConfig: PaymentTabConfig = {
  [PaymentTab.CreatePayment]: {
    title: 'Send Payment',
    step: PaymentTab.CreatePayment,
  },
  [PaymentTab.ConfirmPayment]: {
    title: 'Confirm Payment',
    step: PaymentTab.ConfirmPayment,
  },
  [PaymentTab.PaymentSuccess]: {
    title: 'Success!',
    step: PaymentTab.PaymentSuccess,
  },
};
