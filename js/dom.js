// //Array

let addToCarts = document.getElementsByClassName("add-to-cart");
// console.log(addToCarts.length); // количество товаров в 4х колоночной секции

//------------------------------------------- Поиск через .Closest(".class")
//--------------------ищем нужный элемент по нажатию кнопки и выводим название и цену товара
for (let i = 0; i < addToCarts.length; i++) {
    addToCarts[i].addEventListener('click', function(event) {

        event.target.closest(".position-relative").firstElementChild.firstElementChild.style.transform = "rotateY(180deg)";
        console.log(event.target.closest(".product").lastElementChild.textContent); // previousSibling - брат элемента // цена товара
        console.log(event.target.closest(".product").lastElementChild.previousElementSibling.textContent); // найти имя товары

    })

}

// // for (let i = 0; i < addToCarts.length; i++) {
// //     addToCarts[i].addEventListener('click', function() {
// //         console.log('Click Event');
// //     })
// //     console.dir(addToCarts[i]); // структурированый вывод информации об объекте. 
// // }
// //--------------------------Событие клик возвращает событие ивента.
// // for (let i = 0; i < addToCarts.length; i++) {
// //     addToCarts[i].addEventListener('click', function(event) {
// //         //console.log('Click Event');
// //         console.log(event.target.parentNode.parentNode.parentNode.parentNode.childNodes); // parentNode - найти родителя кнопки, по которой нажали.
// //         // event.target.style.color = 'red'; // !!!!!!!! - дать цвет текста элементу на который нажали.
// //     })

// // }

// //------------------------перекрутка картинки
// // for (let i = 0; i < addToCarts.length; i++) {
// //     addToCarts[i].addEventListener('click', function(event) {
// //         //console.log('Click Event');
// //         //  console.log(event.target.parentNode.parentNode.parentNode.parentNode.firstElementChild.children[0]);
// //         console.log(event.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0]); // parentNode - найти родителя кнопки, по которой нажали.
// //         // event.target.style.color = 'red'; дать цвет текста элементу на который нажали.    //children
// //         event.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].style.transform = "rotateX(180deg)"
// //             // .style.transform="rotateX(180deg)"  - крутить картинку
// //             // .firstElementChild - 1вый ребенок элемента.
// //             // .lastElementChild - последний ребенок элемента.
// //     })
// //}
// //------------------------------------------------------------------------------- Еще 1 способ
// // for (let i = 0; i < addToCarts.length; i++) {
// //     addToCarts[i].addEventListener('click', function(event) {
// //         console.log(event.target.parentNode.parentNode.parentNode.previousElementSibling.lastElementChild); // previousSibling - брат элемента
// //         event.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].style.transform = "rotateY(180deg)"

// //     })

// // }



















// // console.log(typeof []); // тип массива - object
// // console.log(Array.isArray([])); // Если аррей массив то ответ Тру


// //Массив ------------------------------------------------------------------------------------------------------
// // let a = 5;
// // let b = 7; //------------------------------------------------------------->Вычислителный массив
// // let arr = [1, "Alik", { a: 11110, }, , [1, 2, true, 4, 5], 'KARINA', , , , , b + 4, a * 2, -2]; // cоздать массив [] к {a: обращатся через arr[2].a}

// // console.log(arr[2].a);
// // console.log(arr[4][arr[4].length]); // последний елемент массива length-1 минус один 5-1=[4]
// // arr[6] = "Hello 6 Item"; // Добавление в 6 елемент текста хелло 6 итем
// // console.log(arr);

// // let arr1 = []; // пустой массив
// // arr1[1000] = true; // объявили 1001 елемент в массив
// // console.log(arr1);

// // arr1.length = 2;
// // console.log(arr1);

// // arr1.length = 1001;
// // console.log(arr1);

// // delete arr[1]; // удаление элементаа из массива
// // console.log(arr)

// // for (let i = 0; i < arr.length; i++) { //Оператор цикла for делает цикл пока не выполнит заданные условия
// //     console.log(arr[i]);
// // }

// //----------------Do While Цикл
// // let j = 0;
// // do {
// //     console.log(arr[j]);
// //     j += 1;

// // } while (j < arr.length);

// // 3 тий цикл while-------------------------
// // let j = 0;
// // while (j < arr.length) {
// //     console.log(arr[j]);
// //     j++;
// // }