export interface Post {
    title: string,
    permalink: string,
    excerpt: string,
    category: {
        categoryId: string,
        category: string
    },
    postImagePath: string,
    content: string,
    isFeatured: boolean,
    views: number,
    status: string,
    createdAt: Date
}
