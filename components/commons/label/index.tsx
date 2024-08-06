interface ILabel {
  children: React.ReactNode;
  htmlFor?: string;
}

export default function Label({ htmlFor, children }: ILabel) {
  return (
    <label
      htmlFor={htmlFor}
      className="capitalize text-secondary-medium antialiased"
    >
      {children}
    </label>
  );
}
