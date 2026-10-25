

export default function currencyFormat (price: number) {
    const format = new Intl.NumberFormat('ph-PH', {
        style: 'currency',
        currency: "PHP"
    }).format(price)

    return format;
} 