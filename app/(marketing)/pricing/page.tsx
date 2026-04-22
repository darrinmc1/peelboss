import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <Badge className="mb-4">Pricing</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Invest in Your Sanity
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your level of corporate despair. 
          All plans include a complimentary "It is what it is" sticker*.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Basic Plan */}
        <Card className="border shadow-md flex flex-col">
          <CardHeader>
            <CardTitle>The "Just Started" (Free)</CardTitle>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $0<span className="ml-1 text-xl font-medium text-muted-foreground">/life</span>
            </div>
            <CardDescription className="mt-4 text-base">
              For those who still believe they can change the world (or at least the coffee filter).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 mb-8">
              {[
                "Access to 5 modules you'll probably skim",
                "Basic progress tracking (mostly 'In Progress')",
                "Community forum access for venting",
                "Email support that replies 'Did you restart it?'",
                "0.01% chance of a promotion",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-auto" variant="outline" asChild>
              <Link href="/signup">Start Winging It</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Professional Plan */}
        <Card className="relative border-2 border-emerald-500 shadow-xl flex flex-col scale-105 bg-emerald-50/10">
          <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
            MOST POPULAR (BY ACCIDENT)
          </div>
          <CardHeader>
            <CardTitle>The "Middle Manager"</CardTitle>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $29<span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
            </div>
            <CardDescription className="mt-4 text-base text-emerald-900 font-medium">
              For professionals who have accepted their fate and want better excuses.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 mb-8">
              {[
                "Access to all 20+ survival modules",
                "Advanced 'LinkedIn Ready' analytics",
                "Interactive 'Reply-All' simulators",
                "Downloadable 'Out of Office' templates",
                "Priority support (we'll reply in 24 hours)",
                "Digital certificate you can't print on office paper",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-auto bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
              <Link href="/signup">Advance Your Cynicism</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card className="border shadow-md flex flex-col">
          <CardHeader>
            <CardTitle>The "Corporate Overlord"</CardTitle>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $99<span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
            </div>
            <CardDescription className="mt-4 text-base">
              For organizations looking to automate the herding of their own cats.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Middle Manager",
                "Team 'Despair' dashboard",
                "Custom 'Synergy' learning paths",
                "Dedicated Account Manager (human-ish)",
                "Bulk user management (more cats)",
                "Custom modules (we'll build your chaos)",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-auto" variant="outline" asChild>
              <Link href="/signup">Contact Sales Overlords</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground italic">
        *Stickers are digital and subject to your monitor's resolution. No actual sanity is guaranteed.
      </p>
    </div>
  )
}
