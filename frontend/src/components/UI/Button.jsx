export default function Button({ 
    children, 
    type = 'button', 
    disabled = false, 
    className = '',
    ...props 
  }) {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`py-2 px-4 rounded-lg font-medium transition ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-blue-700'
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }