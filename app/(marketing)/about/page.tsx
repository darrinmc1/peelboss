import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Peel Boss</h1>
        <p className="text-2xl text-emerald-600 font-medium mb-8 italic">
          "Because your team isn't going to herd themselves."
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl skew-y-3">
          <Image
            src="/images/herding-cats.png"
            alt="The CEO herding cats"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our "Noble" Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Founded in a windowless conference room during a three-hour meeting about "meeting efficiency," 
            Peel Boss was born out of a desperate need for a reality check in corporate training.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We don't promise to turn you into Steve Jobs or Elon Musk. We promise to help you survive 
            Monday morning without crying in the supply closet. 
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-3xl p-12 mb-20 text-center">
        <h2 className="text-3xl font-bold mb-8">What We Believe In</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold mb-2">Email Minimalism</h3>
              <p className="text-sm text-gray-500">If it's more than three lines, call me. No, wait, don't call me. Just don't send it.</p>
          </div>
          <div>
              <div className="text-4xl mb-4">🐈</div>
              <h3 className="font-bold mb-2">Cat Respect</h3>
              <p className="text-sm text-gray-500">Your employees are cats. Stop trying to make them dogs. Just provide the treats (money).</p>
          </div>
          <div>
              <div className="text-4xl mb-4">🍌</div>
              <h3 className="font-bold mb-2">Potassium First</h3>
              <p className="text-sm text-gray-500">A healthy snack is a healthy mind. Or at least it's a snack.</p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">The Management Team</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Top Banana",
              role: "Founder & CEO",
              desc: "Reformed micromanager, now full-time corporate survivalist. Still won't let anyone touch the thermostat.",
              img: "/images/ceo-banana.png",
            },
            {
              name: "Strategy Banana",
              role: "Chief Chaos Officer",
              desc: "Expert in over-analyzing 4 screens at once until they all turn blue.",
              img: "/images/consultant-banana.png",
            },
            {
              name: "Zen Banana",
              role: "Head of Panic Management",
              desc: "Stays yellow under pressure. Master of the 5-minute nap.",
              img: "/images/yogi-banana.png",
            },
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="relative w-32 h-32 mx-auto mb-6 bg-emerald-100 rounded-full p-2">
                <Image src={member.img} alt={member.name} fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-emerald-600 font-medium mb-4">{member.role}</p>
              <p className="text-sm text-gray-500 italic">"{member.desc}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Join the Resistance?</h2>
        <p className="text-xl text-gray-600 mb-8">
            Upgrade your management style from 'Panicked' to 'Professionally Detached'.
        </p>
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-14 px-10 text-lg" asChild>
            <Link href="/signup">Start Your Survival Kit</Link>
        </Button>
      </div>
    </div>
  )
}
