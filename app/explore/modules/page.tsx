import Link from "next/link"

export default function ModulesPage() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>All Modules</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Browse our complete collection of management training modules.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { title: "Leadership Fundamentals", description: "Learn the basics of effective leadership" },
          { title: "Strategic Planning", description: "Develop strategic planning skills" },
          { title: "Team Management", description: "Learn to manage teams effectively" },
          { title: "Communication Skills", description: "Improve your communication skills" },
          { title: "Project Management", description: "Master project management techniques" },
          { title: "Conflict Resolution", description: "Learn to resolve workplace conflicts" },
          { title: "Performance Management", description: "Improve team performance" },
          { title: "Change Management", description: "Navigate organizational change" },
        ].map((module, index) => (
          <div
            key={index}
            style={{
              padding: "1rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "0.25rem",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{module.title}</h3>
            <p>{module.description}</p>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #eaeaea", paddingTop: "1rem" }}>
        <Link
          href="/explore"
          style={{
            color: "#0070f3",
            textDecoration: "none",
            marginRight: "1rem",
          }}
        >
          Back to Explore
        </Link>
        <Link
          href="/"
          style={{
            color: "#0070f3",
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
