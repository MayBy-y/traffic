<script setup lang = "ts" >
import { ref, onMounted, onUnmounted } from "vue"
import { cars, fsm, passedCars } from "../store/trafficStore"
import { LightState } from "../type/Traffic"
import type { Car } from "../type/Car"

const canvasRef = ref<HTMLCanvasElement>()

let animationId = 0

let carId = 1
 import {
  northCount,
  southCount,
  eastCount,
  westCount
} from "../store/trafficStore"

function createCar() {
   
    const dirs = [
        "north",
        "south",
        "east",
        "west"
    ] as const

    const dir =
        dirs[
        Math.floor(
            Math.random() * dirs.length
        )
        ]

    let car: Car

    switch (dir) {

        case "north":

            car = {
                id: carId++,
                direction: dir,
                position: 0,
                speed: 2,
                waiting: false,
                waitTime: 0,
                passed: false
            }

            break

        case "south":

            car = {
                id: carId++,
                direction: dir,
                position: 800,
                speed: 2,
                waiting: false,
                waitTime: 0,
                passed: false
            }

            break

        case "east":

            car = {
                id: carId++,
                direction: dir,
                position: 800,
                speed: 2,
                waiting: false,
                waitTime: 0,
                passed: false
            }

            break

        default:

            car = {
                id: carId++,
                direction: "west",
                position: 0,
                speed: 2,
                waiting: false,
                waitTime: 0,
                passed: false
            }
    }

    cars.value.push(car)
}

function updateCars() {

    cars.value.forEach(car => {

        switch (car.direction) {

            case "north":

                if (
                    fsm.state === LightState.NS_GREEN ||
                    car.position > 420
                ) {

                    car.position += car.speed
                    car.waiting = false

                } else {

                    if (
                        car.position >= 340 &&
                        car.position <= 420
                    ) {

                        car.waiting = true
                        car.waitTime++
                    } else {

                        car.position += car.speed
                    }
                }

                break

            case "south":

                if (
                    fsm.state === LightState.NS_GREEN ||
                    car.position < 380
                ) {

                    car.position -= car.speed
                    car.waiting = false

                } else {

                    if (
                        car.position <= 460 &&
                        car.position >= 380
                    ) {

                        car.waiting = true
                        car.waitTime++
                    } else {

                        car.position -= car.speed
                    }
                }

                break

            case "east":

                if (
                    fsm.state === LightState.EW_GREEN ||
                    car.position < 380
                ) {

                    car.position -= car.speed
                    car.waiting = false

                } else {

                    if (
                        car.position <= 460 &&
                        car.position >= 380
                    ) {

                        car.waiting = true
                        car.waitTime++
                    } else {

                        car.position -= car.speed
                    }
                }

                break

            case "west":

                if (
                    fsm.state === LightState.EW_GREEN ||
                    car.position > 420
                ) {

                    car.position += car.speed
                    car.waiting = false

                } else {

                    if (
                        car.position >= 340 &&
                        car.position <= 420
                    ) {

                        car.waiting = true
                        car.waitTime++
                    } else {

                        car.position += car.speed
                    }
                }

                break
        }
    })

    cars.value = cars.value.filter(car => {

        let remove = false

        switch (car.direction) {

            case "north":

                remove = car.position > 850
                break

            case "south":

                remove = car.position < -50
                break

            case "east":

                remove = car.position < -50
                break

            case "west":

                remove = car.position > 850
                break
        }

        if (remove) {

            passedCars.value++

            return false
        }

        return true
    })
}

function drawRoad(ctx: CanvasRenderingContext2D) {

    ctx.fillStyle = "#666"

    ctx.fillRect(
        350,
        0,
        100,
        800
    )

    ctx.fillRect(
        0,
        350,
        800,
        100
    )

    ctx.strokeStyle = "white"

    ctx.setLineDash([10, 10])

    ctx.beginPath()

    ctx.moveTo(400, 0)

    ctx.lineTo(400, 800)

    ctx.stroke()

    ctx.beginPath()

    ctx.moveTo(0, 400)

    ctx.lineTo(800, 400)

    ctx.stroke()

    ctx.setLineDash([])
}

function drawTrafficLight(
    ctx: CanvasRenderingContext2D
) {

    ctx.fillStyle = "black"

    ctx.fillRect(
        310,
        310,
        25,
        70
    )

    ctx.fillStyle =
        fsm.state === LightState.NS_GREEN
            ? "green"
            : "red"

    ctx.beginPath()

    ctx.arc(
        322,
        330,
        8,
        0,
        Math.PI * 2
    )

    ctx.fill()

    ctx.fillStyle =
        fsm.state === LightState.EW_GREEN
            ? "green"
            : "red"

    ctx.beginPath()

    ctx.arc(
        322,
        360,
        8,
        0,
        Math.PI * 2
    )

    ctx.fill()
}

function drawCars(
    ctx: CanvasRenderingContext2D
) {

    cars.value.forEach(car => {

        ctx.fillStyle =
            car.waiting
                ? "orange"
                : "dodgerblue"

        switch (car.direction) {

            case "north":

                ctx.fillRect(
                    380,
                    car.position,
                    20,
                    30
                )

                break

            case "south":

                ctx.fillRect(
                    400,
                    car.position,
                    20,
                    30
                )

                break

            case "east":

                ctx.fillRect(
                    car.position,
                    380,
                    30,
                    20
                )

                break

            case "west":

                ctx.fillRect(
                    car.position,
                    400,
                    30,
                    20
                )

                break
        }
    })
}

function render() {

    const canvas = canvasRef.value

    if (!canvas) return

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    )

    drawRoad(ctx)

    drawTrafficLight(ctx)

    updateCars()

    drawCars(ctx)

    animationId =
        requestAnimationFrame(render)
}
function createDirectionCars(
  direction:
    | "north"
    | "south"
    | "east"
    | "west",
  count:number
){

  for(let i=0;i<count;i++){

    cars.value.push({

      id: carId++,

      direction,

      position:
        direction === "south" ||
        direction === "east"
          ? 800
          : 0,

      speed:2,

      waiting:false,

      waitTime:0,

      passed:false

    })
  }
}
let carTimer: number

let lightTimer: number

onMounted(() => {
    


    carTimer = window.setInterval(() => {

        if (cars.value.length < 50) {

            createCar()
        }

    }, 1200)

    lightTimer = window.setInterval(() => {

        fsm.update()

    }, 1000)

    render()
})

onUnmounted(() => {

    cancelAnimationFrame(
        animationId
    )

    clearInterval(carTimer)

    clearInterval(lightTimer)
})
    </script>

    <template>
        <div class="control">

  <div>
    北向车辆：
    <input
      type="number"
      v-model="northCount"
    />
  </div>

  <div>
    南向车辆：
    <input
      type="number"
      v-model="southCount"
    />
  </div>

  <div>
    东向车辆：
    <input
      type="number"
      v-model="eastCount"
    />
  </div>

  <div>
    西向车辆：
    <input
      type="number"
      v-model="westCount"
    />
  </div>

</div>
    <canvas
        ref="canvasRef"
        width="800"
        height="800"
    />
    </template>

    <style scoped >
        canvas {
    border: 1px solid #ccc;
    background: #f5f5f5;
}
</style>