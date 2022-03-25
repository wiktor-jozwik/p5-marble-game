const CIRCLES_DATA = [
    {
        radius: 20,
        points: 20,
        color: {
            r: 0,
            g: 252,
            b: 67,
        }
    },
    {
        radius: 60,
        points: 12,
        color: {
            r: 0,
            g: 163,
            b: 43,
        }
    },
    {
        radius: 120,
        points: 10,
        color: {
            r: 0,
            g: 128,
            b: 34,
        }
    },
    {
        radius: 180,
        points: 6,
        color: {
            r: 0,
            g: 80,
            b: 22,
        }
    },
]

const PLAYER_1 = {
    name: "White",
    color: {
        r: 255,
        g: 255,
        b: 255
    }
}

const PLAYER_2 = {
    name: "Red",
    color: {
        r: 255,
        g: 0,
        b: 0
    }
}

const BOARD_WIDTH = 1200
const BOARD_HEIGHT = 500
const STARTING_POSITION_X = BOARD_WIDTH / 10
const STARTING_POSITION_Y = BOARD_HEIGHT / 2

const POWER_RECTANGLE_WIDTH = 15
const BALL_RADIUS = 10

const BACKGROUND_COLOR = 240

const UPDATE_BALL_DELTA = 0.8

const MAX_MOVES = 20