import Icon from "./Icon";

const Steps = ({ currentStep, steps }) => {
  const stepWidthPercentage = 100 / steps.length;
  const lineOffset = stepWidthPercentage / 2;

  return (
    <div className="flex items-center justify-between w-full mb-24 relative select-none">
      {/* Connecting Line Background */}
      <div
        className="absolute z-0 rounded-full"
        style={{
          height: "1px",
          top: "15px",
          left: `${lineOffset}%`,
          right: `${lineOffset}%`,
          backgroundColor: "#e2e8f0"
        }}
      />

      {/* Connecting Line Active Progress */}
      <div
        className="absolute bg-primary z-0 rounded-full"
        style={{
          height: "2px",
          top: "15px",
          left: `${lineOffset}%`,
          width: `${((currentStep - 1) / (steps.length - 1)) * (100 - lineOffset * 2)}%`
        }}
      />

      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={idx} className="flex flex-column items-center z-10 relative">
            {/* Step Circle */}
            <div
              className={`rounded-full flex items-center justify-center font-500 ${isCompleted
                ? "bg-success text-white"
                : isActive
                  ? "bg-primary text-white"
                  : "bg-white text-gray"
                }`}
              style={{
                width: "30px",
                height: "30px",
                border: isCompleted
                  ? "1px solid var(--success)"
                  : isActive
                    ? "1px solid var(--primary)"
                    : "1px solid var(--gray)"
              }}
            >
              {isCompleted ? (
                <Icon name="Check" width="16" height="16" stroke="white" strokeWidth="3" />
              ) : (
                <p className="mini-text">{stepNum}</p>
              )}
            </div>

            {/* Step Label */}
            <p
              className={`mt-8 mini-text font-400 text-center ${isCompleted || isActive ? "text-dark font-500" : "text-gray"
                }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
