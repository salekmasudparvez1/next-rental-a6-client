


import "@/app/style/splash.css";

const SplashScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen absolute w-full h-full bg-linear-to-br from-blue-50 via-white to-purple-50 z-50">
      <div className="loader-container">
        <div className="loader">
      <div className="truckWrapper">
        <div className="truckBody">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 198 93"
            className="trucksvg"
          >
            <path
              strokeWidth="3"
              stroke="#ff0000 "
              fill="#ff0000 "
              d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
            />
            <path
              strokeWidth="3"
              stroke="#1f2937"
              fill="#6366f1"
              d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
            />
            <path
              strokeWidth="2"
              stroke="#1f2937"
              fill="#1f2937"
              d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
            />
            <rect
              strokeWidth="2"
              stroke="#1f2937"
              fill="#fbbf24"
              rx="1"
              height="7"
              width="5"
              y="63"
              x="187"
            />
            <rect
              strokeWidth="2"
              stroke="#1f2937"
              fill="#1f2937"
              rx="1"
              height="11"
              width="4"
              y="81"
              x="193"
            />
            <rect
              strokeWidth="3"
              stroke="#1f2937"
              fill="#e5e7eb"
              rx="2.5"
              height="90"
              width="121"
              y="1.5"
              x="6.5"
            />
            <rect
              strokeWidth="2"
              stroke="#1f2937"
              fill="#9ca3af"
              rx="2"
              height="4"
              width="6"
              y="84"
              x="1"
            />
          </svg>
        </div>

        <div className="truckTires">
          {[1, 2].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              className="tiresvg"
            >
              <circle
                strokeWidth="3"
                stroke="#1f2937"
                fill="#1f2937"
                r="13.5"
                cy="15"
                cx="15"
              />
              <circle fill="#9ca3af" r="7" cy="15" cx="15" />
            </svg>
          ))}
        </div>

        <div className="road" />

        <svg
          viewBox="0 0 453.459 453.459"
          xmlns="http://www.w3.org/2000/svg"
          className="lampPost"
        >
          <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993..." />
        </svg>
      </div>
        </div>
        <div className="loading-text-container">
          <h2 className="loading-title">House Rental</h2>
          <p className="loading-subtitle">Finding your perfect home...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
