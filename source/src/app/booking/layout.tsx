import { Navigation } from "../booking/_components/navigation";
import { Footer } from "@/components/footer";

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