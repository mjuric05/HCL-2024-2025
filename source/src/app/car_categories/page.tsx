import { getStaticProps } from "@/dbConnector";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

type Thumbnail = {
    fields: {
        file: {
            url: string;
        };
    };
};

type Car = {
    fields: {
        title: string;
        description: Document;
        price: number;
        thumbnail?: Thumbnail;
    };
};

export default async function CarCategoriesPage() {
    const result = await getStaticProps();
    const cars: Car[] = result.props.cars.map((entry) => ({
        fields: {
            title: String(entry.fields.title),
            description: entry.fields.description as Document,
            price: Number(entry.fields.price),
            thumbnail: entry.fields.thumbnail as Thumbnail | undefined,
        },
    }));

    const renderCarCard = (car: Car) => (
        <div
            key={car.fields.title}
            className="p-4 border-2 border-[#9747FF] rounded-md hover:transform hover:translate-y-[-5px] hover:shadow-lg transition duration-300 mb-4"
        >
            <h3 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2 text-center text-black dark:text-white">
                {car.fields.title}
            </h3>
            <div className="flex flex-col md:flex-row items-center mt-4">
                {car.fields.thumbnail?.fields?.file?.url && (
                    <img
                        src={car.fields.thumbnail.fields.file.url}
                        alt={car.fields.title}
                        className="w-full md:w-72 h-72 object-cover rounded-lg mt-4 md:mt-0 md:mr-4"
                    />
                )}
                <div className="text-black dark:text-white p-4 rounded-md shadow-md flex-1 bg-transparent mt-4 md:mt-0">
                    {documentToReactComponents(car.fields.description)}
                    <p className="text-xl font-medium mt-2">
                        Price: {car.fields.price}€ per Day
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-10">
            <h2 className="text-[#9747FF] text-3xl md:text-4xl font-semibold mt-4 text-center">
                Available Cars
            </h2>
            <div className="w-full md:w-10/12 mt-10">
                <div className="grid grid-cols-1 gap-4">
                    {cars.map(renderCarCard)}
                </div>
            </div>
        </main>
    );
}