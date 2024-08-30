const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      if (state.balance < action.payload) return state;
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      return {
        ...state,
        loan: action.payload.loan,
        balance: state.balance + action.payload.loan,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      if (state.balance < action.payload) return;
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function requestLoan(loan, purpose) {
  return {
    type: "account/requestLoan",
    payload: { loan, purpose },
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
