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

const titleh2ClassName = "text-[#9747FF] text-3xl font-semibold";
const titleh3ClassName = "text-[#9747FF] text-2xl font-semibold";

export default function Home() {
  return (
    <main className="flex min-h-screen p-10 flex-col items-center justify-center">
      {/* Title Section */}
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col justify-between w-1/2 text-left">
            <h2 className={titleh2ClassName}>
              Looking For Simple, Easy And Fast rental? Look No Further...
            </h2>
            <p className="font-inter text-xl max-w-[640px] mb-4 mt-4">
              Your journey starts here! At Easy Rent, we make renting a car simple, fast, and affordable. Whether you're planning a weekend getaway, a family road trip, or a business meeting, we have the perfect car for you.
            </p>
            <button className="bg-[#FF4500] text-white px-6 py-3 rounded-lg hover:bg-[#FF0000] transition duration-500 mt-4 w-1/2 self-center" style={{ height: '55px' }}>
              Book Now
            </button>

          </div>
          <div className="w-1/2 flex justify-end items-start ml-auto">
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
          <h2 className={titleh2ClassName}>
            Choose The Car That Suits You The Best...
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
          <h2 className={titleh2ClassName}>
            Insure Yourself And The Ones You Love...
          </h2>
        </div>

        <div
          className="rounded-lg p-6 text-white"
          style={{
            backgroundColor: 'rgba(151, 71, 255, 0.29)',
          }}
        >
          <div className="flex justify-between space-x-4">
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h3 className={titleh3ClassName}>Basic Insurance</h3>
              <p className="text-gray-700 text-lg">
                Covers damages to the rental car in case of an accident, with a higher deductible. Perfect for confident drivers on a budget.
              </p>
            </div>

            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h3 className={titleh3ClassName}>Medium Insurance</h3>
              <p className="text-gray-700 text-lg">
                Includes collision damage waiver and theft protection with a moderate deductible. A balanced option for extra security.
              </p>
            </div>

            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h3 className={titleh3ClassName}>Full Insurance</h3>
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

      { /* Reviews Section */}
      <div className="w-full max-w-screen-lg mx-auto mt-20">
        <div className="mb-4 text-left">
          <h2 className={titleh2ClassName}>
            Still Unsure? Read Some Of The Reviews...
          </h2>
        </div>

        <div className="flex justify-around space-x-4">
          {/* Review 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={Persona1}
                alt="Linda M."
                width={200}
                height={200}
                className="rounded-lg object-cover"
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
                className="rounded-lg object-cover"
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
                className="rounded-lg object-cover"
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
          <h2 className={titleh2ClassName}>
            How To Contact And Find Us...
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-6">
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
      <div className="w-screen mt-20">
        <div
          style={{
            background: 'linear-gradient(to right, #2A00B3, #9747FF)',
            height: '4px',
            width: '100%',
          }}
        />
      </div>
      { /* Title and Copyright Section */}
      <div className="flex flex-col items-center w-full px-4 pt-4">
        {/* Title */}
        <div className='w-full flex justify-start'>
          <h1 className="text-6xl font-bold text-left">
            <span className="text-[#FFFFFF]">Easy</span>
            <span className="text-[#9747FF]">Rent</span>
          </h1>
        </div>
        {/*Horrible way of centering copyright, but I had no clue why it is not centered so I had to to this atrocity*/}
        <div className="w-full flex justify-center items-end -mt-9">
          <p className="text-lg text-center">
            © 2024 Brstilo F., Jurić-Pešić M.
          </p>
        </div>
      </div>
    </main>
  );
}
