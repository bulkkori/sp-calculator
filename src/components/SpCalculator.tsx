'use client';
import { useState } from 'react';

export default function SpCalculator() {
  const [amount, setAmount] = useState('');
  const [hasCoupon, setHasCoupon] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isVvip, setIsVvip] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setAmount(value);
    }
  };

  const calculateFee = () => {
    if (!amount) return { fee: 0, discount: 0 };
    const numAmount = parseFloat(amount);
    const baseFee = Math.round(numAmount * 0.1);
    let discount = 0;

    if (hasCoupon) {
      discount += Math.round(baseFee * 0.3);
    }

    if (isVip) {
      discount += Math.round(baseFee * 0.1);
    }
    else if (isVvip) {
      discount += Math.round(baseFee * 0.2);
    }

    return {
      fee: baseFee,
      discount: discount
    };
  };

  const handleVipChange = (checked: boolean) => {
    if (checked) {
      setIsVvip(false);
    }
    setIsVip(checked);
  };

  const handleVvipChange = (checked: boolean) => {
    if (checked) {
      setIsVip(false);
    }
    setIsVvip(checked);
  };

  const { fee, discount } = calculateFee();
  const finalFee = fee - discount;
  const finalAmount = amount ? parseFloat(amount) - finalFee : 0;

  return (
    <div className="spCalculator">
      <div className="calculatorHeader">
        <h1>SP 수수료 계산기</h1>
        <p>수수료 할인을 적용하여 최종 금액을 확인하세요</p>
      </div>

      <div className="calculatorInput">
        <label>판매할 금액</label>
        <div className="inputWrapper">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={handleAmountChange}
            placeholder="금액을 입력하세요"
          />
          <span className="unit">SP</span>
        </div>
      </div>

      <div className="discountOptions">
        <div className="discountOption">
          <span>30% 할인권</span>
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
          <span>VIP 10% 할인 버프</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isVip}
              onChange={(e) => handleVipChange(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="discountOption">
          <span>VVIP 20% 할인 버프</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isVvip}
              onChange={(e) => handleVvipChange(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="calculatorResult">
        <div className="resultItem">
          <span>판매 금액</span>
          <strong>{amount ? parseInt(amount).toLocaleString() : 0} SP</strong>
        </div>
        <div className="resultItem">
          <span>기본 수수료 (10%)</span>
          <strong>{fee.toLocaleString()} SP</strong>
        </div>
        <div className="resultItem">
          <span>수수료 할인</span>
          <strong>{discount.toLocaleString()} SP</strong>
        </div>
        <div className="resultItem">
          <span>최종 수수료</span>
          <strong>{finalFee.toLocaleString()} SP</strong>
        </div>
        <div className="resultItem">
          <span>체결금액</span>
          <strong>{Math.round(finalAmount).toLocaleString()} SP</strong>
        </div>
      </div>
    </div>
  );
} 