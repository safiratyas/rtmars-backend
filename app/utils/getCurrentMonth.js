function getCurrentMonth(month) {
    let listMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

    const parseNum = parseInt(month)
    const checkIndex = listMonth[parseNum]

    return checkIndex
}

module.exports = getCurrentMonth;