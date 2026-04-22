import { redirect } from "next/navigation"
import { modules } from "@/data/modules"

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const selectedModule = modules[moduleId]

  if (!selectedModule) {
    return redirect("/modules")
  }

  // Redirect to the module overview page
  return redirect(`/modules/${moduleId}/overview`)
}
