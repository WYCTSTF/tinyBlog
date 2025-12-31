import MarkdownViewer from "@/components/MarkdownViewer";
import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Mock content fetching
  const content = `# ${slug}

This is a dynamically rendered blog post for **${slug}**.

:::spoiler
Here is some hidden content!
:::

## Section 1
Content goes here...
`;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-400 hover:underline mb-8 block">
          &larr; Back to Home
        </Link>
        <MarkdownViewer content={content} />
      </div>
    </div>
  );
}
