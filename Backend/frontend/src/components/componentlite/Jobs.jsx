import Navbar from "./Navbar";
import Filtercard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { alljobs, setSearchQuery: searchQuery } = useSelector(
    (store) => store.jobs,
  );
  console.log("searchQuery:", searchQuery);
  console.log(
    "job locations:",
    alljobs.map((j) => j.location),
  );

  const filter = useMemo(() => {
    if (!searchQuery) return alljobs;

    const q = searchQuery.toLowerCase();

    // Experience ranges like "0-2 years" -> [0, 2]
    const parseExperienceRange = (str) => {
      const match = str.match(/(\d+)-(\d+)/);
      return match ? [Number(match[1]), Number(match[2])] : null;
    };

    // Salary ranges like "50k-100k" -> [50000, 100000]
    const parseSalaryRange = (str) => {
      const match = str.match(/(\d+)k-(\d+)k/i);
      return match ? [Number(match[1]) * 1000, Number(match[2]) * 1000] : null;
    };

    const expRange = parseExperienceRange(searchQuery);
    const salaryRange = parseSalaryRange(searchQuery);

    return alljobs.filter((job) => {
      if (expRange) {
        return job.experience >= expRange[0] && job.experience <= expRange[1];
      }
      if (salaryRange) {
        return job.salary >= salaryRange[0] && job.salary <= salaryRange[1];
      }
      // fallback: location / title / description text match
      return (
        job.title?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q)
      );
    });
  }, [alljobs, searchQuery]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex gap-6">
          <aside className="w-65 shrink-0">
            <div className="sticky top-20">
              <Filtercard />
            </div>
          </aside>

          <main className="flex-1">
            {filter.length === 0 ? (
              <div className="flex justify-center items-center h-[70vh]">
                <span className="text-lg text-gray-500">No Jobs Found</span>
              </div>
            ) : (
              <div className="pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filter.map((job) => (
                    <div key={job._id} className="col-span-1">
                      <Job1 job={job} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Jobs;
