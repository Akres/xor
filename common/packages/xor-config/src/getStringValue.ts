export default function getStringValue(name: string): string | null {
    const value = process.env[name];
    if (value === undefined || value === "") {
        return null;
    }
    return value;
}
