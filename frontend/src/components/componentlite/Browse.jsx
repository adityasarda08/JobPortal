import Job1 from "./Job1";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";


const Browse = () => {

  const { alljobs } = useSelector((store) => store.jobs);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <h1 className="font-bold text-xl ">Search results {alljobs?.length}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          { alljobs?.map((job) => (
            <Job1 key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
