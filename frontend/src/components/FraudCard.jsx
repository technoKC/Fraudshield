import React, { useState, useEffect } from 'react';

function FraudCard({ data }) {
  const { payer, vpa, amount, gan_score, prediction, explanation } = data;

  const isSuspiciousLink = /pay|rzp|win|gift|bonus|click/i.test(vpa);
  const isLoanScam = /loan|cashback|credit/i.test(vpa);

  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (!(prediction === "Fraud" || isSuspiciousLink || isLoanScam)) {
      setStatus("Verified");
    }
  }, [prediction, isSuspiciousLink, isLoanScam]);

  const getColor = (score) => {
    if (score >= 0.8) return 'red';
    if (score >= 0.5) return 'orange';
    return 'green';
  };

  return (
    <div className="fraud-card">
      <div className="card-top">
        <span className={`tag ${prediction === 'Fraud' ? 'fraud' : 'legit'}`}>
          {prediction}
        </span>
        <span className={`score-badge ${getColor(gan_score)}`}>
          GAN: {gan_score}
        </span>
      </div>

      <p><strong>Payer:</strong> {payer}</p>
      <p><strong>VPA:</strong> {vpa}</p>
      <p><strong>Amount:</strong> ₹{amount}</p>

      {isSuspiciousLink && (
        <p style={{ color: '#cc0000', fontWeight: 'bold' }}>
          ⚠️ Fake Payment Link Detected
        </p>
      )}

      {isLoanScam && (
        <p style={{ color: '#cc0000', fontWeight: 'bold' }}>
          ⚠️ Loan Scam Detected
        </p>
      )}

      <div className="explanation">
        💬 <strong>AI Insight:</strong> {explanation}
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Status:</strong> {status}
        {status === "Pending" && (
          <>
            <br />
            <button
              onClick={() => setStatus("Blocked")}
              style={{
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                margin: '6px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              🚫 Block
            </button>
            <button
              onClick={() => setStatus("Verified")}
              style={{
                background: 'green',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                margin: '6px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              ✅ Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FraudCard;
