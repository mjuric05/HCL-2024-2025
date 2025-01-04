import { createClient } from "contentful";

export async function getProps() {
    try {


        const client = createClient({
            accessToken: process.env.CONTENTFUL_ACCESS_KEY,
            space: process.env.CONTENTFUL_SPACE_ID,
        });

        console.log("Access Token:", process.env.CONTENTFUL_ACCESS_KEY);
        console.log("Space ID:", process.env.CONTENTFUL_SPACE_ID);

        const response = await client.getEntries({ content_type: "car" });

        return {
            props: {
                cars: response.items || [],
            },
        };
    } catch (error) {
        console.error("Error fetching data from Contentful:", error);

        return {
            props: {
                cars: [],
            },
        };
    }

}

export default function Cars({ cars = [] }) {
    return (
        <div>
            <h1>Car List</h1>
            {cars.length > 0 ? (
                <ul>
                    {cars.map((car) => (
                        <li key={car.sys.name}>
                            <h2>{car.fields.name}</h2>
                            {car.fields.description && <p>{car.fields.description}</p>}
                            {car.fields.image && (
                                <img
                                    src={car.fields.image.fields.file.url}
                                    alt={car.fields.name}
                                    width="200"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cars available.</p>
            )}
        </div>
    );
}
