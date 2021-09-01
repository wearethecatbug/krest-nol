/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/arrow.js":
/*!**********************!*\
  !*** ./src/arrow.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawArrow": () => (/* binding */ drawArrow)
/* harmony export */ });
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




/***/ }),

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showPopup": () => (/* binding */ showPopup)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arrow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrow */ "./src/arrow.js");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup */ "./src/popup.js");



/**
 * Энам стили для клеток, крестик, нолик, дизейбл
 * @readonly
 * @enum {string}
 */
const CellStyles = {
	Tic: "style-zero",
	Tac: "style-cross",
	Disabled: "disabled"
};

/**
 * Энам тип клетки игрового поля, крест, нолик или пустое.
 * @readonly
 * @enum {number}
 */
const CellType = {
	None: 0,
	Tic: 1,
	Tac: 2
};

/**
 * Энам тип гейм овера, игра заканчивается либо как победа либо как поражение
 * @readonly
 * @enum number
 */
const GameOverType = {
	Win: 0,
	Draw: 1
};

/**
 * Конструктор модели игрока, хранит данные о игроке по типу имени, коиличества побед и т.д
 * @param name {string} имя игрока
 * @param cellType {CellType}
 * @property {number} wins колчество побед
 * @constructor
 */
function User(name, cellType) {
	this.name = name;
	this.wins = 0;
	this.defeats = 0;
	this.draws = 0;
	this.cellType = cellType;

	this.toString = function () {
		return name;
	};
}

/**
 * Игровое поле, двумерный массив номеров, либо же значний из энама GameFieldCellType
 * @typedef {CellType[][]} GameField
 */

/**
 * Игровое поле это двумерный массив 3х3, в каждой ячейке игрового поля либо крестик, либо нолик, либо пусто
 * @type {GameField}
 */
let gameField;

/**
 * Текущий юзер, тоесть тот пользователь что сейчас делает ход
 * @type {User}
 */
let currentUser;

/**
 * Какой сейчас ход, цифра, начинается с 0 заканичвается 9тью
 * @type {number}
 */
let turn;

function checkWinner(gameField) {
	/**
	 * Список выигрышных комбинаций
	 * @type {CellType[][]}
	 */
	let GameWinCombinations = [
		[gameField[0][0], gameField[0][1], gameField[0][2]],
		[gameField[1][0], gameField[1][1], gameField[1][2]],
		[gameField[2][0], gameField[2][1], gameField[2][2]],
		[gameField[0][0], gameField[1][0], gameField[2][0]],
		[gameField[0][1], gameField[1][1], gameField[2][1]],
		[gameField[0][2], gameField[1][2], gameField[2][2]],
		[gameField[0][0], gameField[1][1], gameField[2][2]],
		[gameField[0][2], gameField[1][1], gameField[2][0]]
	];

	for (let currentCombination of GameWinCombinations) {
		if (currentCombination[0] === 0) {
			continue;
		} else if (
			currentCombination[0] === currentCombination[1] &&
			currentCombination[0] === currentCombination[2]
		) {
			return currentCombination[0];
		}
	}
	return 0;
}

/**
 * Производит ресет игрового поля, выставляя его в начальное состояние, пустое поле и все ячейки можно кликать.
 */
function resetGameField() {
	//т.к во время игры мы меняем геймфилд выставляя в него нужные значения крестика или нолика, нужно его выставить в начальное состояние когда все клетки пустыеы
	gameField = [
		[CellType.None, CellType.None, CellType.None],
		[CellType.None, CellType.None, CellType.None],
		[CellType.None, CellType.None, CellType.None]
	];

	//для каждой ячейки нужно обновить данные, убрать ненужные стили и т.д
	for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
		for (let colIndex = 0; colIndex < 3; colIndex++) {
			let id = `[id="${rowIndex}${colIndex}"]`;
			let cell = document.querySelector(id);
			//удаляем установленые стили, иконку крестика, иконку нолика, дизейблед
			cell.classList.remove(
				CellStyles.Tic,
				CellStyles.Tac,
				CellStyles.Disabled
			);
		}
	}
}

/**
 * Задает слушателей к элеентам на странице, например слушателей клика мышкой по клеткам игрового поля
 */
function addGameListeners() {
	for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
		for (let colIndex = 0; colIndex < 3; colIndex++) {
			let id = `[id="${rowIndex}${colIndex}"]`;
			let cell = document.querySelector(id);
			cell.addEventListener(
				"click",
				cellOnClickEvent.bind(cell, rowIndex, colIndex) //используем байнд что бы передать индксы клетки rowIndex, colIndex
			);
		}
	}
}

/**
 * Реакция на клик мышкой по игровой клетке
 * @param rowIndex индекс строки в которой лежит клетка
 * @param colIndex индкс столбца в котором лежит клетка
 * @param event
 */
function cellOnClickEvent(rowIndex, colIndex, event) {
	this.classList.add(CellStyles.Disabled); //устанавливаем стиль дизейблед, который выключает взаимодействие с мышкой
	gameField[rowIndex][colIndex] = currentUser.cellType; //в игровое поле выставляем соотвествующий тип, это будет тип текущего игрока, и это будет или крест или нолик

	//класс лист тугл, первым параметром передается стиль, вторым условие, есилу словие true стиль включается если false выключается
	this.classList.toggle(
		CellStyles.Tic,
		currentUser.cellType === CellType.Tac &&
			currentUser.cellType !== CellType.None
	);

	this.classList.toggle(
		CellStyles.Tac,
		currentUser.cellType === CellType.Tic &&
			currentUser.cellType !== CellType.None
	);

	//так как клик по клетке у нас это совершение хода, то заверашем ход вызвав соотвествующую функцию
	//завершаем ход с небольшим таймаутом, т.к браузеру нужно время что бы перерисовать клетку и нарисовать там иконку
	setTimeout(endOfTurn, 66);
}

/**
 * Функция окончания хода, должна проверять не был ли совершен победный ход, не было ли ничеьй, в противном случае передавать ход
 */
function endOfTurn() {
	turn++;
	//Определяем есть ли выигрышные комбинации
	if (checkWinner(gameField) === currentUser.cellType) {
		gameOver(GameOverType.Win);
	} else if (turn === 9) {
		//если выигрышных комбинаций не было но это последний ход т.е 9ый то ничья
		gameOver(GameOverType.Draw);
	} else {
		//если не было ни победы ни ничьей то это означит что нужно перейти к следующему ходу тоесть передать ход следующему игроку
		currentUser = currentUser === user1 ? user2 : user1;
	}
}

/**
 * Начинает новую игру, обновляет все игровые параметры и выставляет
 * им начальное значние turn - 0, игровое поле - пустое и т.д
 */
function startNewGame() {
	//делаем игровое поле активным для кликов
	document
		.querySelector("#gameContainer")
		.classList.remove(CellStyles.Disabled);
	resetGameField();
	currentUser = user1;
	turn = 0;
}

/**
 * функция окончания игры, тут происходит переход в како то завершающее состояние, когда по игровому полю уже нельзя больше кликать и тому подобное
 * @param gameOverType {GameOverType} тип гейм овера
 */
function gameOver(gameOverType) {
	//делаем игровое поле неактивным для кликов
	document.querySelector("#gameContainer").classList.add(CellStyles.Disabled);
	if (gameOverType === GameOverType.Win) {
		//drawArrow(`[id="10"]`, `[id="12"]`); //можно рисовать линию показывающую какая комбинация победила
		(0,_popup__WEBPACK_IMPORTED_MODULE_1__.showPopup)(
			`Победил!: ${currentUser} <img src='fgfgfg.gif' width='16' height='16'>`,
			startNewGame
		);
	} else {
		(0,_popup__WEBPACK_IMPORTED_MODULE_1__.showPopup)(`Ничия!<img src='fgfgfg.gif' width='16' height='16'>`, startNewGame);
	}
}

//иницилизируем игру, создает пользователей, вызваем функцию добавляющее события мыши, вызваем стартгейм
let user1 = new User("Kit", CellType.Tac);
let user2 = new User("Nekit", CellType.Tic);
addGameListeners();

(0,_popup__WEBPACK_IMPORTED_MODULE_1__.showPopup)(
	"Внимание!<br>Это котожучиная игра.<img src='fgfgfg.gif' width='16' height='16'><br>Котожучила представляет",
	startNewGame
);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map