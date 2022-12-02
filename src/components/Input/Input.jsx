export default function Input({
  type = "text",
  placeholder,
  id,
  name,
  error,
  onChange,
  label,
}) {

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`form-control form-control-sm ${error ? "is-invalid" : ""}`}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}