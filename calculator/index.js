const readline = require('readline-sync');

let riwayatKalkulasi = [];
let hasilSebelumnya = null;

while (true) {
    console.log("\n--- Kalkulator ---");
    
    let angkaPertama;
    if (hasilSebelumnya !== null) {
        const usePrevious = readline.question("Gunakan hasil sebelumnya (" + hasilSebelumnya + ")? (y/n): ").toLowerCase();
        if (usePrevious === 'y') {
            angkaPertama = hasilSebelumnya;
        } else {
            angkaPertama = parseFloat(readline.question("Masukkan Angka Pertama: "));
        }
    } else {
        angkaPertama = parseFloat(readline.question("Masukkan Angka Pertama: "));
    }

    const operator = readline.question("Pilih Operator ( +, -, *, /, %) : ");
    const angkaKedua = parseFloat(readline.question("Masukkan Angka Kedua: "));

    const requiredOperator = ["+", "-", "*", "/", "%"];

    if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
        console.log("Inputan anda tidak valid.");
    } else if (!requiredOperator.includes(operator)) {
        console.log("Pilih operator yang valid.");
    } else {
        const hasil = processHasil(angkaPertama, angkaKedua, operator);
        if (hasil !== undefined) {
            hasilSebelumnya = hasil; // Menyimpan hasil kalkulasi untuk penggunaan selanjutnya
            riwayatKalkulasi.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
            console.log({ hasil });
        }
    }

    const lihatRiwayat = readline.question("Ingin melihat riwayat kalkulasi? (y/n): ").toLowerCase();
    if (lihatRiwayat === 'y') {
        tampilkanRiwayat();
    }
}

function processHasil(inputanPertama, inputanKedua, operator) {
    switch (operator) {
        case "+":
            return inputanPertama + inputanKedua;
        case "-":
            return inputanPertama - inputanKedua;
        case "*":
            return inputanPertama * inputanKedua;
        case "/":
            if (inputanKedua === 0) {
                console.log("Error: Pembagian dengan nol tidak diperbolehkan.");
                return undefined;
            }
            return inputanPertama / inputanKedua;
        case "%":
            if (inputanKedua === 0) {
                console.log("Error: Modulus dengan nol tidak diperbolehkan.");
                return undefined;
            }
            return inputanPertama % inputanKedua;
    }
}

function tampilkanRiwayat() {
    console.log("\n--- Riwayat Kalkulasi ---");
    if (riwayatKalkulasi.length === 0) {
        console.log("Belum ada kalkulasi yang dilakukan.");
    } else {
        riwayatKalkulasi.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry}`);
        });
    }
}