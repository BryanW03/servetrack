export default function Footer() {
  return (
    <footer className="border-t border-slate-200 text-slate-500 text-xs text-center py-5 mt-12">
      <p>ServeTrack &middot; {new Date().getFullYear()}</p>
    </footer>
  );
}
