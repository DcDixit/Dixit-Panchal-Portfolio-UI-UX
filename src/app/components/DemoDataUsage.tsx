/**
 * DEMO: How to use Portfolio Data in Your Components
 * 
 * This file demonstrates how to access and use the portfolio data
 * from the admin panel in your components.
 * 
 * Copy this pattern to update HomePage, AboutPage, etc.
 */

import { usePortfolio } from "../contexts/PortfolioContext";
import { getIconComponent } from "../utils/iconMapper";

export function DemoDataUsage() {
  // 1. Get portfolio data using the hook
  const { data } = usePortfolio();

  return (
    <div className="p-8 space-y-12">
      
      {/* EXAMPLE 1: Using Personal Info */}
      <section>
        <h2 className="text-2xl mb-4">Personal Information</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {data.personal.name}</p>
          <p><strong>Title:</strong> {data.personal.title}</p>
          <p><strong>Location:</strong> {data.personal.location}</p>
          <p><strong>Email:</strong> {data.personal.email}</p>
          <p><strong>Bio:</strong> {data.personal.bio}</p>
          
          {data.personal.profileImage && (
            <img 
              src={data.personal.profileImage} 
              alt={data.personal.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>
      </section>

      {/* EXAMPLE 2: Using Hero Section */}
      <section>
        <h2 className="text-2xl mb-4">Hero Section</h2>
        <div className="space-y-2">
          <p className="text-sm bg-blue-100 inline-block px-3 py-1 rounded">
            {data.hero.statusText}
          </p>
          <h1 className="text-4xl">{data.hero.headline}</h1>
          <h2 className="text-2xl text-blue-600">{data.hero.subheadline}</h2>
          <p className="text-gray-600">{data.hero.description}</p>
        </div>
      </section>

      {/* EXAMPLE 3: Using Stats */}
      <section>
        <h2 className="text-2xl mb-4">Statistics</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <div className="text-3xl">{data.stats.projectsCompleted}</div>
            <p className="text-sm text-gray-600">Projects</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <div className="text-3xl">{data.stats.happyClients}</div>
            <p className="text-sm text-gray-600">Clients</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <div className="text-3xl">{data.stats.awards}</div>
            <p className="text-sm text-gray-600">Awards</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <div className="text-3xl">{data.stats.experience}</div>
            <p className="text-sm text-gray-600">Years</p>
          </div>
        </div>
      </section>

      {/* EXAMPLE 4: Using Skills (with icon mapper) */}
      <section>
        <h2 className="text-2xl mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.skills.map((skill) => (
            <div key={skill.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getIconComponent(skill.icon, "w-6 h-6 text-blue-600")}
                <h3 className="text-lg">{skill.category}</h3>
              </div>
              <ul className="space-y-1">
                {skill.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLE 5: Using Projects */}
      <section>
        <h2 className="text-2xl mb-4">Projects</h2>
        <div className="grid grid-cols-3 gap-4">
          {data.projects.map((project) => (
            <div key={project.id} className="bg-white border rounded-lg overflow-hidden">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.featured && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mt-2 inline-block">
                    Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLE 6: Using Industries (with icon mapper) */}
      <section>
        <h2 className="text-2xl mb-4">Industries</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.industries.map((industry) => (
            <div key={industry.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getIconComponent(industry.icon, "w-6 h-6 text-blue-600")}
                </div>
                <div>
                  <h3 className="text-lg mb-1">{industry.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{industry.description}</p>
                  <p className="text-xs text-blue-600">{industry.projectCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLE 7: Using Experience */}
      <section>
        <h2 className="text-2xl mb-4">Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{exp.period}</p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{exp.description}</p>
              <ul className="space-y-1">
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    ✓ {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLE 8: Using Case Studies */}
      <section>
        <h2 className="text-2xl mb-4">Case Studies</h2>
        <div className="space-y-6">
          {data.caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="bg-white border rounded-lg overflow-hidden">
              {caseStudy.image && (
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl mb-2">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-4">{caseStudy.subtitle}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm uppercase text-gray-500 mb-1">Challenge</h4>
                    <p className="text-gray-700">{caseStudy.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase text-gray-500 mb-1">Solution</h4>
                    <p className="text-gray-700">{caseStudy.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase text-gray-500 mb-1">Results</h4>
                    <ul className="space-y-1">
                      {caseStudy.results.map((result, index) => (
                        <li key={index} className="text-green-600">
                          ✓ {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {caseStudy.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLE 9: Using Testimonials */}
      <section>
        <h2 className="text-2xl mb-4">Testimonials</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white border rounded-lg p-6">
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                {testimonial.avatar && (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/**
 * INTEGRATION STEPS:
 * 
 * 1. Import the hook at the top of your component:
 *    import { usePortfolio } from "../contexts/PortfolioContext";
 * 
 * 2. Use the hook to get data:
 *    const { data } = usePortfolio();
 * 
 * 3. Replace hardcoded values with data from context:
 *    Instead of: <h1>Dixit Panchal</h1>
 *    Use: <h1>{data.personal.name}</h1>
 * 
 * 4. For icons, use the getIconComponent utility:
 *    import { getIconComponent } from "../utils/iconMapper";
 *    Then: {getIconComponent(skill.icon, "w-6 h-6")}
 * 
 * 5. Map over arrays using .map():
 *    {data.projects.map((project) => (
 *      <ProjectCard key={project.id} {...project} />
 *    ))}
 */
