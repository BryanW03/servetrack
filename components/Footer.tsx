export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-300 py-5 text-center text-xs text-slate-600">
      <p>ServeTrack &middot; {new Date().getFullYear()}</p>
    </footer>
  );
}
