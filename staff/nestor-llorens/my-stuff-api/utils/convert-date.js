function convertDate(date) { //date = string, example '08/21'

    const splitDate = date.split('/')

    const month = splitDate[0] - 1

    const year = Number('20' + splitDate[1])

    const currentDate = new Date()

    const currentMonth = currentDate.getMonth()

	const currentYear = currentDate.getFullYear()

    if (year < currentYear || year === currentYear && month < currentMonth) throw Error('Card expired')

    const newDate = new Date(year, month )

    return newDate

}