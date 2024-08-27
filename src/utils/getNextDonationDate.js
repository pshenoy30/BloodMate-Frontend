function getNextDonationDate (lastDonated){
    let nextDonated = "";
    const splitDate = lastDonated[0].split("-");
    if (splitDate[2] === 1){
    nextDonated = splitDate[2]+"st ";
    }else if (splitDate[2] === 2){
    nextDonated = splitDate[2]+"nd ";
    }else if (splitDate[2] === 3){
    nextDonated = splitDate[2]+"rd ";
    }else {
    nextDonated = splitDate[2]+"th ";
    }

    let newMonth = Number(splitDate[1])+3;
    let newYear = Number(splitDate[0]);
    if (newMonth > 12){
    newMonth -= 12;
    newYear += 1;
    }
    if (newMonth === 1){
        nextDonated += "Jan, ";
    }else if (newMonth === 2){
        nextDonated += "Feb, ";
    }else if (newMonth === 3){
        nextDonated += "Mar, ";
    }else if (newMonth === 4){
        nextDonated += "Apr, ";
    }else if (newMonth === 5){
        nextDonated += "May, ";
    }else if (newMonth === 6){
        nextDonated += "Jun, ";
    }else if (newMonth === 7){
        nextDonated += "Jul, ";
    }else if (newMonth === 8){
        nextDonated += "Aug, ";
    }else if (newMonth === 9){
        nextDonated += "Sep, ";
    }else if (newMonth === 10){
        nextDonated += "Oct, ";
    }else if (newMonth === 11){
        nextDonated += "Nov, ";
    }else if (newMonth === 12){
        nextDonated += "Dec, ";
    }

    nextDonated += String(newYear);
    return nextDonated;

}

export default getNextDonationDate;

