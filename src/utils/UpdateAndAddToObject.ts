/**
 * Updates document fields with values from input. If the field is an array, adds new elements to that array.
 * Requires input to be a Partial of Document's type. If it is not, then
 * the function behaviour is undefined.
 * @param input
 * @param document
 */
export default function updateAndAddToObject<T, U>(input: T, document: U) {
    Object.entries(input).forEach((entries) => {
        const key = entries[0] as keyof U;
        const val = entries[1];

        if (Array.isArray(val))
            val.forEach((v) => {
                if ((document[key] as any).indexOf(v) === -1)
                    (document[key] as any).push(v);
            })
        else
            document[key] = val as never;
    });
}