import Image from 'next/image';
import HQImage from '../images/HQ.png'; // Import the image
import Car1Image from '../images/Car 1.jpg'; // Import the first image
import Car2Image from '../images/Car 2.jpg'; // Import the second image
import Car3Image from '../images/Car 3.jpg'; // Import the third image

export default function Home() {
  return (
    <main className="flex min-h-screen p-10 flex-col items-center justify-center">

      {/* Header Section */}
      <div className="mb-8 w-full max-w-screen-lg mx-auto text-center text-[#9747FF]">
        <h1 className="text-6xl font-extrabold tracking-tight">Home page</h1>
      </div>

      {/* Content Section (h2, Image, Paragraph, and Button) */}
      <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">

        {/* h2 - Aligned Left */}
        <div className="mb-4 w-full text-center">
          <h2 className="text-[#9747FF] text-2xl font-semibold text-left mt-4">
            Looking For Simple, Easy And Fast rental? Look No Further!
          </h2>
        </div>

        {/* Image and Paragraph in Same div */}
        <div className="flex items-center justify-center w-full mb-8">

          {/* Paragraph and Button Container */}
          <div className="flex flex-col justify-center items-center w-1/2 text-center mr-6">
            <p className="font-inter text-xl max-w-[640px] mb-4">
              Your journey starts here! At Easy Rent, we make renting a car simple, fast, and affordable. Whether you're a young professional heading to a meeting, a student planning an epic road trip, or a retiree exploring new destinations, we’ve got the perfect ride for you.
            </p>

            {/* Button centered under the paragraph */}
            <button className="bg-[#9747FF] text-white px-6 py-3 rounded-lg hover:bg-[#7a33cc] transition duration-300">
              Book Now
            </button>
          </div>

          {/* Image (aligned to the right of the parent div) */}
          <div className="w-1/2 flex justify-center items-center ml-auto">
            <Image
              src={HQImage} // Use the imported image here
              alt="Car Rental"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

        </div>
      </div>

      {/* New Section for Title and 3 Images */}
      <div className="w-full max-w-screen-lg mx-auto mt-12"> {/* Add margin-top to create space */}
        {/* Title Above 3 Images */}
        <div className="mb-8 text-left">
          <h2 className="text-[#9747FF] text-2xl font-semibold">
            Choose The Car That Suits You The Best!
          </h2>
        </div>

        {/* 3 Images Section */}
        <div className="flex justify-around items-center space-x-4 mt-4 w-full">
          {/* Image 1 */}
          <div className="w-1/3 h-72 flex justify-center items-center">
            <Image
              src={Car1Image}
              alt="Car 1"
              width={0} // Set width to 0 to use the height for the scaling
              height={0} // Set height to 0 as well
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          {/* Image 2 */}
          <div className="w-1/3 h-72 flex justify-center items-center">
            <Image
              src={Car2Image}
              alt="Car 2"
              width={0} // Set width to 0 to use the height for the scaling
              height={0} // Set height to 0 as well
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          {/* Image 3 */}
          <div className="w-1/3 h-72 flex justify-center items-center">
            <Image
              src={Car3Image}
              alt="Car 3"
              width={0} // Set width to 0 to use the height for the scaling
              height={0} // Set height to 0 as well
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Button centered under 3 images */}
        <div className="flex justify-center mt-8">
          <button className="bg-[#9747FF] text-white px-6 py-3 rounded-lg hover:bg-[#7a33cc] transition duration-300 mt-4">
            Browse the Cars
          </button>
        </div>
      </div>
    </main>
  );
}
