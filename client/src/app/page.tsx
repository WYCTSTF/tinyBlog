import Link from "next/link";

const MOCK_POSTS = [
  {
    slug: "hello-world",
    title: "Hello World with Bun & Elysia",
    excerpt: "Exploring the performance benefits of the Bun runtime...",
    date: "2025-12-20",
    tags: ["Bun", "Elysia", "Performance"],
  },
  {
    slug: "react-server-components",
    title: "Understanding RSC in Next.js",
    excerpt: "A deep dive into how React Server Components work...",
    date: "2025-12-18",
    tags: ["React", "Next.js"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <header className="mb-12 flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">tinyBlog</h1>
        <Link href="/editor" className="text-sm text-blue-500 hover:underline">
          Go to Editor
        </Link>
      </header>

      <div className="grid gap-8 max-w-3xl mx-auto">
        {MOCK_POSTS.map((post) => (
          <article key={post.slug} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <div className="flex gap-2 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-500 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {post.excerpt}
            </p>
            <div className="text-sm text-gray-500">
              {post.date}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
