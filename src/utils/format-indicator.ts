export function formatIndicatorName(indicator: string): string {
    if (!indicator) {
        return '';
    }

    const parts = indicator.includes("__")
        ? indicator.split("__").slice(1)
        : [indicator];

    return parts
        .map(part =>
            part
                .split("_")
                .map(word =>
                    word.length === 1
                        ? word.toUpperCase()
                        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
        )
        .join(" ");
}