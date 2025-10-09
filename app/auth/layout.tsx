export default function ResultsLayout(
  props: { children: React.ReactNode }
) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto min-h-full border-2 border-x">
      {props.children}
    </div>
  );
}