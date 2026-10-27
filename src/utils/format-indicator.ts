const PREFIX_LABELS: Record<string, string> = {
    total: 'total',
    positive: 'positive',
    min: 'lowest',
    max: 'highest',
};

/** Reads like the form row it was drilled from: `positive_urine_ketones_with_members`
    becomes "Urine Ketones (positive)" rather than the raw indicator key. */
export function formatIndicatorName(indicator: string): string {
    if (!indicator) {
        return '';
    }

    const parts = indicator.includes("__")
        ? indicator.split("__").slice(1)
        : [indicator];

    return parts
        .map(part => {
            // the retrieval-layer suffixes carry no meaning for the reader
            part = part.replace(/_with_members$/, "");
            const prefix = part.split("_")[0];
            const qualifier = PREFIX_LABELS[prefix];
            if (qualifier) {
                part = part.slice(prefix.length + 1);
            }
            const name = part
                .split("_")
                .map(word =>
                    word.length === 1
                        ? word.toUpperCase()
                        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ");
            return qualifier ? `${name} (${qualifier})` : name;
        })
        .join(" ");
}