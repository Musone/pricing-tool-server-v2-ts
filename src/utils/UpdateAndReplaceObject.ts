/**
 * Updates document fields with values from input.
 * Requires input to be a Partial of Document's type. If it is not, then
 * the function behaviour is undefined.
 * @param input
 * @param document
 */
export default function updateAndReplaceObject<T, U>(input: T, document: U) {
    Object.entries(input).forEach((entries) => {
        const key = entries[0] as keyof U;
        const val = entries[1];

        document[key] = val as never;
    });
}