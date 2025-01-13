export const FloatingElements = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0C1222,#000000)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black_70%,transparent_100%)]" />
    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[128px]" />
    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[128px]" />
  </div>
);
