import Link from "next/link"
import Image from "next/image"

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore the Chaos</h1>
        <p className="text-xl text-gray-600">
          Browse our collection of modules designed to help you survive the modern corporate landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: "Leadership Fundamentals",
            description: "How to sound like you know what you're saying while secretly hoping nobody asks a follow-up question.",
            image: "/images/herding-cats.png",
          },
          {
            title: "Strategic Planning",
            description: "Advanced techniques in Magic 8-Ball interpretation and dart-based decision making.",
            image: "/images/strategic-planning.png",
          },
          {
            title: "Team Management",
            description: "The delicate art of herding cats without getting scratched by HR.",
            image: "/images/herding-cats.png",
          },
          {
            title: "Communication Skills",
            description: "Perfecting the 'Per my last email' and other ways to professionally express deep annoyance.",
            image: "/interconnected-communication.png",
          },
          {
            title: "Conflict Resolution",
            description: "Putting out office fires without actually using water, because that would ruin the electronics.",
            image: "/images/conflict-resolution.png",
          },
          {
            title: "Remote Work Survival",
            description: "Mastering the 'Zoom filter' and finding the best place to hide from your family during a status call.",
            image: "/virtual-meeting-global-team.png",
          },
        ].map((module, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="relative h-40">
              <Image src={module.image} alt={module.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">{module.title}</h3>
              <p className="text-gray-600 text-sm">{module.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center border-t pt-8">
        <Link 
          href="/" 
          className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to the safety of the Home Page
        </Link>
      </div>
    </div>
  )
}
