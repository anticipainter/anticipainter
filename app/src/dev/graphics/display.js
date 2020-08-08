import GameModule from "../game-module.js"
import {Vector} from "../../game/vector.js";
import Direction from "../util/direction.js";

/**
 * The display module
 * @class Display
 * @extends GameModule
 *
 * @param {Anticipainter} game - Reference to the game instance
 */
export default class Display extends GameModule {
	/**
	 * How large the arrows should grow when activating
	 * @type {number}
	 *
	 * @memberOf Display
	 */
	static arrowScaleMax = 1.3
	/**
	 * How long the arrow bounce animation lasts
	 * @type {number}
	 *
	 * @memberOf Display
	 */
	static arrowScaleDuration = 150
	/**
	 * Reference to each of the views in the hud
	 * @type {{sequence: JQuery<HTMLElement>, number: JQuery<HTMLElement>, main: JQuery<HTMLElement>, sector: JQuery<HTMLElement>, numerator: JQuery<HTMLElement>, denominator: JQuery<HTMLElement>}}
	 *
	 * @memberOf Display
	 * @instance
	 */
	views

	constructor(game) {
		super(game);
		$("#timer").load("../../res/drawable/timer.svg", () => {
			this.views = {
				main: $("#hud"),
				sequence: $("#sequence"),
				sector: $("#timer-sector"),
				numerator: $("#score-numerator"),
				denominator: $("#score-denominator"),
				number: $("#timer-number")
			}
		})
	}

	/**
	 * Sets the angle of the timer based off the current {@link Sequence}
	 * @param {number} time
	 * @param {number} max
	 * @param {boolean} updateRing
	 *
	 * @memberOf Display
	 * @instance
	 */
	setTimer(time, max, updateRing = true) {
		time = Math.max(time, 0)
		let num = Math.ceil(time)
		let angle = Math.round((1 - (time / Math.ceil(max))) * 360)
		this.views.number.text(num)
		if (updateRing) this.views.sector.attr("d", Display.getTimerPath(angle))
	}

	/**
	 * Sets the score indicator
	 * @param {number} count
	 * @param {number} total
	 *
	 * @memberOf Display
	 * @instance
	 */
	setScore(count, total) {
		this.views.numerator.text(count)
		this.views.denominator.text(total)
	}

	/**
	 * Clears the sequence display
	 *
	 * @memberOf Display
	 * @instance
	 */
	clearSequence() {
		this.views.sequence.empty()
	}

	/**
	 * Shows the given {@link Sequence} on the sequence display
	 * @param {Sequence} sequence
	 *
	 * @memberOf Display
	 * @instance
	 */
	showSequence(sequence) {
		let i = 0;
		for (let direction of sequence.moves) {
			// if (direction !== undefined) {
				let path = Display.getResourcePath(direction)
				let index = i++
				this.views.sequence.append(`<div id="item-${index}" class="item"></div>`)
				$(`#item-${index}`).load(path)
			// }
		}
	}

	/**
	 * Dims the sequence display
	 *
	 * @memberOf Display
	 * @instance
	 */
	dimSequence() {
		for (let child of this.views.sequence.children()) {
			$(child).animate({opacity: 0.25}, 0, () => {})
		}
	}

	/**
	 * Runs the scale animation on a specific arrow
	 * @param {number} index
	 * @param {CallableFunction} [callback]
	 *
	 * @memberOf Display
	 * @instance
	 */
	scaleDirection(index, callback) {
		let child = $(this.views.sequence.children()[index])
		child.animate({opacity: 1.0}, 100, function() { })
		let maxScale = Display.arrowScaleMax - 1
		let arrow = child.find("#scale")
		arrow.animate({test: 1}, {
			duration: Display.arrowScaleDuration,
			step: function(now) {
				let scale = 1
				if (now < 0.5) scale += maxScale * (now * 2)
				else scale += maxScale * 2 * (1 - now)
				arrow.attr("transform", `scale(${scale})`)
			},
			complete: callback
		})
	}

	/**
	 * Helper method for getting the svg path of the timer
	 * @param {number} percent
	 * @return {string}
	 *
	 * @memberOf Display
	 */
	static getTimerPath(percent) {
		let start = new Vector(500, 0)
		let mid = new Vector(500, 500)
		let offset = Vector.rotate(new Vector(0, 500), percent).getRounded()
		let end = Vector.sub(mid, offset)
		let radius = 500
		let arcSweep = percent < 180 ? 1 : 0
		return `
			M ${start.x} ${start.y}
			A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}
			L ${mid.x} ${mid.y}
			L ${start.x} ${start.y}
		`
	}

	/**
	 * Gets the resource path for a specific arrow direction
	 * @param {Direction} direction
	 * @return {string}
	 */
	static getResourcePath(direction) {
		let typeName = "arrow", directionName
		// if (this.useChevrons) typeName = "chevron"
		// else typeName = "arrow"
		if (Direction.equal(direction, Direction.LEFT)) directionName = "left"
		else if (Direction.equal(direction, Direction.RIGHT)) directionName = "right"
		else if (Direction.equal(direction, Direction.UP)) directionName = "up"
		else if (Direction.equal(direction, Direction.DOWN)) directionName = "down"
		return "../../res/drawable/" + typeName + "_" + directionName + ".svg"
	}
}
