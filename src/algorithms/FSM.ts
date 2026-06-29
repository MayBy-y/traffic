import { LightState } from "../type/Traffic"

export class FSM {

    state = LightState.NS_GREEN

    timer = 0

    nsGreenTime = 20

    ewGreenTime = 20

    update() {

        this.timer++

        switch (this.state) {

            case LightState.NS_GREEN:

                if (this.timer >= this.nsGreenTime) {

                    this.state = LightState.NS_YELLOW

                    this.timer = 0
                }

                break

            case LightState.NS_YELLOW:

                if (this.timer >= 3) {

                    this.state = LightState.ALL_RED_1

                    this.timer = 0
                }

                break

            case LightState.ALL_RED_1:

                if (this.timer >= 1) {

                    this.state = LightState.EW_GREEN

                    this.timer = 0
                }

                break

            case LightState.EW_GREEN:

                if (this.timer >= this.ewGreenTime) {

                    this.state = LightState.EW_YELLOW

                    this.timer = 0
                }

                break

            case LightState.EW_YELLOW:

                if (this.timer >= 3) {

                    this.state = LightState.ALL_RED_2

                    this.timer = 0
                }

                break

            case LightState.ALL_RED_2:

                if (this.timer >= 1) {

                    this.state = LightState.NS_GREEN

                    this.timer = 0
                }

                break
        }
    }
}