import Image from "next/image";

const { default: Link } = require("next/link")

const BlogCard = ({post}) => {
    return (
      <div className="bg-slate-50 rounded hover:shadow-lg">
        <Link href={`/posts/${post.slug}`}>
          <div className="rounded overflow-hidden">
            <Image
              className="w-72 h-48"
              src={post.coverImage.url}
              width={1000}
              height={1000}
              alt="cover image"
            />
          </div>
          <div className="p-2">
            <h2 className="text-xl font-medium">{post.title}</h2>
            <div className="flex gap-2 items-center mt-2">
              <Image
                className="w-8"
                src={post.author.avatar.url}
                width={100}
                height={100}
                alt="author avatar"
              />
              <div>
                <h4 className="text-sm">{post.author.name}</h4>
                <p className="text-xs italic">Published On : {post.datePublished}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default BlogCard;