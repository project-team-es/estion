import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export const TextInput = forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, error = false, ...props },
  ref
) {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={
        `block w-full rounded-md px-4 py-1 focus:border-blue-500 focus:ring-blue-500 md:py-2 ` +
        (error ? 'border-red-500' : '') +
        className
      }
      ref={localRef}
    />
  );
});
