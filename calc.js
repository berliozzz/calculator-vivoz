let tooltipElem;
let activeArea = document.getElementsByClassName('active_map')[0];
let activeAreaFromMenu;
let selectedRadioButton = 1;
let movers = false;
let totalSum = 0;


//***********************************************
//*************** выбор карты *******************
//***********************************************
document.getElementById('map_link_1').onclick = function() {
  document.getElementById('map2').style.display = 'none';
  document.getElementById('map1').style.display = 'block';
  document.getElementById('map_link_1').classList.add('activ_select');
  document.getElementById('map_link_2').classList.remove('activ_select');
}
document.getElementById('map_link_2').onclick = function() {
  document.getElementById('map1').style.display = 'none';
  document.getElementById('map2').style.display = 'block';
  document.getElementById('map_link_2').classList.add('activ_select');
  document.getElementById('map_link_1').classList.remove('activ_select');
}

//***********************************************
//*************** drop-down menu ****************
//***********************************************
// Спб 
/*
const dropDownMenu1 = document.getElementById('drop_menu_container');
dropDownMenu1.addEventListener('mouseover', event => {
  const target = event.currentTarget;
  target.children[1].style.display = 'block';
})
dropDownMenu1.addEventListener('mouseout', event => {
  const target = event.currentTarget;
  target.children[1].style.display = 'none';
})


const areasFromMenu1 = document.querySelectorAll('#region_name_1 > div');
for (const area of areasFromMenu1) {
  area.addEventListener('click', event => {
    //выбираем район из списка
    activeAreaFromMenu = event.currentTarget;
    activeAreaFromMenu.parentElement.style.display = 'none';
    document.getElementById('area_title').textContent = activeAreaFromMenu.textContent;
    //выбираем район на карте
    activeArea.classList.remove('active_map');
    activeArea = document.querySelectorAll(`[data-area_number~="${activeAreaFromMenu.dataset.value_map}"]`)[0];
    activeArea.classList.add('active_map');
    calculateTotalSum();
  })
}

// Область
const dropDownMenu2 = document.getElementById('drop_menu_container2');
dropDownMenu2.addEventListener('mouseenter', event => {
  const target = event.currentTarget;
  target.children[1].style.display = 'block';
})
dropDownMenu2.addEventListener('mouseleave', event => {
  const target = event.currentTarget;
  target.children[1].style.display = 'none';
})

const areasFromMenu2 = document.querySelectorAll('#region_name_2 > div');
for (const area of areasFromMenu2) {
  area.addEventListener('click', event => {
    //выбираем район из списка
    activeAreaFromMenu = event.currentTarget;
    activeAreaFromMenu.parentElement.style.display = 'none';
    document.getElementById('area_title_2').textContent = activeAreaFromMenu.textContent;
    //выбираем район на карте
    activeArea.classList.remove('active_map');
    activeArea = document.querySelectorAll(`[data-area_number~="${activeAreaFromMenu.dataset.value_map}"]`)[0];
    activeArea.classList.add('active_map');
    calculateTotalSum();
  })
}
*/

//***********************************************
//*************** pointer events ****************
//***********************************************
const spbAreas = document.querySelectorAll('.map_area_1');
for (let area of spbAreas) {
  //*************** анимация при наведении курсора ****************
  area.addEventListener('mouseenter', (event) => {
    const target = event.currentTarget;
    const areaName = target.dataset.area_name;
    const numberOfArea = target.dataset.area_number;

    // Убираем номер района
    const textOfArea = document.getElementsByClassName(`area_number_${numberOfArea}`)[0];
    textOfArea.style.display = 'none';

    if (!areaName) return;

    // создадим элемент для подсказки
    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = areaName;
    document.body.append(tooltipElem);

    // позиционирование надписи под курсором
    let left = event.pageX + (target.clientWidth - tooltipElem.offsetWidth) / 2;
    // если надпись заходит за правый край страницы
    if (left + tooltipElem.offsetWidth > document.documentElement.clientWidth) {
      left = document.documentElement.clientWidth - tooltipElem.offsetWidth - 10;
    }
    // если надпись заходит за левый край страницы
    if (left < 0) left = 10;
    
    const top = event.pageY - 50;
    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
  })
  area.addEventListener('mouseleave', (event) => {
    const numberOfArea = event.currentTarget.dataset.area_number;
    const textOfArea = document.getElementsByClassName(`area_number_${numberOfArea}`)[0];
    textOfArea.style.display = 'block';

    // здесь делаем разграничения между мобильной версией и полноэкранной
    // так как нам сейчас не нужно, чтобы в мобильной тултип исчезал вообще
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    }
  })

  //******************* выбор района ********************
  area.addEventListener('click', (event) => {
    const target = event.currentTarget;

    if (target.dataset.area_number == 20) {
      document.getElementById('map2').style.display = 'none';
      document.getElementById('map1').style.display = 'block';
      document.getElementById('map_link_1').classList.add('activ_select');
      document.getElementById('map_link_2').classList.remove('activ_select');
    } else {
      //выбираем район на карте
      activeArea.classList.remove('active_map');
      activeArea = target;
      activeArea.classList.add('active_map');
      //выбираем район из списка
      // activeAreaFromMenu = document.querySelectorAll(`[data-value_map~="${activeArea.dataset.area_number}"]`)[0];
      // if (activeArea.dataset.area_number < 18) {
      //   document.getElementById('area_title').textContent = activeAreaFromMenu.textContent;
      // } else {
      //   document.getElementById('area_title_2').textContent = activeAreaFromMenu.textContent;
      // }
    }
    calculateTotalSum();
  })
}

//*********** remove tooltip *********
// document.addEventListener('pointerdown', () => {
//   if (tooltipElem) {
//     tooltipElem.remove();
//     tooltipElem = null;
//   }
// });

// window.addEventListener('scroll', function() {
//   if (tooltipElem) {
//     newCoordinateY = window.scrollY;
//     console.log(window.scrollY);
//     if (oldCoordinateY != 0) {
//       range = newCoordinateY - oldCoordinateY;
//       console.log(range);
//     }
//     oldCoordinateY = newCoordinateY;
//     tooltipElem.style.top = parseInt(tooltipElem.style.top, 10) - range + 'px';
//   }
// });


//*********** click event radio buttons *********
const radioButtons = document.querySelectorAll('input[name="vivoz"]');

for (const rb of radioButtons) {
  rb.addEventListener('click', (event) => {
    if (rb.checked) {
      selectedRadioButton = rb.value;
      calculateTotalSum();
      return;
    }
  });
}

//************* click event check box ***********
const checkBox = document.getElementById("gruzchiki");
checkBox.addEventListener('click', (event) => {
  movers = checkBox.checked;
  calculateTotalSum();
});

//***********************************************
//******** calculation of the total sum *********
//***********************************************
const calculateTotalSum = () => {
  totalSum = 0;
  totalSum += centerOrNot();
  totalSum += whichAreaIsChosen();
  if (movers) totalSum += prices[`movers${selectedRadioButton}`];
  document.getElementById('description_total').textContent = changeDescription();
  document.getElementById('total_price').textContent = totalSum;
}
//***********************************************
//*************** help functions ****************
//***********************************************
const changeDescription = () => {
  const areaNumber = activeArea.dataset.area_number;
  const areaName = activeArea.dataset.area_name;
  if (areaNumber < 18) {
    if (movers) return `Спб, ${areaName} район, ${prices[`description${selectedRadioButton}`]}, нужны грузчики.`;
    return `Спб, ${areaName} район, ${prices[`description${selectedRadioButton}`]}`;
  } else {
    if (movers) return `Лен область, ${areaName} район, ${prices[`description${selectedRadioButton}`]}, нужны грузчики.`;
    return `Лен область, ${areaName} район, ${prices[`description${selectedRadioButton}`]}`;
  }
}
const centerOrNot = () => {
  const areaNumber = activeArea.dataset.area_number;
  if (areaNumber == 0 || areaNumber == 1 | areaNumber == 12 | areaNumber == 17) {
    return prices.city_center;
  } else {
    return 0;
  }
}
const whichAreaIsChosen = () => {
  const areaNumber = activeArea.dataset.area_number;
  if (areaNumber < 18) {
    return prices[`volume${selectedRadioButton}`];
  } else {
    return prices[`area${selectedRadioButton}`];
  }
}

calculateTotalSum();