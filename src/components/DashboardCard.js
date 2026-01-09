const DashboardCard = ({
  title,
  subtitle,
  actionText,
  onAction,
  disabled = false
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 p-6 shadow-sm
        transition transform hover:-translate-y-1 hover:shadow-lg
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>

      <button
        onClick={onAction}
        disabled={disabled}
        className={`mt-5 w-full py-2.5 rounded-lg text-sm font-medium text-white
          transition focus:outline-none focus:ring-2 focus:ring-blue-300
          ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {actionText}
      </button>
    </div>
  );
};

export default DashboardCard;
