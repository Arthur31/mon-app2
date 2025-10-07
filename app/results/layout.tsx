export default function ResultsLayout(
    props: { children: React.ReactNode }
) {
  return (
    <div className="p-4 border-2 border-blue-500">
        <h1>Results Layout</h1>
        {props.children}
    </div>
  );
}