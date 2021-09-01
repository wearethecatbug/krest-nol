function getPosition(element) {
	return {
		x: element.offsetLeft + element.offsetWidth / 2,
		y: element.offsetTop + element.offsetHeight / 2 - element.offsetHeight / 2 - 4
	};
}

function getDistance(a, b) {
	const from = getPosition(a);
	const to = getPosition(b);

	return {
		//https://stackoverflow.com/a/17628488/529024
		distance: Math.hypot(from.x - to.x, from.y - to.y),
		angle: (Math.atan2(to.x - from.x, from.y - to.y) * 180) / Math.PI,
		position: {
			start: from,
			end: to
		}
	};
}

/**
 * Рисует линию от элемента 1 до элемента 2
 * @param elementId1 айди элемента 1
 * @param elementId2 айди элемента 2
 */
function drawArrow(elementId1, elementId2) {
	// Get values and elements then set style
	const values = getDistance(
		document.querySelector(elementId1),
		document.querySelector(elementId2)
	);

	let wrapper = document.querySelector("#gameContainer");
	let arrow = document.querySelector("#arrow");
	let bottom = wrapper.offsetHeight - values.position.start.y;
	arrow.style.height = values.distance + "px";
	arrow.style.transform = `rotate(${values.angle}deg)`;
	arrow.style.bottom = bottom + "px";
	arrow.style.left = values.position.start.x + "px";
}

export { drawArrow };
