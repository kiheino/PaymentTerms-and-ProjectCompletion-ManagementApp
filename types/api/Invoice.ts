export type Invoice = {
  _id: string;
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
  projects: [
    {
      _id: string;
      projectName: string;
      client: string;
      contractAmount: number;
      scheduledCompletionDate: string;
      isCompleted: boolean;
      invoiceId: string[];
      billingAmount: [
        {
          date: string;
          amount: number;
        }
      ];
      completionDate: string;
    }
  ];
  invoiceDate: string;
  dueDate: string;
};
