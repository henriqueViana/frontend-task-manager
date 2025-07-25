type InputProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};
export const Input = ({ label, error, children }: InputProps) => {
  return (
    <>
      {label && (
        <label className="block text-sm font-medium mb-1 mt-3 text-default-black">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};
