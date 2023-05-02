import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "@/components/BlogCard";

const inter = Inter({ subsets: ["latin"] });

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_API_ENDPOINT);

const QUERY = gql`{
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverImage {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Blogging website with Hygraph</title>
      </Head>
      <main className="flex flex-col items-center mt-36">
        <h1 className="text-indigo-500 text-2xl font-medium">List of Blogs</h1>
        <div className="flex gap-8 mt-10">
          {posts.map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
        </div>
      </main>
      ;
    </>
  );
}
