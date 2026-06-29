import { ref } from "vue"

import { FSM } from "../algorithms/FSM"

import type { Car } from "../type/Car"

export const cars = ref<Car[]>([])

export const fsm = new FSM()

export const passedCars = ref(0)

export const congestion = ref(0)

export const avgWaitTime = ref(0)

export const northCount = ref(10)

export const southCount = ref(10)

export const eastCount = ref(10)

export const westCount = ref(10)