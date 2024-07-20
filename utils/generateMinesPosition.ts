export default function generateMinesPosition(
    rows: number,
    cols: number,
    mines: number
): { x: number; y: number }[] {
    const positions: { x: number, y: number }[] = []
    for (let i = 0; i < mines; i++) {
        const newPosition = { x: generateRandomNumber(0, rows), y: generateRandomNumber(0, cols) }
        if (positions.some((position) => position.x === newPosition.x && position.y === newPosition.y))
            i--
        else
            positions.push(newPosition)
    }
    return positions
}