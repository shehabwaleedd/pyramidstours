import { MetadataRoute } from 'next';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
import { TourType } from '@/types/homePageTours';

interface UrlObject {
    url: string;
    lastModified: Date;
    changeFrequency: "weekly" | "yearly" | "always" | "hourly" | "daily" | "monthly" | "never" | undefined;
    priority: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let tourEntries: any[] = [];
    let tourCategories: any[] = [];
    try {
        tourEntries = await generateBlogPostsSitemapObjects();
        tourCategories = await generateTourTagSitemapObjects();
    } catch (error) {
        console.error('Failed to fetch blog entries:', error);
        // Handle the error appropriately, perhaps logging it or sending to an error tracking service
    }

    const tourUrls: UrlObject[] = tourEntries.map((o: any) => ({
        url: `https://www.pyramidsegypttour.com/tours/${o.slug}`,
        lastModified: new Date(o.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    const categoryUrls: UrlObject[] = tourCategories.map((o: any) => ({
        url: `https://www.pyramidsegypttour.com/categories/${o.slug}`,
        lastModified: new Date(o.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [
        { url: 'https://www.pyramidsegypttour.com', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        { url: 'https://www.pyramidsegypttour.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://www.pyramidsegypttour.com/tours', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
        { url: 'https://www.pyramidsegypttour.com/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        { url: 'https://www.pyramidsegypttour.com/services', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        ...tourUrls,
        ...categoryUrls,

    ];
}

const generateBlogPostsSitemapObjects = async () => {
    try {
        const posts = await serverUseToursByIds('');
        if (posts) {
            return posts.map((post: any) => ({
                slug: post.title?.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, ''),
                updatedAt: new Date(),
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

const generateTourTagSitemapObjects = async () => {
    try {
        const tours: TourType[] | null = await serverUseToursByIds('');
        let tags: string[] = [];
        if (tours) {
            tags = [...new Set(tours.flatMap((tour: any) => tour.tags))];
        }
        console.log(tags, "tags")
        return tags.map((tag: string) => ({
            slug: tag.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, ''),
            updatedAt: new Date(),
        }));
    } catch (error) {
        console.error('Error fetching tours:', error);
        return [];
    }
}