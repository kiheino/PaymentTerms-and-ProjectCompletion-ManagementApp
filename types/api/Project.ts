export type Project = {
  _id: string;
  projectName: string;
  client: {
    _id: string;
    clientName: string;
    ruby: string;
    postalCode: string;
    address1: string;
    address2: string;
    phone: string;
    cutoffDate: string;
    paymentMonth: string;
    paymentDay: string;
  };

  contractAmount: number;
  scheduledCompletionDate: string;
  isCompleted: boolean;
  invoiceId: string[];
  billingAmount: {
    date: string;
    amount: Number;
  };
  completionDate: string;
};
