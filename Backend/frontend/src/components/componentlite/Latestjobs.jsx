import { useSelector } from "react-redux";
import Jobcards from "./Jobcards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobslice";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Latestjobs = () => {
  const { alljobs } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6A3Bc2]">Latest & Top </span>
        Job Openings
      </h2>
      <div className="grid grid-cols-3 gap-4 my-5">
        {alljobs.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          alljobs.slice(0, 6).map((job) => {
            return <Jobcards job={job} />;
          })
        )}
      </div>
    </div>
  );
};

export default Latestjobs;
