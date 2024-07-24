import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import PostHomePage from "../components/PostHomePage";
import Link from "../components/Link";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import SectionContainer from "../components/SectionContainer";

type AuthorProps = {
  id: string;
  name: string;
  profilePicture?: string;
  bio?: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const [postRes, authorRes] = await Promise.all([
    fetch("http://localhost:3000/api/post"),
    fetch("http://localhost:3000/api/author"),
  ]);

  const [feed, authors] = await Promise.all([postRes.json(), authorRes.json()]);

  return {
    props: {
      feed: JSON.parse(JSON.stringify(feed)),
      authors: JSON.parse(JSON.stringify(authors)),
    },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
  authors: AuthorProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <SectionContainer>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <PageTitle>ilalang -- di antara mutiara</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            ilalang adalah gulma yang tak diinginkan oleh petani di lahannya,
            karena daunnya yang tajam menyulitkan orang untuk mengeruk hasil
            tanah. beberapa orang-orang malang terpaksa menjadi penyintas bagai
            gulma selama puluhan tahun. situs ini hendak mencatat hasil karya
            dari sukma para gulma tersebut.
          </p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-black-900 dark:text-black-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              karya yang tercatat
            </h2>
          </div>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {props.authors.map((author) => (
                <Card
                  key={author.id}
                  title={author.name}
                  description={author.bio}
                  imgSrc={author.profilePicture}
                  href={`/a/${author.id}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-black-900 dark:text-black-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              Highlighted Poems
            </h2>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {props.feed.map((post) => (
                <PostHomePage post={post} />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Blog;
