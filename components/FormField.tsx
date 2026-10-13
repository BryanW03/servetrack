interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  min?: number | string;
  step?: string;
  errors?: string[];
}

const fieldClass =
  'w-full rounded-lg border border-slate-500 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-800';

// Reusable accessible form field: label, optional hint, and an aria-live
// error area linked to the input with aria-describedby.
export default function FormField({
  id,
  name,
  label,
  type = 'text',
  defaultValue,
  required = false,
  placeholder,
  autoComplete,
  hint,
  multiline = false,
  rows = 3,
  min,
  step,
  errors,
}: FormFieldProps) {
  const hasError = Boolean(errors && errors.length > 0);
  const describedBy = [hint ? `${id}-hint` : null, `${id}-error`]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-900"
      >
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-1 text-xs text-slate-600">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          aria-describedby={describedBy}
          aria-invalid={hasError}
          className={fieldClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          step={step}
          aria-describedby={describedBy}
          aria-invalid={hasError}
          className={fieldClass}
        />
      )}
      <div id={`${id}-error`} aria-live="polite">
        {hasError && <p className="mt-1 text-sm text-red-800">{errors?.[0]}</p>}
      </div>
    </div>
  );
}
