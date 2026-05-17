function checkArmstrong() {

    let num = document.getElementById("number").value;
    let sum = 0;
    let temp = num;
    let digits = num.length;

    while (temp > 0) {
        let rem = temp % 10;
        sum += rem ** digits;
        temp = parseInt(temp / 10);
    }

    if (sum == num) {
        document.getElementById("result").innerText =
            num + " is an Armstrong Number";
    } else {
        document.getElementById("result").innerText =
            num + " is NOT an Armstrong Number";
    }
}