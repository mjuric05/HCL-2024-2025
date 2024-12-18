import { Navigation } from "../booking/_components/navigation";

export default function ShowcaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="mt-4">
            <Navigation />
            {children}
        </section>
    );
}