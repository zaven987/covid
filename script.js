async function showCountries(date) {
    let modifiedDate = date.split('/').join('-')
    let dataResponse = await fetch(`https://covid19.mathdro.id/api/daily/${modifiedDate}`);
    let data = await dataResponse.json();
    let countriesResponse = await fetch('https://covid19.mathdro.id/api/countries')
    let countriesObj = await countriesResponse.json();
    let cases = document.createElement('tr')
    let countryName = document.createElement('td')
    countryName.innerHTML = 'Country'
    cases.append(countryName)
    let confirmed = document.createElement('td')
    confirmed.innerHTML = 'Confirmed'
    cases.append(confirmed)
    let recovered = document.createElement('td')
    recovered.innerHTML = 'Recovered'
    cases.append(recovered)
    let deaths = document.createElement('td')
    deaths.innerHTML = 'Deaths'
    cases.append(deaths)
    table.append(cases)
    countriesObj.countries.forEach((country, i) => {
        let countryName = country.name;
        let provincesDaily = data.filter(province => province.countryRegion === countryName)
        let confirmedSumDaily = provincesDaily.reduce((sum, province) => sum + Number(province.confirmed), 0)
        let recoveredSumDaily = provincesDaily.reduce((sum, province) => sum + Number(province.recovered), 0)
        let deathsSumDaily = provincesDaily.reduce((sum, province) => sum + Number(province.deaths), 0)
        let newRow = document.createElement('tr');
        let countryNameCol = document.createElement('td')
        countryNameCol.innerHTML = countryName
        newRow.append(countryNameCol)
        let confirmedCol = document.createElement('td')
        confirmedCol.innerHTML = confirmedSumDaily;
        newRow.append(confirmedCol)
        let recoveredCol = document.createElement('td')
        recoveredCol.innerHTML = recoveredSumDaily;
        newRow.append(recoveredCol)
        let deathsCol = document.createElement('td')
        deathsCol.innerHTML = deathsSumDaily;
        newRow.append(deathsCol)
        table.append(newRow)
    })
}
datepicker.onchange = (e) => {
    table.innerHTML = ''
    showCountries(e.target.value)
}