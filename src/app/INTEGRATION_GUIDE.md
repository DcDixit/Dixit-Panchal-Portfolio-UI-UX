# Integration Guide: Connect Your Pages to Admin Panel Data

## Overview

Your portfolio now has a complete admin panel system! All data is managed through the admin interface and stored in localStorage. Now you need to update your pages to **read from this data** instead of using hardcoded values.

## Quick Start

### 1. Understanding the Structure

- **Data Source**: `/data/portfolioData.ts` - Contains data structure and default values
- **Context Provider**: `/contexts/PortfolioContext.tsx` - Makes data available throughout app
- **Admin Panel**: `/components/admin/AdminPanel.tsx` - UI for editing content
- **Example Usage**: `/components/DemoDataUsage.tsx` - Shows how to use data in components

### 2. The Portfolio Data Structure

```typescript
{
  personal: { name, title, location, email, phone, bio, resumeUrl, profileImage, yearsOfExperience }
  hero: { statusText, headline, subheadline, description }
  stats: { projectsCompleted, happyClients, awards, experience }
  skills: [{ id, category, items[], icon }]
  experience: [{ id, role, company, period, location, description, achievements[] }]
  projects: [{ id, title, category, description, image, tags[], featured, isFeaturedHero, client, year, link }]
  caseStudies: [{ id, title, subtitle, category, image, description, challenge, solution, results[], tags[] }]
  industries: [{ id, title, description, projectCount, icon }]
  testimonials: [{ id, name, role, company, content, avatar }]
}
```

## Step-by-Step Integration

### Step 1: Import the Hook

At the top of any page component (e.g., `HomePage.tsx`):

```tsx
import { usePortfolio } from "../contexts/PortfolioContext";
```

### Step 2: Access the Data

Inside your component function:

```tsx
export function HomePage({ onNavigate }: HomePageProps) {
  const { data } = usePortfolio();
  
  // Now you can use: data.personal, data.hero, data.projects, etc.
}
```

### Step 3: Replace Hardcoded Values

#### Example 1: Hero Section

**Before:**
```tsx
<h1>Dixit Panchal</h1>
<h2>Senior UI/UX Designer</h2>
<p>Crafting exceptional digital experiences...</p>
```

**After:**
```tsx
<h1>{data.hero.headline}</h1>
<h2>{data.hero.subheadline}</h2>
<p>{data.hero.description}</p>
```

#### Example 2: Status Badge

**Before:**
```tsx
<span>Open to New Opportunities</span>
```

**After:**
```tsx
<span>{data.hero.statusText}</span>
```

#### Example 3: Personal Info Pills

**Before:**
```tsx
<span>Ahmedabad, India</span>
<span>9+ Years</span>
```

**After:**
```tsx
<span>{data.personal.location}</span>
<span>{data.personal.yearsOfExperience} Years</span>
```

#### Example 4: Statistics

**Before:**
```tsx
<div>100+</div>
<p>Projects Completed</p>
```

**After:**
```tsx
<div>{data.stats.projectsCompleted}</div>
<p>Projects Completed</p>
```

### Step 4: Mapping Over Arrays

#### Example: Projects List

**Before:**
```tsx
const projects = [
  { title: "Project 1", description: "...", image: "..." },
  { title: "Project 2", description: "...", image: "..." },
];

return (
  <div>
    {projects.map((project, index) => (
      <ProjectCard key={index} {...project} />
    ))}
  </div>
);
```

**After:**
```tsx
const { data } = usePortfolio();

return (
  <div>
    {data.projects.map((project) => (
      <ProjectCard key={project.id} {...project} />
    ))}
  </div>
);
```

### Step 5: Working with Icons

Icons are stored as string names in the admin panel. Use the icon mapper utility:

```tsx
import { getIconComponent } from "../utils/iconMapper";

// In your JSX:
{data.skills.map((skill) => (
  <div key={skill.id}>
    {getIconComponent(skill.icon, "w-6 h-6")}
    <h3>{skill.category}</h3>
  </div>
))}
```

### Step 6: Handling Images

Images from the admin panel are base64 strings:

```tsx
{data.personal.profileImage && (
  <img src={data.personal.profileImage} alt={data.personal.name} />
)}

{data.projects.map((project) => (
  project.image && <img src={project.image} alt={project.title} />
))}
```

## Page-by-Page Integration Guide

### HomePage.tsx

Replace:
- Hero headline → `data.hero.headline`
- Hero description → `data.hero.description`
- Status badge → `data.hero.statusText`
- Location → `data.personal.location`
- Experience → `data.personal.yearsOfExperience`
- Stats → `data.stats.projectsCompleted`, `data.stats.happyClients`, etc.
- Industries list → `data.industries.map(...)`
- Featured projects → `data.projects.filter(p => p.featured)`

### AboutPage.tsx

Replace:
- Name → `data.personal.name`
- Bio → `data.personal.bio`
- Profile image → `data.personal.profileImage`
- Experience list → `data.experience.map(...)`
- Stats → `data.stats.*`

### SkillsPage.tsx

Replace:
- Skills categories → `data.skills.map(...)`
- Each skill category uses `skill.category`, `skill.items`, `skill.icon`

### ProjectsPage.tsx

Replace:
- Projects grid → `data.projects.map(...)`
- Filter by category using `data.projects.filter(...)`

### CaseStudyPage.tsx

Replace:
- Case studies → `data.caseStudies.map(...)`
- Use `caseStudy.challenge`, `caseStudy.solution`, `caseStudy.results`

### ContactPage.tsx

Replace:
- Email → `data.personal.email`
- Phone → `data.personal.phone`
- Location → `data.personal.location`

## Example: Complete HomePage Hero Section Integration

```tsx
import { usePortfolio } from "../contexts/PortfolioContext";
import { MapPin, Briefcase, Award } from "lucide-react";

export function HomePage({ onNavigate }: HomePageProps) {
  const { data } = usePortfolio();

  return (
    <section className="hero">
      {/* Status Badge */}
      <div className="status-badge">
        <span>{data.hero.statusText}</span>
      </div>

      {/* Headline */}
      <h1>{data.hero.headline}</h1>
      <h2>{data.hero.subheadline}</h2>
      <p>{data.hero.description}</p>

      {/* Info Pills */}
      <div className="info-pills">
        <div>
          <MapPin />
          <span>{data.personal.location}</span>
        </div>
        <div>
          <Briefcase />
          <span>{data.personal.yearsOfExperience} Years</span>
        </div>
        <div>
          <Award />
          <span>{data.stats.projectsCompleted} Projects</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div>
          <div>{data.stats.projectsCompleted}</div>
          <p>Projects Completed</p>
        </div>
        <div>
          <div>{data.stats.happyClients}</div>
          <p>Happy Clients</p>
        </div>
        <div>
          <div>{data.stats.awards}</div>
          <p>Awards Won</p>
        </div>
      </div>
    </section>
  );
}
```

## Testing Your Integration

1. Open the admin panel (Settings button or Ctrl+Shift+A)
2. Edit some content (e.g., change your name)
3. Click "Save"
4. Close admin panel
5. Check if the changes appear on your portfolio
6. If changes don't appear, refresh the page

## Common Issues & Solutions

### Issue: Data not updating
**Solution**: Make sure you clicked "Save" in the admin panel and refreshed the page

### Issue: Icons not showing
**Solution**: Check that the icon name in admin panel matches available icons in `/utils/iconMapper.tsx`

### Issue: Images not displaying
**Solution**: Verify image was uploaded successfully (max 2MB) and check browser console for errors

### Issue: TypeError: Cannot read property 'X' of undefined
**Solution**: Make sure the PortfolioProvider wraps your app in App.tsx (already done)

## Best Practices

1. **Always use optional chaining** for optional fields:
   ```tsx
   {data.personal.profileImage && <img src={data.personal.profileImage} />}
   ```

2. **Always use unique keys** when mapping:
   ```tsx
   {data.projects.map((project) => (
     <div key={project.id}>...</div>
   ))}
   ```

3. **Filter data when needed**:
   ```tsx
   // Show only featured projects
   {data.projects.filter(p => p.featured).map(...)}
   
   // Show only hero featured project
   {data.projects.find(p => p.isFeaturedHero)}
   ```

4. **Provide fallbacks**:
   ```tsx
   <p>{data.personal.bio || "No bio available"}</p>
   ```

## Next Steps

1. ✅ Admin panel is installed and working
2. ⏳ Update HomePage.tsx to use portfolio data
3. ⏳ Update AboutPage.tsx to use portfolio data
4. ⏳ Update SkillsPage.tsx to use portfolio data
5. ⏳ Update ProjectsPage.tsx to use portfolio data
6. ⏳ Update CaseStudyPage.tsx to use portfolio data
7. ⏳ Update ContactPage.tsx to use portfolio data
8. ⏳ Update Header.tsx to use portfolio data (if needed)
9. ⏳ Update Footer.tsx to use portfolio data (if needed)

## Reference Files

- **See complete examples**: `/components/DemoDataUsage.tsx`
- **Data structure**: `/data/portfolioData.ts`
- **Context hook**: `/contexts/PortfolioContext.tsx`
- **Icon mapper**: `/utils/iconMapper.tsx`
- **Admin panel**: `/components/admin/AdminPanel.tsx`

---

**Ready to integrate?** Start with HomePage.tsx and follow the examples above!
