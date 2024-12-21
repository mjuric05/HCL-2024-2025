import { getStaticProps } from "@/dbConnector";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function CarCategoriesPage() {
    const result = await getStaticProps();

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h2 className="text-[#9747FF] text-4xl font-semibold -mt-4 text-center">Availabile Cars</h2>
            <div className="w-10/12 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.props.cars.map((car) => (
                        <div key={String(car.fields.title)} className="p-4 border-2 border-[#9747FF] rounded-md hover:transform hover:translate-y-[-5px] hover:shadow-lg transition duration-300 mb-4">
                            <h3 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2 text-center text-white">{String(car.fields.title)}</h3>
                            <div className="flex flex-col md:flex-row items-center mt-4">
                                <img
                                    src={car.fields.thumbnail.fields.file.url}
                                    alt={typeof car.fields.title === "string" ? car.fields.title : undefined}
                                    className="w-72 h-72 object-cover rounded-lg mt-4 md:mt-0 md:mr-4"
                                />
                                <div className="text-white p-4 rounded-md shadow-md flex-1 bg-transparent mt-4 md:mt-0">
                                    {documentToReactComponents(car.fields.description)}
                                    <p className="text-xl font-medium mt-2">Price: {typeof car.fields.price === "number" ? car.fields.price : ""}€ per Day</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}