export function Fallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-accent/15 via-transparent to-accent-2/10" />
      <div className="absolute top-[22%] right-[14%] size-72 rounded-full bg-accent/18 blur-3xl" />
      <div className="absolute bottom-[24%] right-[26%] size-48 rounded-full bg-accent-2/14 blur-3xl" />
      <div className="absolute top-1/2 right-[18%] h-40 w-56 -translate-y-1/2 rounded-2xl border border-accent/20 bg-surface/20 backdrop-blur-sm" />
    </div>
  );
}
