import { Navigation } from "./_components/navigation";
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
            <Footer />
        </section>
    );
}