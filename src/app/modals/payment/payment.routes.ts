type PaymentTabConfig = {
  [step in PaymentTab]: {
    title: string;
    step: step;
    previousTab?: PaymentTab;
    nextTab?: PaymentTab;
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
    previousTab: undefined,
    nextTab: PaymentTab.ConfirmPayment,
  },
  [PaymentTab.ConfirmPayment]: {
    title: 'Confirm Payment',
    step: PaymentTab.ConfirmPayment,
    previousTab: PaymentTab.CreatePayment,
    nextTab: PaymentTab.PaymentSuccess,
  },
  [PaymentTab.PaymentSuccess]: {
    title: 'Success!',
    step: PaymentTab.PaymentSuccess,
    previousTab: undefined,
    nextTab: undefined,
  },
};
