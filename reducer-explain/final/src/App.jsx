import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isAccountOpen: false,
};

function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "openAccount":
        return {
          ...state,
          balance: 500,
          isAccountOpen: true,
        };
      case "deposit":
        return { ...state, balance: state.balance + action.payload };
      case "withdraw":
        if (state.balance < action.payload) {
          return state;
        }
        return { ...state, balance: state.balance - action.payload };
      case "requestLoan":
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: state.loan + action.payload,
        };
      case "payLoan":
        if (state.loan > state.balance) {
          return state;
        }
        return { ...state, balance: state.balance - state.loan, loan: 0 };
      case "closeAccount":
        if (state.loan > state.balance) {
          return state;
        }
        return { ...state, balance: 0, loan: 0, isAccountOpen: false };
      case "applyLoan":
      default:
        return state;
    }
  }

  const [{ balance, loan, isAccountOpen }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const classNameBtn = "rounded text-white p-2";

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="font-bold text-3xl">useReducer Bank Account</h1>
      <p className="font-semibold">Balance: {balance}</p>
      <p className="font-semibold">Loan: {loan}</p>

      <p>
        <button
          className={`${classNameBtn} ${
            isAccountOpen ? "bg-gray-600" : "bg-green-500"
          }`}
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isAccountOpen}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${
            isAccountOpen ? "bg-green-500" : "bg-gray-600"
          }`}
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isAccountOpen}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${
            isAccountOpen ? "bg-green-500" : "bg-gray-600"
          }`}
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isAccountOpen}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${
            isAccountOpen ? "bg-green-500" : "bg-gray-600"
          }`}
          onClick={() => {
            dispatch({ type: "requestLoan", payload: 5000 });
          }}
          disabled={!isAccountOpen}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${
            isAccountOpen ? "bg-green-500" : "bg-gray-600"
          }`}
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isAccountOpen}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} bg-red-600 ${
            !isAccountOpen && "bg-gray-600"
          }`}
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isAccountOpen}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;
