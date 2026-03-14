export default function SuspenseFallback() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
    </div>
  );
}
