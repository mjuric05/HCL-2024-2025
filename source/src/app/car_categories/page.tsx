import { getStaticProps } from "@/dbConnector";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

type Thumbnail = {
    fields: {
        file: {
            url: string;
            size: string;
        };
    };
};

type Car = {
    fields: {
        title: string;
        description: Document;
        price: number;
        thumbnail?: Thumbnail;
        size: string;
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
            size: String(entry.fields.size),
        },
    }));

    const renderCarCard = (car: Car) => (
        <div
            key={car.fields.title}
            className="p-4 border-2 border-[#9747FF] rounded-md mb-4"
        >
            <h3 className="text-2xl font-semibold border-b-2 border-[#9747FF] pb-2 text-center text-black dark:text-white">
                {car.fields.title}
            </h3>
            <div className="flex flex-col items-center mt-4">
                {car.fields.thumbnail?.fields?.file?.url && (
                    <img
                        src={car.fields.thumbnail.fields.file.url}
                        alt={car.fields.title}
                        className="w-full h-64 object-cover rounded-md"
                    />
                )}
                <div className="mt-4 text-center">
                    <div className="text-lg text-black dark:text-white">
                        {documentToReactComponents(car.fields.description)}
                    </div>
                    <p className="text-lg text-black dark:text-white mt-2">
                        Size: {car.fields.size.charAt(0).toUpperCase() + car.fields.size.slice(1)}
                    </p>
                    <p className="text-lg font-bold text-black dark:text-white mt-2">
                        Price: ${car.fields.price}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-24 md:p-10 md:pt-28">
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-center text-[#9747FF]">Available Cars</h2>
            <div className="w-full max-w-screen-lg mx-auto mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                    <select className="p-2 border border-[#9747FF] rounded-md text-black">
                        <option>-- Sort by Size --</option>
                    </select>
                    <select className="p-2 border border-[#9747FF] rounded-md text-black">
                        <option>-- Sort by Price --</option>
                    </select>
                    <input
                        type="text"
                        className="p-2 border border-[#9747FF] rounded-md text-black"
                        placeholder="Search by Title"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cars.map(renderCarCard)}
                </div>
            </div>
        </main>
    );
}