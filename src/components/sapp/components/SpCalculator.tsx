import React, { useState, useEffect } from 'react';

const SpCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [hasCoupon, setHasCoupon] = useState<boolean>(false);
  const [isVip, setIsVip] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // 로컬 스토리지에서 다크모드 설정 불러오기
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // 다크모드 설정 저장
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const calculateFee = () => {
    if (!amount) return 0;
    
    let fee = parseInt(amount) * 0.05;
    
    if (hasCoupon) {
      fee *= 0.7; // 30% 할인
    }
    
    if (isVip) {
      fee *= 0.9; // 추가 10% 할인
    }
    
    return Math.floor(fee);
  };

  const finalAmount = amount ? parseInt(amount) - calculateFee() : 0;

  return (
    <div className={`spCalculator ${isDarkMode ? 'dark' : ''}`}>
      <div className="calculatorHeader">
        <h1>SP Fee Calculator</h1>
        <p>Check final amount with fee discounts</p>
      </div>

      <div className="calculatorInput">
        <label>SP Amount</label>
        <div className="inputWrapper">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
          />
          <span className="unit">SP</span>
        </div>
      </div>

      <div className="discountOptions">
        <div className="discountOption">
          <span>30% Fee Discount Coupon</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={hasCoupon}
              onChange={(e) => setHasCoupon(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="discountOption">
          <span>VIP Additional 10% Discount</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isVip}
              onChange={(e) => setIsVip(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="calculatorResult">
        <div className="resultItem">
          <span>Fee Amount</span>
          <strong>{calculateFee().toLocaleString()}</strong>
        </div>
        <div className="resultItem">
          <span>Final Amount</span>
          <strong>{finalAmount.toLocaleString()}</strong>
        </div>
      </div>

      <div className="darkModeToggle">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
};

export default SpCalculator; 