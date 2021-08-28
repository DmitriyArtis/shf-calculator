// Материалы с ценами
    			let materialCost = {
    				banner320Lam : { name: "Баннер 320 гр/м2 ламинированный (Китай)", costShf: 440, costIp: 560, banner: true},
    				banner440Lam : { name: "Баннер 440 гр/м2 ламинированный (Корея)", costShf: 500, costIp: 640, banner: true},
    				banner440Lit : { name: "Баннер 440 гр/м2 литой (Европа)", costShf: 560, costIp: 680, banner: true},
    				banner510Lit : { name: "Баннер 510 гр/м2 литой (Европа Люкс)", costShf: 600, costIp: 750, banner: true},
    				banner510Trans : { name: "Баннер 510 гр/м2 (светопроводящий)", costShf: 1100, costIp: 1440, banner: true},
    				banner610Block : { name: "Баннер 610 гр/м2 (двухсторонний)", costShf: 1800, costIp: 2400, banner: true},
    				flex : { name: "Сетка с подложкой", costShf: 600, costIp: false, banner: false},
    				filmPat : { name: "Плёнка ПЭТ (светопроводящая)", costShf: 1040, costIp: 1340, banner: false},
    				filmPvh : { name: "Плёнка виниловая", costShf: 640, costIp: 760, banner: false},
    				filmPvhCutted : { name: "Плёнка виниловая с контурной резкой", costShf: false, costIp: 1060, banner: false},
    				filmPerf : { name: "Плёнка перфорированная", costShf: 1040, costIp: 1340, banner: false},
    				paperCityLight : { name: "Бумага", costShf: 440, costIp: 580, banner: false},
    				paperPhoto : { name: "Фотобумага", costShf: false, costIp: 860, banner: false},
    				сanvas : { name: "Холст", costShf: false, costIp: 1900, banner: false},
    			};
    		materialList();

// Чтобы в чебоке можно было выбрать только одно значение как в радио баттон
				$('input[name="cutGlue"]').on('change', function() {
   			$('input[name="cutGlue"]').not(this).prop('checked', false);
				});

    		let form = document.forms.calc;

    		form.material.onchange = function () {
    			materialList();
    			calculate();
    		};

    		checkbox3.addEventListener("click", materialList);
  			checkbox3.addEventListener("click", calculate);

    		form.cut.onchange = calculate;
    		form.glue.onchange = calculate;
    		form.eyelet.onchange = calculate;
    		form.eyeletStep.onchange = function() {
    		form.eyeletStepText.value = form.eyeletStep.value
    		calculate();
    		};
    		form.eyeletStepText.oninput = function() {
    			form.eyeletStep.value = form.eyeletStepText.value;
    		calculate();
    		};
    		form.sizeWidth.oninput = calculate;
    		form.sizeHeight.oninput = calculate;
        form.quantity.oninput = calculate;

// Получение списка материалов в зависимости от качества печати и вывод в выпадающий список
    		function materialList() {
//Смотрим есть ли такой материал в выбранном качестве печати
          let form = document.forms.calc;
          let elem = form.elements.material;
          let selectedElem = elem.options;
  				if (document.getElementById("checkbox3").checked == true) {
// Если список уже сформирован - очищаем его
            if (elem.options.length > 0) {
              let selectMaterial = elem.value;
              while (elem.length) {
                selectedElem[0] = null;
                }
          
// Составляем список материалов с печатью интерьерного качества
            for (let key in materialCost) {
              if (materialCost[key].costIp !== false) {
                if (key == selectMaterial) {
                  material.insertAdjacentHTML('beforeend', `<option value="` + key + `" selected>` + materialCost[key].name + `</option>`);
                } else {
                  material.insertAdjacentHTML('beforeend', `<option value="` + key + `">` + materialCost[key].name + `</option>`);
              }
              }
            }

          } else {
            let selectMaterial = 'banner320Lam';
// Составляем список материалов с печатью интерьерного качества
  					for (let key in materialCost) {
  						if (materialCost[key].costIp !== false) {
  							if (key == selectMaterial) {
  								material.insertAdjacentHTML('beforeend', `<option value="` + key + `" selected>` + materialCost[key].name + `</option>`);
  							} else {
  								material.insertAdjacentHTML('beforeend', `<option value="` + key + `">` + materialCost[key].name + `</option>`);
							}
  						}
  					}
          }
  				} else {
// Если список уже сформирован - очищаем его
            if (elem.options.length > 0) {
              let selectMaterial = elem.value;
              while (elem.length) {
                selectedElem[0] = null;
                }
          
// Составляем список материалов с печатью интерьерного качества
            for (let key in materialCost) {
              if (materialCost[key].costShf !== false) {
                if (key == selectMaterial) {
                  material.insertAdjacentHTML('beforeend', `<option value="` + key + `" selected>` + materialCost[key].name + `</option>`);
                } else {
                  material.insertAdjacentHTML('beforeend', `<option value="` + key + `">` + materialCost[key].name + `</option>`);
              }
              }
            }

          } else {
            let selectMaterial = 'banner320Lam';
// Составляем список материалов с печатью интерьерного качества
            for (let key in materialCost) {
              if (materialCost[key].costShf !== false) {
                if (key == selectMaterial) {
                  material.insertAdjacentHTML('beforeend', `<option value="` + key + `" selected>` + materialCost[key].name + `</option>`);
                } else {
                  material.insertAdjacentHTML('beforeend', `<option value="` + key + `">` + materialCost[key].name + `</option>`);
              }
              }
            }
          }
          }
    		}

        function calculate() {
// Объект с ценами допработ и расчётом их стоимости
    		  let addWorkCost =
          {
      			eyelet : 20,
      			glue : 40,
      			cut : 20,
// Метод объекта рассчитывающий стоимость допработ
 					  price() {
              result = 0;
   						perimetr = (sizeWidth+sizeHeight) * 2;
// Расчёт стомости обрезки по изображению либо проклейки
   						if (cut.checked) {
        				result = perimetr * this.cut * quantity;
        			} else if (glue.checked)
              {
          			result = perimetr * this.glue;
      		  	}
// Расчёт количества и стоимости люверсов
        			if (eyelet.checked)
              {
        				result += Math.round(perimetr / (form.eyeletStep.value / 100) * this.eyelet); //??
                if ((result % 2) == 1) {result += 1};
        			}
// Скрытие блока расчёта стоимости люверсов
        			if (!eyelet.checked)
              {
        				document.getElementById("eyeletStep").hidden=true;
        				document.getElementById("eyeletStepText").hidden=true;
                document.getElementById("eyeletStepHint").setAttribute("style", "display: none");
                document.getElementById("eyeletdesc").setAttribute("style", "display: none");
              } else
              {
      				  document.getElementById("eyeletStep").hidden=false;
      				  document.getElementById("eyeletStepText").hidden=false;
      				  document.getElementById("eyeletStepHint").setAttribute("style", "display: inline-block");
                document.getElementById("eyeletdesc").setAttribute("style", "display: inline-block");
              }
//Скрытие проклейки для материалов отличных от баннера
              if (materialCost[form.material.value].banner === false)
              {
      				  document.getElementById("glue").hidden=true;
      				  document.getElementById("glueBox").setAttribute("style", "display: none");
                document.getElementById("eyeletBox").setAttribute("style", "display: none");
              } else
              {
      				  document.getElementById("glue").hidden=false;
      				  document.getElementById("glueBox").setAttribute("style", "display: inline-block");
                document.getElementById("eyeletBox").setAttribute("style", "display: inline-block");
              }
              return result;
      		  }
    		};

    		// Вычисляем размер материала в метрах
      	let sizeWidth = form.sizeWidth.value / 100;
      	if (!sizeWidth) return;
      	let sizeHeight = form.sizeHeight.value / 100;
      	if (!sizeHeight) return;

        // Смотрим количество
        let quantity = form.quantity.value;

      	//получаем выбранный материал
      	let material = form.material.value;
      	if (!material) return;

      	// Расчёт стоимости выбранного материала по площади. Проверка и ограничение на сумму минимального заказа.
      	// Отслеживание положения переключателя качества печати
        if(document.getElementById("checkbox3").checked == false)
        {           
          result = sizeWidth * sizeHeight * materialCost[form.material.value].costShf * quantity;
          if (result < 500) {
      		  result = 500;
          }
          sum = result + addWorkCost.price();
          document.getElementById('price').innerHTML = Math.floor(sum) + '.<span style="font-size: 24px;">' + (sum.toFixed(2)).slice(-2) + '</span> руб.';
        } else if (document.getElementById("checkbox3").checked == true)
        {          
          result = sizeWidth * sizeHeight * materialCost[form.material.value].costIp * quantity;
          if (result < 500) {
      		  result = 500;
          }
          sum = result + addWorkCost.price();
          document.getElementById('price').innerHTML = Math.floor(sum) + '.<span style="font-size: 24px;">' + (sum.toFixed(2)).slice(-2) + '</span> руб.';
        }
    		}
    		calculate();