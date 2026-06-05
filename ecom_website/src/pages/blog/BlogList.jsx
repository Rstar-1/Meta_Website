import React, { memo } from "react";
import Container from "../../components/common/Container";
import Fade from "../../components/common/Fade";

const BLOG_DATA = [
  {
    id: 1,
    date: "October 19, 2024",
    title: "Digitalization Of Manufacturing For The Industry",
    image:
      "https://html.ditsolution.net/industry/indastre6/assets/images/resource/blog1.png",
    category: "Industrial",
  },
  {
    id: 2,
    date: "October 22, 2024",
    title: "Strategy For Pre-Industrial Engineering Solution",
    image:
      "https://html.ditsolution.net/industry/indastre6/assets/images/resource/blog2.png",
    category: "Engineering",
  },
  {
    id: 3,
    date: "October 25, 2024",
    title: "The Importance of Quality Control in Production",
    image:
      "https://html.ditsolution.net/industry/indastre6/assets/images/resource/blog3.png",
    category: "Manufacturing",
  },
];

const BlogCard = memo(({ blog }) => {
  return (
    <div className="bg-white rounded-5 overflow-hidden h-full">
      <div className="relative">
        <img
          src={blog?.image}
          alt={blog?.title}
          className="w-full h-250 object-cover flex"
        />
        <p className="absolute bottom-0 left-0 bg-warning text-white px-15 py-5 font-500 para-text">
          {blog?.category}
        </p>
      </div>

      <div className="p-20">
        <p className="para-text text-gray font-500">{blog?.date}</p>
        <h3 className="title-text text-dark font-600 pt-10 line-clamp2">
          {blog?.title}
        </h3>
        <p className="para-text text-gray font-500 mt-10">
          Reliably coordinate prospective catalysts for change through
          revolutionary supply chains.
        </p>
        <div className="mt-14 bordh pt-15">
          <p className="text-warning font-500 para-text cursor-pointer">
            Read More +
          </p>
        </div>
      </div>
    </div>
  );
});

const BlogList = memo(() => {
  return (
    <Container
      style={{
        background:
          "url(https://html.ditsolution.net/industry/indastre5/assets/images/resource/testi_bg01.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="py-60">
        <div>
          <Fade
            direction="up"
            distance={40}
            tag="p"
            className="headpara-text text-warning font-500 text-center"
          >
            Latest News
          </Fade>
          <Fade
            direction="up"
            distance={40}
            delay={100}
            tag="h2"
            className="head-text text-dark font-600 capitalize text-center pt-10"
          >
            Read Our Latest Blog Posts
          </Fade>
        </div>

        <div className="grid-cols-3 gap-12 mt-40">
          {BLOG_DATA?.map((blog, i) => (
            <Fade
              key={blog.id}
              direction="up"
              distance={60}
              delay={200 + i * 150}
              className="mx-5"
            >
              <BlogCard blog={blog} />
            </Fade>
          ))}
        </div>
      </div>
    </Container>
  );
});

export default BlogList;
