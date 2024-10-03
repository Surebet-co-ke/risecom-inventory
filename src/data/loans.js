export const loansData = {
    loans: [
      {
        id: 1,
        memberName: "Evans Kirubi",
        allocationDate: "2024-05-13",
        amountAllocated: 20000,
        interestRate: 0.05,
        paymentDuration: 2, // in months
        installments: [
          { month: "2024-06", amount: 10000 },
          { month: "2024-07", amount: 12000 }
        ],
        loanAmountRepaid: 10000
      },
      {
        id: 2,
        memberName: "Jipheens Wahome",
        allocationDate: "2024-05-20",
        amountAllocated: 24000,
        interestRate: 0.05,
        paymentDuration: 1, // in months
        installments: [
          { month: "2024-06", amount: 25200 }
        ],
        loanAmountRepaid: 25200
      },
      {
        id: 3,
        memberName: "Brian Jacob",
        allocationDate: "2024-06-27",
        amountAllocated: 25000,
        interestRate: 0.05,
        paymentDuration: 2, // in months
        installments: [
          { month: "2024-06", amount: 13750 },
          { month: "2024-07", amount: 13750 }
        ],
        loanAmountRepaid: 0
      },
      {
        id: 4,
        memberName: "Alex ndegwa",
        allocationDate: "2024-09-04",
        amountAllocated: 20000,
        interestRate: 0.05,
        paymentDuration: 1, // in months
        installments: [
          { month: "2024-09", amount: 22000 }
          
        ],
        loanAmountRepaid: 0
      }
    ]
  };
  