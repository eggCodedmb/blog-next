interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
function Input({ icon, rightIcon, ...props }: InputProps) {
  return (
    <div className="flex items-center bg-surface border border-theme rounded-xl px-3 py-2 focus-within-border-primary transition">
      <div className="text-muted mr-2">{icon}</div>
      <input
        className="bg-transparent outline-none w-full text-sm text-theme placeholder:text-muted"
        {...props}
      />
      {rightIcon && (
        <div className="text-muted flex items-center ">{rightIcon}</div>
      )}
    </div>
  );
}

export default Input;
