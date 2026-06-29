export function calculateGreenTime(
    nsCars: number,
    ewCars: number
) {

    const total = nsCars + ewCars

    if (total === 0) {

        return {
            ns: 15,
            ew: 15
        }
    }

    const nsRatio = nsCars / total

    const ewRatio = ewCars / total

    return {

        ns: Math.max(
            10,
            Math.min(
                40,
                Math.floor(nsRatio * 60)
            )
        ),

        ew: Math.max(
            10,
            Math.min(
                40,
                Math.floor(ewRatio * 60)
            )
        )
    }
}