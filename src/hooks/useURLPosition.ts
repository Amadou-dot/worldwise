import { useSearchParams } from "react-router-dom";

export function useURLPosition() {
    const [searchParams] = useSearchParams();
    const latitude = parseFloat(searchParams.get('lat') || '');
    const longitude = parseFloat(searchParams.get('lng') || '');
    return { latitude, longitude };
}