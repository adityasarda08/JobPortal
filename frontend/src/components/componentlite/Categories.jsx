import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobslice";
import { useNavigate } from "react-router-dom";

const category = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "M L Engineer",
  "DevOps Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Product Manager",
  "Project Manager",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobhandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/Browse");
  };
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Categories
        </h1>
        <p className="text-center text-gray-600">
          Explore Our Extensive Job Market
        </p>
      </div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="-ml-2">
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button onClick={() => searchjobhandler(item)} className="w-full">
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
