interface LockScreenProps {
  time: string;
  date: string;
  isHolding: boolean;
}

export default function LockScreen({ time, date, isHolding }: LockScreenProps) {
  return (
    <div className={`lockScreen ${isHolding ? 'holding' : ''}`}>
      <div className="time">{time}</div>
      <div className="date">{date}</div>
      <div className="unlockText">
        {isHolding ? "계속 눌러서 잠금해제" : "길게 눌러서 잠금해제"}
      </div>
    </div>
  );
} 