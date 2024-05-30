

export const parseError = (data: any): string[] => {
    const result: string[] = [];
    Object.keys(data).forEach((key) => {
        result.push(`${key} ${data[key][0]}`);
    })
    return result;
}