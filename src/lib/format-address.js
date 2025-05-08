export const formatAddress = (address) => {
    if (!address) return "No address";

    const parts = [];

    if (address.street) parts.push(address.street);

    const cityStateZip = [
        address.city,
        address.state,
        address.postalCode
    ].filter(Boolean).join(", ");

    if (cityStateZip) parts.push(cityStateZip);
    if (address.country) parts.push(address.country);

    return parts.join(", ") || "Address incomplete";
};