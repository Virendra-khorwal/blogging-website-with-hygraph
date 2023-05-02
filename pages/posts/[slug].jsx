import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_API_ENDPOINT);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverImage {
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

const Post = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className="px-20 flex flex-col gap-4">
        <Image
          priority
          src={post.coverImage.url}
          alt={post.slug}
          width={1000}
          height={1000}
          className="rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold mt-2">{post.title}</h1>
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

        <div
          className=""
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
        
      </main>
    </>
  );
};

export default Post;
