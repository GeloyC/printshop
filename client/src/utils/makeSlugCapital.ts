
export default function makeSlugCapital(slug_string: string) {
    const slug = slug_string.split('_');
    let array = slug;

    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].charAt(0).toUpperCase() + array[i].substring(1);
    }

    return array.join(' ');
}