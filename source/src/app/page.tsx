"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image';
import Car1Image from '../images/Car 1.jpg';
import Car2Image from '../images/Car 2.jpg';
import Car3Image from '../images/Car 3.jpg';
import StarImage from '../images/star.png';
import Persona1 from '../images/Persona 1.png';
import Persona2 from '../images/Persona 2.png';
import Persona3 from '../images/Persona 3.png';
import PhoneImage from '../images/phone.jpg';
import EmailImage from '../images/email.jpg';
import LocationImage from '../images/location.jpg';
import GoogleMapsLocationsImage from '../images/Google Maps.png';
import ThumbnailImage from '../images/rent-car.jpg';

const titleh2ClassName = "text-[#9747FF] text-4xl md:text-4xl font-semibold";
const titleh2Adapted = "text-[#9747FF] text-xl md:text-2xl font-semibold";
const titleh3ClassName = "text-[#9747FF] text-2xl font-semibold";



export default function Home() {
  const bookingRouter = useRouter();
  const carCategoriesRouter = useRouter();
  const insuranceRouter = useRouter();

  const handleBookingClick = () => {
    bookingRouter.push('/booking');
  };

  const handleCarCategoriesClick = () => {
    carCategoriesRouter.push('/car_categories');
  };

  const handleInsuranceClick = () => {
    insuranceRouter.push('/insurance_options');
  };

  return (
    <main className="flex min-h-screen p-4 md:p-10 flex-col items-center justify-center">
      {/* Title Section */}
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start w-full">
          <div className="flex flex-col justify-between w-full md:w-1/2 text-left">
            <h2 className={titleh2ClassName}>
              Looking For Simple, Easy And Fast rental? Look No Further...
            </h2>
            <p className="font-inter text-lg md:text-xl max-w-[640px] mb-4 mt-8">
              Your journey starts here! At Easy Rent, we make renting a car simple, fast, and affordable. Whether you are planning a weekend getaway, a family road trip, or a business meeting, we have the perfect car for you.
            </p>
            <div className="flex justify-center w-full">

            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-start mt-8 md:mt-0">
            <Image
              src={ThumbnailImage}
              alt="Car Rental"
              width={850}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#9747FF] hover:bg-blue-600 dark:bg-[#FF4500] dark:hover:bg-red-600 text-white px-6 py-3 rounded-md transition duration-500"
            style={{ height: '55px', width: '300px' }}
            onClick={handleBookingClick}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Car Options Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        {/* Title */}
        <div className="mb-8 text-left">
          <h2 className={titleh2Adapted}>
            Choose The Car That Suits You The Best...
          </h2>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-start mt-8 md:mt-0">
            <Image
              src={Car1Image}
              alt="Car Rental"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-[#9747FF] text-white px-6 py-3 rounded-md hover:bg-[#7a33cc] transition duration-300"
              onClick={handleCarCategoriesClick}
            >
              Browse the Cars
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col md:flex-row justify-around items-center space-x-4 mt-4 w-full">
          <div className="w-full md:w-1/3 h-56 md:h-72 flex justify-center items-center relative">
            <Image
              src={Car1Image}
              alt="Car 1"
              width={0}
              height={0}
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/3 h-56 md:h-72 flex justify-center items-center">
            <Image
              src={Car2Image}
              alt="Car 2"
              width={0}
              height={0}
              layout="intrinsic"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/3 h-56 md:h-72 flex justify-center items-center">
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

        {/* Desktop Button */}
        <div className="hidden md:flex justify-center mt-8">
          <button
            className="bg-[#9747FF] text-white px-6 py-3 rounded-md hover:bg-[#7a33cc] transition duration-300"
            onClick={handleCarCategoriesClick}
          >
            Browse the Cars
          </button>
        </div>
      </div>



      {/* Insurance Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-4 text-left">
          <h2 className={titleh2Adapted}>
            Insure Yourself And The Ones You Love...
          </h2>
        </div>

        <div
          className="rounded-lg p-6 text-white"
          style={{
            backgroundColor: 'rgba(151, 71, 255, 0.29)',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 bg-white p-4 rounded-md shadow-md">
              <h3 className={titleh3ClassName}>Basic Insurance</h3>
              <p className="text-gray-700 text-lg">
                Covers damages to the rental car in case of an accident, with a higher deductible. Perfect for confident drivers on a budget.
              </p>
            </div>

            <div className="flex-1 bg-white p-4 rounded-md shadow-md">
              <h3 className={titleh3ClassName}>Medium Insurance</h3>
              <p className="text-gray-700 text-lg">
                Includes collision damage waiver and theft protection with a moderate deductible. A balanced option for extra security.
              </p>
            </div>

            <div className="flex-1 bg-white p-4 rounded-md shadow-md">
              <h3 className={titleh3ClassName}>Full Insurance</h3>
              <p className="text-gray-700 text-lg">
                Comprehensive coverage with zero deductible, covering accidents, theft, and third-party damages. Ideal for worry-free travel.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-[#9747FF] text-white px-6 py-3 rounded-md hover:bg-[#7a33cc] transition duration-300" onClick={handleInsuranceClick}>
              Check Insurance
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-4 text-left">
          <h2 className={titleh2Adapted}>
            Still Unsure? Read Some Of The Reviews...
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 md:space-x-4">
          {/* Review 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={Persona1}
                alt="Linda M."
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
              <p className="text-lg mb-2 text-gray-700 text-center">
                Fast Rental was perfect for my weekend escapes. Affordable, reliable car and excellent service. Highly recommend!
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

          {/* Review 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={Persona2}
                alt="Mark H."
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
              <p className="text-lg mb-2 text-gray-700 text-center">
                Fast Rental made my trips easy and enjoyable. Friendly customer service and simple booking process. Highly recommend!
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

          {/* Review 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={Persona3}
                alt="Chris T."
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
              <p className="text-lg mb-2 text-gray-700 text-center">
                Fast Rental is a lifesaver for weekend plans! Affordable and great options for younger drivers. Totally recommend!
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

      {/* Contact Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-4 text-left">
          <h2 className={titleh2Adapted}>
            How To Contact And Find Us...
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* Merged Contact Item 1 and 2 */}
            <div className="flex-1 flex flex-col space-y-6">
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
            </div>

            {/* Contact Item 3 */}
            <div className="flex-1 flex items-center bg-white p-4 rounded-lg shadow-md">
              <Image
                src={LocationImage}
                alt="Location Icon"
                width={70}
                height={70}
                className="rounded-lg"
              />
              <p className="ml-4 text-gray-700 text-lg">
                <span style={{ backgroundColor: '#E84133', color: 'white', borderRadius: '50%', padding: '2px 6px' }}>A</span> Put Trščenice 6, Split
                <br />
                <span style={{ backgroundColor: '#E84133', color: 'white', borderRadius: '50%', padding: '2px 6px' }}>B</span> Ul. Tomića stine 9, Split
                <br />
                <span style={{ backgroundColor: '#E84133', color: 'white', borderRadius: '50%', padding: '2px 6px' }}>C</span> Split Airport, Cesta Dr. Franje Tuđmana 1270
              </p>
            </div>
          </div>
          {/* For some reason we need to set image size like this, otherwise it is taking properties from layout.css */}
          <div className="w-full max-w-screen-lg mx-auto mt-8">
            <Image
              src={GoogleMapsLocationsImage}
              alt="Location Image"
              width={1920}
              height={350}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '350px',
                borderRadius: '8px',
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}