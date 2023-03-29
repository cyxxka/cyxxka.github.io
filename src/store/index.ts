import { defineStore } from 'pinia'

const lineStore = defineStore('lineStore', {
	state: () => ({
    line:''
	}),
	actions: {
		setLine(val) {
			this.line = val
		},
	}
})


const store = {}

export const registerStore = () => {
	store.lineStore = lineStore()
}

export default store
