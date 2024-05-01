import { MetadataRoute } from 'next';
import { serverUseToursByIds } from '@/lib/tours/serverUseToursByIds';
import { TourType } from '@/types/homePageTours';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let tourEntries = [];
    let tourCategories: any[] = [];
    try {
        tourEntries = await generateBlogPostsSitemapObjects();
        tourCategories = await generateTourTagSitemapObjects();
    } catch (error) {
        console.error('Failed to fetch blog entries:', error);
        // Handle the error appropriately, perhaps logging it or sending to an error tracking service
    }

    const tourUrls = tourEntries.map((o: any) => ({
        url: `https://pyramidsegypttours.com/tours/${o.slug}`,
        lastModified: new Date(o.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    const generateCategoryUrls = (tourCategories: any[]) => tourCategories.map((o: any) => ({
        url: `https://pyramidsegypttours.com/${o.slug}`,
        lastModified: new Date(o.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    const categoryUrls = generateCategoryUrls(tourCategories);

    return [
        { url: 'https://pyramidsegypttours.com', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        { url: 'https://pyramidsegypttours.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://pyramidsegypttours.com/tours', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
        { url: 'https://pyramidsegypttours.com/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        { url: 'https://pyramidsegypttours.com/services', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        ...tourUrls,
        ...categoryUrls,

    ];
}

const generateBlogPostsSitemapObjects = async () => {
    try {
        const posts = await serverUseToursByIds('');
        console.log(posts, 'posts')
        return posts.map((post: any) => ({
            slug: post.title?.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, ''),
            updatedAt: new Date(),
        }));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

const generateTourTagSitemapObjects = async () => {
    try {
        const tours: TourType[] = await serverUseToursByIds('');
        const tags: string[] = [...new Set(tours.flatMap((tour: any) => tour.tags))];
        return tags.map((tag: string) => ({
            slug: tag.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, ''),
            updatedAt: new Date(),
        }));
    } catch (error) {
        console.error('Error fetching tours:', error);
        return [];
    }
}