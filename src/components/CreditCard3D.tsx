'use client'

export function CreditCard3D() {
  return (
    <div className="cc-wrapper">
      {/* Main card face — hover target */}
      <div className="cc-box">
        {/* Card content sits above the ::before sweep */}
        <div className="cc-content">
          <div className="cc-top">
            <span className="cc-logo">ether.fi</span>
            <svg className="cc-visa" width="48" height="16" viewBox="0 0 48 16" fill="none">
              <text x="0" y="13" fontFamily="serif" fontWeight="700" fontSize="16" fill="rgba(250,248,243,0.4)">VISA</text>
            </svg>
          </div>

          <div className="cc-mid">
            <div className="cc-chip" />
          </div>

          <div className="cc-bot">
            <div className="cc-number">•••• •••• •••• 4829</div>
            <div className="cc-row">
              <div>
                <div className="cc-label">Card Holder</div>
                <div className="cc-val">Your Name</div>
              </div>
              <div className="cc-right">
                <div className="cc-label">Expires</div>
                <div className="cc-val">12/28</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ring — border outline at z-offset */}
      <div className="cc-ring" />

      {/* Shadow — dark layer behind at negative z */}
      <div className="cc-shadow" />
    </div>
  )
}
