import Image from 'next/image';
import HQImage from '../images/HQ.png'; // Import the main image
import Car1Image from '../images/Car 1.jpg'; // Import the first car image
import Car2Image from '../images/Car 2.jpg'; // Import the second car image
import Car3Image from '../images/Car 3.jpg'; // Import the third car image
import StarImage from '../images/star.png'; // Import the star image
import Persona1 from '../images/Persona 1.png'
import Persona2 from '../images/Persona 2.png'
import Persona3 from '../images/Persona 3.png'
import PhoneImage from '../images/phone.jpg'
import EmailImage from '../images/email.jpg'
import LocationImage from '../images/location.jpg'
import GoogleMapsLocationsImage from '../images/Google Maps.png'

export default function Home() {
  return (
    <main className="flex min-h-screen p-10 flex-col items-center justify-center">

      {/* Header Section */}
      <div className="mb-8 w-full max-w-screen-lg mx-auto text-center text-[#9747FF]">
        <h1 className="text-6xl font-extrabold tracking-tight">Home page</h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">
        <div className="mb-4 w-full text-center">
          <h2 className="text-[#9747FF] text-2xl font-semibold text-left mt-4">
            Looking For Simple, Easy And Fast rental? Look No Further!
          </h2>
        </div>

        <div className="flex items-center justify-center w-full mb-8">
          <div className="flex flex-col justify-center items-center w-1/2 text-center mr-6">
            <p className="font-inter text-xl max-w-[640px] mb-4">
              Your journey starts here! At Easy Rent, we make renting a car simple, fast, and affordable. Whether you are a young professional heading to a meeting, a student planning an epic road trip, or a retiree exploring new destinations, we&rsquo;ve got the perfect ride for you.
            </p>
            <button className="bg-[#9747FF] text-white px-6 py-3 rounded-lg hover:bg-[#7a33cc] transition duration-300">
              Book Now
            </button>
          </div>

          <div className="w-1/2 flex justify-end items-center ml-auto ">
            <Image
              src={HQImage}
              alt="Car Rental"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Car Options Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-8 text-left">
          <h2 className="text-[#9747FF] text-2xl font-semibold">
            Choose The Car That Suits You The Best!
          </h2>
        </div>

        <div className="flex justify-around items-center space-x-4 mt-4 w-full">
          <div className="w-1/3 h-72 flex justify-center items-center">
            <Image
              src={Car1Image}
              alt="Car 1"
              width={0}
              height={0}
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          <div className="w-1/3 h-72 flex justify-center items-center">
            <Image
              src={Car2Image}
              alt="Car 2"
              width={0}
              height={0}
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          <div className="w-1/3 h-72 flex justify-center items-center">
            <Image
              src={Car3Image}
              alt="Car 3"
              width={0}
              height={0}
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="bg-[#9747FF] text-white px-6 py-3 rounded-lg hover:bg-[#7a33cc] transition duration-300 mt-4">
            Browse the Cars
          </button>
        </div>
      </div>

      {/* Insurance Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-4 text-left">
          <h2 className="text-[#9747FF] text-2xl font-semibold">
            Insure Yourself And The Ones You Love!
          </h2>
        </div>

        <div
          className="rounded-lg p-6 text-white"
          style={{
            backgroundColor: 'rgba(151, 71, 255, 0.29)',
          }}
        >
          <p className="font-inter text-xl text-left mb-6">
            At Fast Rental, your peace of mind is our priority. We offer three levels of insurance coverage to match your needs and budget. Drive with confidence - select the insurance plan that works best for you!
          </p>

          <div className="flex justify-between space-x-4">
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-[#9747FF] text-2xl font-semibold mb-2">Basic Insurance</h3>
              <p className="text-gray-700 text-lg">
                Covers damages to the rental car in case of an accident, with a higher deductible. Perfect for confident drivers on a budget.
              </p>
            </div>

            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-[#9747FF] text-2xl font-semibold mb-2">Medium Insurance</h3>
              <p className="text-gray-700 text-lg">
                Includes collision damage waiver and theft protection with a moderate deductible. A balanced option for extra security.
              </p>
            </div>

            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-[#9747FF] text-2xl font-semibold mb-2">Full Insurance</h3>
              <p className="text-gray-700 text-lg">
                Comprehensive coverage with zero deductible, covering accidents, theft, and third-party damages. Ideal for worry-free travel.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-[#9747FF] text-white px-6 py-3 rounded-lg hover:bg-[#7a33cc] transition duration-300">
              Check Insurance
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-4 text-left">
          <h2 className="text-[#9747FF] text-2xl font-semibold">
            Still Unsure? Read Some Of The Reviews...
          </h2>
        </div>

        <div className="space-y-6">
          {/* Review 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <Image
                src={Persona1}
                alt="Linda M."
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <div>
                <p className="text-lg mb-2 text-gray-700">
                  As a busy marketing analyst in Split, Fast Rental was perfect for my weekend escapes. The app was easy to use, with great digital payment options. I found an affordable, reliable car and appreciated their excellent service. Highly recommend for anyone who loves hassle-free, budget-friendly travel!
                  <br />
                  <span className="font-semibold">Linda M.</span>
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Image key={i} src={StarImage} alt="Star" width={24} height={24} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <Image
                src={Persona2}
                alt="Mark H."
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <div>
                <p className="text-lg mb-2 text-gray-700">
                  Fast Rental made my trips to visit family so easy and enjoyable. As a retired teacher, I appreciated their friendly customer service and simple booking process. The car was comfortable and reliable for long drives, and the staff was always helpful. Highly recommend Fast Rental for stress-free, senior-friendly rentals!
                  <br />
                  <span className="font-semibold">Mark H.</span>
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Image key={i} src={StarImage} alt="Star" width={24} height={24} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <Image
                src={Persona3}
                alt="Chris T."
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <div>
                <p className="text-lg mb-2 text-gray-700">
                  Fast Rental is a lifesaver for weekend plans! The app is super easy to use, and their prices actually work for a student budget. Plus, they have great options for younger drivers. Totally recommend if you need a quick, affordable ride!
                  <br />
                  <span className="font-semibold">Chris T.</span>
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Image key={i} src={StarImage} alt="Star" width={24} height={24} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-4 text-left">
          <h2 className="text-[#9747FF] text-2xl font-semibold">
            How To Contact And Find Us!
          </h2>
        </div>

        <div className="space-y-6">
          {/* Contact Item 1 */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <Image
              src={PhoneImage}
              alt="Phone Icon"
              width={70}
              height={70}
              className="rounded-lg"
            />
            <p className="ml-4 text-gray-700 text-lg">+385 91 234 567</p>
          </div>

          {/* Contact Item 2 */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <Image
              src={EmailImage}
              alt="Email Icon"
              width={70}
              height={70}
              className="rounded-lg"
            />
            <p className="ml-4 text-gray-700 text-lg">
              fbrstilo00@fesb.hr
              <br />
              mjuric05@fesb.hr
            </p>
          </div>

          {/* Contact Item 3 */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <Image
              src={LocationImage}
              alt="Location Icon"
              width={70}
              height={70}
              className="rounded-lg"
            />
            <p className="ml-4 text-gray-700 text-lg">
              1.) Put Trščenice 6, Split
              <br />
              2.) Ul. Tomića stine 9, Split
              <br />
              3.) Split Airport, Cesta Dr. Franje Tuđmana 1270, Kaštel Štafilić
            </p>
          </div>
          {/*For some reason we need to set image size like this, otherwise it is taking properties from layout.css*/}
          <div className="w-full max-w-screen-lg mx-auto mt-8">
            <Image
              src={GoogleMapsLocationsImage}
              alt="Location Image"
              width={1920} // Full width of the container
              height={350} // Fixed height of 350px
              style={{
                objectFit: 'cover',  // Ensure the image maintains aspect ratio while covering the container
                width: '100%',       // Ensure the width is set to 100% of the container
                height: '350px',     // Set height explicitly to 350px
                borderRadius: '8px', // Optionally, rounded corners for the image
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-20">
        <div
          style={{
            background: 'linear-gradient(to right, #2A00B3, #9747FF)',  // Gradient from left to right
            height: '4px',  // The thickness of the line
            width: '100%',   // Full width
          }}
        />
      </div>
      {/* Title and Copyright Section */}
      <div className="flex items-center justify-between w-full px-4 pt-4">
        {/* Title aligned to the left */}
        <h1 className="text-6xl font-bold pl-8">
          <span className="text-[#2A00B3]">Easy</span>
          <span className="text-[#9747FF]">Rent</span>
        </h1>

        {/* Copyright centered */}
        <p className="text-lg text-center mx--20">
          © 2024 Brstilo F., Jurić-Pešić M.
        </p>
      </div>
    </main>
  );
}
