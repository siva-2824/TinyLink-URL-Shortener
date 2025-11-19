export default function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">TinyLink</h1>
        <nav className="text-sm text-gray-600">Built for the take-home</nav>
      </div>
    </header>
  );
}