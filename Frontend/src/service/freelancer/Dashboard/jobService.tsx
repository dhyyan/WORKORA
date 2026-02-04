export interface Job {
    id: string;
    title: string;
    company: string; // Renamed from clientName to match user's code style preference if needed, or mapped. let's match user's snippet uses 'company'.
    category: string;
    price: string; // User snippet uses "price", we have "budget". Let's standardize on "price" string for display.
    type: string; // e.g. "Hourly", "Fixed Price"
    location: string;
    posted: string; // User snippet uses "posted"
    desc: string; // User snippet uses "desc"
    tags: string[];
}

export const fetchJobs = async (): Promise<Job[]> => {
    // Mock data mimicking an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    title: "Senior React Developer",
                    company: "TechFlow Solutions",
                    category: "Development",
                    price: "$45 - $60/hr",
                    type: "Hourly",
                    location: "Remote",
                    posted: "2 hours ago",
                    desc: "We are looking for an experienced React developer to help build our next-gen dashboard...",
                    tags: ["React", "TypeScript", "Tailwind"]
                },
                {
                    id: '2',
                    title: "UI/UX Designer for Fintech App",
                    company: "FinEase",
                    category: "Design",
                    price: "$1200",
                    type: "Fixed Price",
                    location: "Remote",
                    posted: "5 hours ago",
                    desc: "Need a modern, clean design for a fintech mobile application. Glassmorphic style preferred...",
                    tags: ["Figma", "Mobile Design", "UI/UX"]
                },
                {
                    id: '3',
                    title: "Content Writer for Tech Blog",
                    company: "DevDigest",
                    category: "Writing",
                    price: "$30 - $45/hr",
                    type: "Hourly",
                    location: "Remote",
                    posted: "1 day ago",
                    desc: "Looking for a technical writer who can explain complex dev concepts in simple terms...",
                    tags: ["Technical Writing", "SEO", "Blog"]
                },
                {
                    id: '4',
                    title: "E-commerce SEO Specialist",
                    company: "ShopifyPlus Agency",
                    category: "Marketing",
                    price: "$50 - $75/hr",
                    type: "Hourly",
                    location: "Remote",
                    posted: "1 day ago",
                    desc: "Optimize our client's Shopify stores for better ranking and conversion...",
                    tags: ["SEO", "Marketing", "Shopify"]
                },
                {
                    id: '5',
                    title: "Python Backend Engineer",
                    company: "DataSystems",
                    category: "Development",
                    price: "$60 - $80/hr",
                    type: "Hourly",
                    location: "Remote",
                    posted: "3 hours ago",
                    desc: "Building scalable data pipelines and API services using Python and FastAPI.",
                    tags: ["Python", "FastAPI", "PostgreSQL"]
                }
            ]);
        }, 800);
    });
};
