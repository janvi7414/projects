import Navbar from "../components/Navbar"

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">About</h1>
          <div className="p-8 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
            <p className="text-gray-700">
              This is the About page. Notice how the navbar highlights the active link.
            </p>
            <h2 className="text-2xl font-semibold mt-6">Features Included:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Responsive design with hamburger menu</li>
              <li>Dark/light mode toggle</li>
              <li>Active link highlighting</li>
              <li>Hover effects with underline animation</li>
              <li>Sticky navbar with scroll effects</li>
              <li>Smooth transitions</li>
              <li>ARIA accessibility labels</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
