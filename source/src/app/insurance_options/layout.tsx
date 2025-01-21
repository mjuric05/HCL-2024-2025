import { SpeedInsights } from "@vercel/speed-insights/next"

export default function ShowcaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="mt-4">
            {children}
            <SpeedInsights />
        </section>
    );
}