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
          background: #f3f4f6;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }
        .ticket-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 12px;
        }
        .ticket-card {
          max-width: 800px;
          width: 100%;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        .ticket-header {
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          color: white;
          padding: 12px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        @media (min-width: 640px) {
          .ticket-header {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .ticket-header h1 {
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .ticket-header .subhead {
          font-size: 0.8rem;
          color: #bfdbfe;
          margin: 0;
        }
        .booking-ref {
          background: white;
          color: #1e3a8a;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .ticket-body {
          padding: 16px;
        }
        .passenger-route {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 12px;
        }
        @media (min-width: 640px) {
          .passenger-route {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .label {
          font-size: 0.7rem;
          color: #6b7280;
          display: block;
          margin-bottom: 2px;
        }
        .value {
          font-size: 0.95rem;
          font-weight: 500;
          color: #1f2937;
        }
        .route-codes {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .route-codes .code {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }
        .route-codes .arrow {
          font-size: 1.2rem;
          color: #9ca3af;
        }
        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px 12px;
          margin-bottom: 16px;
        }
        @media (min-width: 480px) {
          .details-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .details-grid > div {
          min-width: 0;
        }
        .details-grid .pet {
          grid-column: span 2;
        }
        @media (min-width: 480px) {
          .details-grid .pet {
            grid-column: span 1;
          }
        }
        .itinerary {
          margin-bottom: 16px;
        }
        .itinerary-header {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 6px;
          color: #374151;
        }
        .itinerary-header svg {
          width: 16px;
          height: 16px;
        }
        .stops-list {
          background: #f9fafb;
          border-radius: 8px;
          padding: 6px 8px;
          border: 1px solid #e5e7eb;
          font-size: 0.8rem;
        }
        .stop-item {
          display: flex;
          align-items: center;
          padding: 4px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .stop-item:last-child {
          border-bottom: none;
        }
        .stop-time {
          width: 65px;
          font-family: monospace;
          color: #4b5563;
          font-size: 0.75rem;
        }
        .stop-location {
          flex: 1;
          margin: 0 6px;
          color: #1f2937;
          word-break: break-word;
          font-size: 0.8rem;
        }
        .stop-layover {
          font-size: 0.65rem;
          color: #6b7280;
          white-space: nowrap;
        }
        .fare-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
        }
        @media (min-width: 640px) {
          .fare-row {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .fare {
          text-align: center;
        }
        .fare .amount {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e3a8a;
          line-height: 1.2;
        }
        .barcode {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .bars {
          display: flex;
          gap: 2px;
          height: 30px;
          align-items: flex-end;
        }
        .bar {
          width: 5px;
          background: #1f2937;
        }
        .bar.tall { height: 26px; }
        .bar.medium { height: 20px; }
        .bar.short { height: 14px; }
        .barcode-label {
          font-size: 0.6rem;
          color: #6b7280;
          margin-top: 2px;
        }
        .ticket-footer {
          font-size: 0.65rem;
          color: #9ca3af;
          text-align: center;
          margin-top: 16px;
        }
        @media (max-width: 480px) {
          .ticket-body { padding: 12px; }
          .details-grid { gap: 6px 8px; }
          .stop-time { width: 58px; }
          .fare .amount { font-size: 1.6rem; }
        }
        .download-btn {
          margin-top: 20px;
          padding: 10px 24px;
          background: #1e3a8a;
          color: white;
          border: none;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: background 0.2s;
        }
        .download-btn:hover {
          background: #2563eb;
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
            <div className="passenger-route">
              <div>
                <span className="label">Passenger</span>
                <span className="value">{ticketData.passengerName}</span>
              </div>
              <div className="route-codes">
                <div>
                  <span className="label">From</span>
                  <span className="code">{ticketData.route.fromCode}</span>
                </div>
                <div className="arrow">→</div>
                <div>
                  <span className="label">To</span>
                  <span className="code">{ticketData.route.toCode}</span>
                </div>
              </div>
            </div>

            <div className="details-grid">
              <div><span className="label">Date</span><span className="value">{ticketData.date}</span></div>
              <div><span className="label">Departure</span><span className="value">{ticketData.departureTime}</span></div>
              <div><span className="label">Arrival</span><span className="value">{ticketData.arrivalTime}</span></div>
              <div><span className="label">Duration</span><span className="value">{ticketData.duration}</span></div>
              <div><span className="label">Seat</span><span className="value">{ticketData.seat}</span></div>
              <div><span className="label">Gate/Bay</span><span className="value">{ticketData.gate}</span></div>
              <div className="pet"><span className="label">Pet</span><span className="value">{ticketData.pet ? '✓ Small carrier allowed' : 'No pet'}</span></div>
            </div>

            <div className="itinerary">
              <div className="itinerary-header">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Itinerary</span>
              </div>
              <div className="stops-list">
                {ticketData.stops.map((stop, idx) => (
                  <div key={idx} className="stop-item">
                    <span className="stop-time">{stop.time}</span>
                    <span className="stop-location">{stop.location}</span>
                    <span className="stop-layover">{stop.layover}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fare-row">
              <div className="fare">
                <span className="label">Total paid</span>
                <span className="amount">${ticketData.price.toFixed(2)}</span>
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
              Arrive 15 min prior. Pet carrier must fit under seat. This e-ticket is valid with ID.
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