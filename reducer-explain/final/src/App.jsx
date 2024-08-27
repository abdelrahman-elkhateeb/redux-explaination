import { useState } from "react";

export default function App() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loan, setLoan] = useState(0);
  function handleOpenAccount() {
    setIsAccountOpen(true);
  }

  function handleCloseAccount() {
    if (loan > 0) return;
    setIsAccountOpen(false);
    setBalance(0);
  }

  function handleDeposit() {
    setBalance(balance + 150);
  }

  function handleWithdraw() {
    if (balance <= 0) return;
    setBalance(balance - 50);
  }

  function handleRequestLoan() {
    const deposit = 5000;
    setLoan(loan + deposit);
    setBalance(balance + deposit);
  }

  function handlePayLoan() {
    if (balance >= loan) {
      setBalance(balance - loan);
      setLoan(0);
    }
  }

  const classNameBtn = "bg-green-400 rounded text-white p-2";
  const disabled = "bg-gray-500";

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="font-bold text-3xl">useReducer Bank Account</h1>
      <p className="font-semibold">Balance: {balance}</p>
      <p className="font-semibold">Loan: {loan}</p>

      <p>
        <button
          className={`${classNameBtn} ${isAccountOpen ? disabled : ""}`}
          onClick={handleOpenAccount}
          disabled={isAccountOpen}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${!isAccountOpen ? disabled : ""}`}
          onClick={handleDeposit}
          disabled={!isAccountOpen}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${!isAccountOpen ? disabled : ""}`}
          onClick={handleWithdraw}
          disabled={!isAccountOpen}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${!isAccountOpen ? disabled : ""}`}
          onClick={handleRequestLoan}
          disabled={!isAccountOpen}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} ${!isAccountOpen ? disabled : ""}`}
          onClick={handlePayLoan}
          disabled={!isAccountOpen}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          className={`${classNameBtn} bg-red-400 ${
            !isAccountOpen ? disabled : ""
          }`}
          onClick={handleCloseAccount}
          disabled={!isAccountOpen}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
