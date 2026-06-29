export interface Car {
    id: number

    direction:
    | 'north'
    | 'south'
    | 'east'
    | 'west'

    position: number

    speed: number

    waiting: boolean

    waitTime: number

    passed: boolean
}