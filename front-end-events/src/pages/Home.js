import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks, getAllBooks, getOnebook, selectBooksError, selectBooksLoading } from "../features/solutions/booksSlice";
import Accordions from "../components/Accordions";
import CardSolution from "../components/cardSolution/cardSolution";
import CTA from "../components/footer/UpperFooter";
import NoData from "../components/NoData";
import Skeleton from "../components/skeleton/solution.Skeleton";

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const loading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const getArticle = (id) => {
     dispatch(getOnebook(id));
  }

  let content;
  if (error) {
    content = <p className="text-base text-red-700">Error: {error}</p>;
  } else if (loading) {
    content = Array.from({ length: 9 }, (_, index) => <Skeleton key={index} />);
  } else if (books.length > 0) {
    content = books.map((book, index) => (
      <CardSolution
        key={index}
        icon={book.icon}
        title={book.name}
        description={book.description}
        click={()=>{getArticle(book?._id)}}
      />
    ));
  } else {
    content = <NoData />;
  }

  return (
    <div>
      <div className="bg-secondaryLight flex justify-center items-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-3/4 gap-5 pt-10 pb-8">
          {content}
        </div>
      </div>
      <div className="bg-secondaryLight w-full ">
        <Accordions />
      </div>
      <div>
        <CTA />
      </div>
    </div>
  );
};

export default Home;
