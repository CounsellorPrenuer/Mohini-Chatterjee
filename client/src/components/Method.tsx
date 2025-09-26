export default function Method() {
  const steps = [
    {
      number: 1,
      title: "Discover",
      description: "Psychometric assessments & self-awareness exercises",
      color: "bg-primary",
    },
    {
      number: 2,
      title: "Define",
      description: "Career mapping based on interests, strengths & industry trends",
      color: "bg-secondary",
    },
    {
      number: 3,
      title: "Design",
      description: "Personalized coaching plan with clear milestones",
      color: "bg-accent",
    },
    {
      number: 4,
      title: "Develop",
      description: "Ongoing mentorship, workshops, and lifelong learning resources",
      color: "bg-gradient-to-r from-primary to-secondary",
    },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-6">Our Approach – The Aakaar Method</h2>
          <p className="text-xl text-muted-foreground">
            We follow a 4-Step Framework to help clients gain career clarity and confidence
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-primary/50 to-secondary/50 transform -translate-y-1/2 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This ensures clients not only make the right choices today but also stay future-ready tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
