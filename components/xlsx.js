const checkingСertificate = () => {
    let dataList = [];
    const url = "list-2.xlsx";
    const oReq = new XMLHttpRequest();
    const query = String(document.location.href);

    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function(e) {
        
        const arraybuffer = oReq.response;
        const data = new Uint8Array(arraybuffer);
        const arr = new Array();

        for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        
        const bstr = arr.join("");
        const workbook = XLSX.read(bstr, {type: "binary" });
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        
        dataList = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        function numberWithSpaces(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }

        const totalCost = dataList.reduce((prev, item) => {
            return prev + item['Сумма']
        }, 0) 

        document.querySelector('.result-block span').textContent = numberWithSpaces(totalCost);

        dataList.forEach((elem, i) => {

            const card =  document.querySelector('.check-wrapper');

                card.insertAdjacentHTML('beforeend', `
					
					<div class="card-item" style ="background: ${dataList[i]['Сумма'] < 0 ? '#FF6275' : '#13CE92'}">
						<i class="fa fa-user" aria-hidden="true"></i>
						<h2>${dataList[i]['ФИО']}</h2>
						<div>
							Текущий баланс: <span>${numberWithSpaces(dataList[i]['Сумма'])}</span> руб
						</div>
						<div class="icons-wrapper">
							<i class="fa fa-print" aria-hidden="true"></i>
							<i class="fa fa-history" aria-hidden="true"></i>
						</div>
					</div>
                    `
                )
        })

}
oReq.send();
}

checkingСertificate();