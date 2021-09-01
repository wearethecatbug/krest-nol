let IS_POPUP_INIT = false;

/**
 * Показывает попап, и вызвает функцию коллбек при закрытии
 * @param content текст который пишется в попап
 * @param onClose функция которая будет вызвана при закрытии
 */
function showPopup(content, onClose) {
	let popup = document.querySelector("#popup");
	let contentDiv = document.querySelector("#popupContent");

	if (!IS_POPUP_INIT) {
		let closeButton = document.querySelector("#popupClose");
		closeButton.onclick = function () {
			popup.style.display = "none";
			if (onClose) onClose();
		};

		window.onclick = function (event) {
			if (event.target == popup) {
				popup.style.display = "none";
				if (onClose) onClose();
			}
		};
	}

	popup.style.display = "block";
	contentDiv.innerHTML = content;
}

export { showPopup };
