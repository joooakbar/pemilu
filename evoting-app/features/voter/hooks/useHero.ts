import { useRouter } from "next/navigation";

export const useHero = (idPemilihan?: string) => {
    const router = useRouter();

    const handleVote = () => {
        if(!idPemilihan) return;
        router.push(`/vote/${idPemilihan}`);
    };

    const handleScroll = (selector: string) => {
        const el = document.querySelector(selector);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return {
        handleVote,
        handleScroll,
    };
};