import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const ticketData = {
  passengerName: 'Gina Wells',
  bookingRef: 'NW2403-10A',
  route: {
    from: 'Boise, ID',
    to: 'Portland, OR',
    fromCode: 'BOI',
    toCode: 'PDX',
  },
  date: 'Tue, Mar 10, 2026',
  departureTime: '8:15 AM',
  arrivalTime: '5:30 PM',
  duration: '10h 15m',
  operator: 'Northwestern Stage Lines',
  seat: '3C',
  gate: 'Bay 4',
  pet: true,
  price: 71.99,
  stops: [
    { time: '8:15 AM', location: 'Boise Airport', layover: '—' },
    { time: '8:45 AM', location: 'Nampa (Maverik)', layover: '0 min' },
    { time: '9:30 AM', location: 'Ontario (Malheur Council)', layover: '10 min' },
    { time: '9:45 AM', location: 'Baker City (Truck Corral)', layover: '0 min' },
    { time: '10:35 AM', location: 'La Grande Bus Station', layover: '0 min' },
    { time: '11:30 AM', location: 'Pendleton Market', layover: '15 min' },
    { time: '12:25 PM', location: 'Hermiston (Space Age Travel)', layover: '0 min' },
    { time: '1:10 PM', location: 'Pasco Bus Stop', layover: '15 min' },
    { time: '2:25 PM', location: 'Boardman (Sinclair Station)', layover: '0 min' },
    { time: '3:40 PM', location: 'The Dalles (Transit Facility)', layover: '15 min' },
    { time: '4:20 PM', location: 'Hood River (Columbia Area Transit)', layover: '0 min' },
    { time: '5:30 PM', location: 'Portland Train Station', layover: '—' },
  ],
};

const BusTicket = () => {
  const ticketRef = useRef(null);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        allowTaint: false,
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'bus-ticket.png';
      link.click();
    } catch (error) {
      console.error('Error capturing ticket:', error);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background: #f0f2f5;
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }
        .ticket-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }
        .ticket-card {
          max-width: 820px;
          width: 100%;
          background: white;
          border-radius: 28px;
          box-shadow: 0 30px 60px -20px rgba(0,20,40,0.25), 0 0 0 1px rgba(0,0,0,0.02) inset;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .ticket-header {
          background: #0b1f3a;
          padding: 20px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }
        .ticket-header h1 {
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.2;
        }
        .ticket-header .subhead {
          font-size: 0.75rem;
          color: #a0b8d4;
          margin: 2px 0 0;
        }
        .booking-ref {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          padding: 6px 16px;
          margin-left: 8px;
          border-radius: 60px;
          font-size: 0.76rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .ticket-body {
          padding: 24px 28px 28px;
        }
        /* passenger row */
        .passenger-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #eef2f6;
        }
        .passenger-name {
          display: flex;
          flex-direction: column;
        }
        .passenger-name .label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: #64748b;
        }
        .passenger-name .value {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0b1f3a;
          margin-top: 2px;
        }
        .route-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f5f8ff;
          padding: 8px 16px;
          border-radius: 40px;
          border: 1px solid #dbe7f5;
        }
        .route-badge .code {
          font-weight: 800;
          font-size: 1.2rem;
          color: #0b1f3a;
        }
        .route-badge .arrow {
          color: #94a3b8;
          font-size: 1.2rem;
        }
        /* info grid */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px 12px;
          margin-bottom: 28px;
        }
        .info-item {
          background: #f9fafc;
          border-radius: 16px;
          padding: 12px 8px;
          text-align: center;
          border: 1px solid #edf2f7;
        }
        .info-item .label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #5f6c84;
          letter-spacing: 0.02em;
        }
        .info-item .value {
          font-size: 1rem;
          font-weight: 700;
          color: #0b1f3a;
          margin-top: 4px;
        }
        .info-item.pet .value {
          color: #9b51e0;
        }
        /* itinerary */
        .itinerary {
          margin-bottom: 24px;
        }
        .itinerary-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #1e293b;
          margin-bottom: 14px;
        }
        .stops-container {
          background: #f8fafd;
          border-radius: 20px;
          padding: 12px;
          border: 1px solid #e6edf5;
        }
        .stop-row {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px dashed #d0ddeb;
        }
        .stop-row:last-child {
          border-bottom: none;
        }
        .stop-time {
          width: 70px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 500;
          color: #1f3a5f;
        }
        .stop-location {
          flex: 1;
          margin: 0 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1e293b;
        }
        .stop-layover {
          font-size: 0.7rem;
          font-weight: 500;
          color: #5f6c84;
          background: #e9eef5;
          padding: 2px 8px;
          border-radius: 30px;
        }
        /* fare row */
        .fare-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 2px solid #eef2f6;
        }
        .fare {
          text-align: left;
        }
        .fare .label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #64748b;
        }
        .fare .amount {
          font-size: 2rem;
          font-weight: 800;
          color: #0b1f3a;
          line-height: 1.2;
        }
        .barcode {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .bars {
          display: flex;
          gap: 3px;
          height: 38px;
          align-items: flex-end;
        }
        .bar {
          width: 6px;
          background: #0b1f3a;
          border-radius: 3px 3px 0 0;
        }
        .bar.tall { height: 34px; }
        .bar.medium { height: 26px; }
        .bar.short { height: 18px; }
        .barcode-label {
          font-size: 0.65rem;
          color: #6f7c91;
          margin-top: 6px;
        }
        .ticket-footer {
          margin-top: 24px;
          font-size: 0.7rem;
          color: #7f8a9e;
          text-align: center;
          border-top: 1px dashed #cfddee;
          padding-top: 16px;
        }
        .download-btn {
          margin-top: 28px;
          padding: 12px 30px;
          background: #0b1f3a;
          color: white;
          border: none;
          border-radius: 60px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 20px -12px rgba(11,31,58,0.4);
          transition: background 0.2s, transform 0.1s;
        }
        .download-btn:hover {
          background: #14345c;
          transform: scale(1.02);
        }
        @media (max-width: 550px) {
          .info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .route-badge {
            margin-top: 10px;
            width: 100%;
            justify-content: center;
          }
          .passenger-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .fare-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .barcode {
            align-items: flex-start;
            width: 100%;
          }
          .bars {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="ticket-container">
        <div className="ticket-card" ref={ticketRef}>
          <div className="ticket-header">
            <div>
              <h1>NORTHWESTERN</h1>
              <p className="subhead">stage lines • premium express</p>
            </div>
            <div className="booking-ref">{ticketData.bookingRef}</div>
          </div>

          <div className="ticket-body">
            {/* Passenger & Route */}
            <div className="passenger-row">
              <div className="passenger-name">
                <span className="label">Passenger</span>
                <span className="value">{ticketData.passengerName}</span>
              </div>
              <div className="route-badge">
                <span className="code">{ticketData.route.fromCode}</span>
                <span className="arrow">→</span>
                <span className="code">{ticketData.route.toCode}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="info-grid">
              <div className="info-item">
                <div className="label">Date</div>
                <div className="value">{ticketData.date}</div>
              </div>
              <div className="info-item">
                <div className="label">Departure</div>
                <div className="value">{ticketData.departureTime}</div>
              </div>
              <div className="info-item">
                <div className="label">Arrival</div>
                <div className="value">{ticketData.arrivalTime}</div>
              </div>
              <div className="info-item">
                <div className="label">Duration</div>
                <div className="value">{ticketData.duration}</div>
              </div>
              <div className="info-item">
                <div className="label">Seat</div>
                <div className="value">{ticketData.seat}</div>
              </div>
              <div className="info-item">
                <div className="label">Gate/Bay</div>
                <div className="value">{ticketData.gate}</div>
              </div>
              <div className="info-item pet">
                <div className="label">Pet</div>
                <div className="value">{ticketData.pet ? '✓ Allowed' : 'No'}</div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="itinerary">
              <div className="itinerary-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="2">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Journey Stops</span>
              </div>
              <div className="stops-container">
                {ticketData.stops.map((stop, idx) => (
                  <div key={idx} className="stop-row">
                    <span className="stop-time">{stop.time}</span>
                    <span className="stop-location">{stop.location}</span>
                    <span className="stop-layover">{stop.layover}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare & Barcode */}
            <div className="fare-row">
              <div className="fare">
                <span className="label">Total paid</span>
                <div className="amount">${ticketData.price.toFixed(2)}</div>
              </div>
              <div className="barcode">
                <div className="bars">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className={`bar ${i % 3 === 0 ? 'tall' : i % 2 === 0 ? 'medium' : 'short'}`} />
                  ))}
                </div>
                <span className="barcode-label">Scan for boarding</span>
              </div>
            </div>

            <div className="ticket-footer">
              Arrive 15 min prior • Pet carrier under seat • Valid with ID
            </div>
          </div>
        </div>

        <button className="download-btn" onClick={handleDownload}>
          ⬇️ Download as Image
        </button>
      </div>
    </>
  );
};

export default BusTicket;