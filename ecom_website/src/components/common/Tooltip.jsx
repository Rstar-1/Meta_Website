const Tooltip = ({ children, content }) => {
  return (
    <div className="relative group inline-block">
      {children}
      {content && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-8 hidden group-hover:block bg-dark text-white text-xs py-4 px-8 rounded whitespace-nowrap z-50">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
