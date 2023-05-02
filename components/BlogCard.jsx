import Image from "next/image";

const { default: Link } = require("next/link")

const BlogCard = ({post}) => {
    return (
      <div className="">
        <Link href={`/posts/${post.slug}`}>
          <div>
            <Image
              className="w-72"
              src={post.coverImage.url}
              width={1000}
              height={1000}
              alt="cover image"
            />
          </div>
          <div>
            <h2 className="text-xl">{post.title}</h2>
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
                <p className="text-xs">Published On: {post.datePublished}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default BlogCard;